from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

# Load Haar cascades
face_cascade = cv2.CascadeClassifier('cascades/haarcascade_frontalface_default.xml')
smile_cascade = cv2.CascadeClassifier('cascades/haarcascade_smile.xml')


def detect_smile(image):
    """Detect smiles in an image."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    smile_detected = False

    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        smiles = smile_cascade.detectMultiScale(roi_gray, scaleFactor=1.8, minNeighbors=20)

        if len(smiles) > 0:
            smile_detected = True
            break

    return smile_detected


@app.route('/detect_smile', methods=['POST'])
def detect_smile_api():
    """API endpoint to detect smiles."""
    try:
        # Get image from request
        data = request.json
        if not data or 'image' not in data:
            return jsonify({"error": "No image provided"}), 400

        # Decode base64 image
        img_data = base64.b64decode(data['image'])
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Detect smile
        smile = detect_smile(img)
        return jsonify({"smile_detected": smile})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)