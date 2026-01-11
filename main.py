import eventlet
eventlet.monkey_patch()

import base64
import cv2
from flask import Flask
from flask_socketio import SocketIO, emit
import numpy as np
import threading
from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
from concurrent.futures import ThreadPoolExecutor
from pymongo import MongoClient
import io
import json

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
executor = ThreadPoolExecutor(max_workers=4)

# Initialize MTCNN and InceptionResnetV1 models
mtcnn = MTCNN(thresholds = [0.6, 0.7, 0.8])
facenet = InceptionResnetV1(pretrained='vggface2').eval()

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


def database():
    client = MongoClient("127.0.0.1", 27017)
    database = client.IHCBiometric
    users = database.users
    return users


def decode_image(data):
    try:
        image_data = base64.b64decode(data.split(',')[1])  # Split in case of data URI scheme
        np_image = np.frombuffer(image_data, dtype=np.uint8)
        image = cv2.imdecode(np_image, cv2.IMREAD_COLOR)  # Force 3-channel color image
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)    # Convert BGR to RGB
        print("Decoded image shape:", image.shape)  # Should be (H, W, 3)

        return image
    except Exception as e:
        print("Error decoding image:", e)
        return None


def extract_embedding(image):
    try:
        faces = mtcnn(image)
        if faces is not None:
            face_tensor = faces[0]
            if isinstance(faces, torch.Tensor): 
                face_tensor = faces.unsqueeze(0)  # Add batch dimension
            elif isinstance(faces, list) and len(faces) > 0:  # Handle multiple faces
                face_tensor = faces[0].unsqueeze(0)
            else:
                print("No faces detected in the image.")
                return None
            
            # Get the embedding
            embedding = facenet(face_tensor)
            return embedding
        else:
            print('No face detected in the image, returned none.')
            return None
    except Exception as e:
        print("Error getting face embedding:", e)
        return None 


def compare_face(data):
    users = database()
    userInfos = users.find()
    response = None
    match_found = False

    def declare_no_match():
        nonlocal match_found
        if not match_found:  # Only emit failure if no match is found yet
            print("Timeout reached: No match found")
            socketio.emit('receive_from_flask', {
                'status': 'failure',
                'message': 'No match found, register first.'
            })

    timer = threading.Timer(15.0, declare_no_match)
    timer.start()

    # Decode Base64 Image from input data
    unknown_image = decode_image(data)
    unknown_embedding = extract_embedding(unknown_image)

    if unknown_embedding is None:
        print('No face found')
        timer.cancel()
        return

    for userInfo in userInfos:
        print("Matching with profile...")
        existing = extract_embedding(decode_image(userInfo['image']))
        matches = torch.nn.functional.cosine_similarity(unknown_embedding, existing).item()
        print(matches)

        if matches > 0.6:  # Match threshold
            print("Match Found: ", userInfo['_id'])
            match_found = True  # Set the match flag to True
            timer.cancel()  # Cancel the timer as a match is found
            response = json.dumps(userInfo, default=str)
            socketio.emit('receive_from_flask', {
                'status': 'success',
                'message': 'Match found!',
                'user': response
            })
            break

        if not match_found:
            print("Still searching, waiting for timeout...")


            

    
@socketio.on('send_to_flask')
def handle_send_to_flask(data):
    executor.submit(compare_face, data)


if __name__ == '__main__':
    print("Starting Flask WebSocket server... 🚀")
    socketio.run(app, host='0.0.0.0', port=5001)

