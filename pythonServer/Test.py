import base64
import requests

# Path to your test image
image_path = "Tests/test4.jpg"  # Replace with the path to your image

# Read and encode the image to Base64
with open(image_path, "rb") as image_file:
    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')

# Prepare the API endpoint and payload
url = "http://127.0.0.1:5000/detect_smile"
payload = {
    "image": encoded_image
}

# Send POST request to the Flask server
try:
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)
except Exception as e:
    print("An error occurred:", str(e))
