import eventlet
eventlet.monkey_patch()

import base64
import cv2
from flask import Flask
from flask_socketio import SocketIO, emit
import numpy as np
import face_recognition
from concurrent.futures import ThreadPoolExecutor
import json
import psycopg2


app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
executor = ThreadPoolExecutor(max_workers=4)


@socketio.on('connect')
def handle_connect():
    print("A client connected!")
    emit('response', {'message': 'Connected to Flask WebSocket server!'})


@socketio.on('disconnect')
def handle_disconnect():
    print("A client disconnected!")


@socketio.on('message')
def handle_message(data):
    print(f"Received message: {data}")
    emit('response', {'message': f'Server received: {data}'})


# Resize image
def resize_image(image, width=200, height=200):
    return cv2.resize(image, (width, height))


# Decode image from Base64
def decode_image(data):
    # Decode the Base64 string to image bytes
    image_data = base64.b64decode(data.split(',')[1])  # Split in case of data URI scheme
    np_image = np.frombuffer(image_data, dtype=np.uint8)
    image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)
    return resize_image(image)


# Extract face encoding from an image
def extract_face_encoding(image_data):
    # Decode the image data
    image = decode_image(image_data)
    # Extract face encodings from the decoded image
    face_encodings = face_recognition.face_encodings(image)
    
    print(f"Extracted face encodings: {face_encodings}")
    # Return the list of encodings
    return face_encodings


def compare_face(data):
    # Connect to PostgreSQL
    try:
        conn = psycopg2.connect(
            dbname="IHCBiometric",
            user="postgres",
            password="hannahbisheen",
            host="localhost",
            port="5433"
        )
        print("Successfully connected to the PostgreSQL database!")
    except psycopg2.Error as e:
        print(f"Database connection failed: {e}")
        socketio.emit('receive_from_flask', json.dumps({"message": "Database connection failed"}))
        return

    cursor = conn.cursor()

    # Fetch all profiles from PostgreSQL
    cursor.execute("SELECT user_id, user_image FROM user_profile")
    profiles = cursor.fetchall()
    response = None

    # Decode Base64 Image from input data
    base64_image = data
    unknown_faces = extract_face_encoding(base64_image)

    print(f"Unknown face encoding: {unknown_faces[0]}")

    # Iterate through profiles and compare faces
    for profile in profiles:
        profile_id = profile[0]
        profile_image = profile[1]

        # Extract face encoding for the profile image
        existing_faces = extract_face_encoding(profile_image)
        print(f"Existing face encodings in database for profile ID {profile_id}: {existing_faces}")

        # Compare the faces
        matches = face_recognition.compare_faces(existing_faces, unknown_faces[0])
        distances = face_recognition.face_distance(existing_faces, unknown_faces[0])  

        if any(matches) and min(distances) < 0.6:  
            response = {
                "id": profile_id,
                "message": "Profile matched"
            }
            print(f"Matched profile ID: {profile_id}")
            socketio.emit('receive_from_flask', json.dumps(response))
            break

    if response is None:
        print("No matching profile found")
        socketio.emit('receive_from_flask', json.dumps({"message": "No match found"}))

    cursor.close()
    conn.close()


@socketio.on('send_to_flask')
def handle_send_to_flask(data):
    executor.submit(compare_face, data)


if __name__ == '__main__':
    print("Starting Flask WebSocket server... 🚀")
    print("Visit http://localhost:5001 to connect.")
    socketio.run(app, host='localhost', port=5001)
