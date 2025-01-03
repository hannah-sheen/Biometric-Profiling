import psycopg2
from psycopg2.extras import RealDictCursor

def db_connect():
    try:
        # Establish a connection to PostgreSQL
        connection = psycopg2.connect(
            host="localhost",
            port="5433",
            database="IHCBiometric",  # Replace with your PostgreSQL database name
            user="postgres",  # Replace with your PostgreSQL username
            password="hannahbisheen"  # Replace with your PostgreSQL password
        )
        # Enable a dictionary-like cursor
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        return connection, cursor
    except Exception as e:
        print("Error connecting to PostgreSQL:", e)
        return None, None
