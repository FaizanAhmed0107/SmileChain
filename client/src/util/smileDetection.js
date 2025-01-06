import * as faceapi from 'face-api.js';

export const detectFaces = async (img) => {
    try {
        // Ensure models are loaded
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]);

        // Create an HTMLImageElement from the base64 image
        const image = new Image();
        image.src = img;

        // Wait for the image to load
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });

        // Detect faces
        const detection = await faceapi.detectSingleFace(
            image,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions();

        console.log('Detections:', detection);

        if (detection) {
            if (detection.expressions.happy)
                return detection.expressions.happy;
        } else {
            console.log('No faces detected.');
        }
    } catch (error) {
        console.error('Error detecting faces:', error);
    }
    return -1;
};
