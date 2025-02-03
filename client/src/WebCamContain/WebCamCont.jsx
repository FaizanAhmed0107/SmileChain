import styles from './WebCamCont.module.css';
import Webcam from "react-webcam";
import {useRef, useState} from "react";
import {toast} from "react-toastify";
import CheckImage from "../API_Requests/CheckImage.jsx";
import PropTypes from "prop-types";
import {detectFaces} from "../util/smileDetection.js";
import getPoints from "../API_Requests/getPoints.jsx";

function WebCamCont(props) {
    const [buttonActive, setButtonActive] = useState(true);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 720,
        height: 720,
        facingMode: "user"
    };

    const getPoint = async () => {
        try {
            const result = await getPoints(props.AccessToken);
            if (result.success) {
                props.setPoint(result.data.points);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            toast.error("Error fetching user points", {
                position: "top-right",
            });
            console.error("Error fetching user points:", error);
        }
    }

    const checkImage = async (img, confidence) => {
        const response = await CheckImage(img, Math.round(confidence * 5), props.AccessToken);
        if (response.success) {
            // console.log(response.data)
            setTimeout(() => {
                getPoint();
            }, 8000);
            return true;
        } else {
            console.log(response.message || "Error Fetching Contacts!");
            toast.error(response.message, {
                position: "top-right",
            });
            return false;
        }
    };

    const capture = async () => {
        if (!props.isLoggedIn) {
            toast.error("Please log in to capture a photo.", {
                position: "top-right",
            });
            return;
        }

        try {
            // Ensure webcam reference exists and screenshot can be captured
            if (!webcamRef?.current) {
                throw new Error("Webcam is not initialized.");
            }

            const img = webcamRef.current.getScreenshot();
            setCapturedImage(img); // Save the captured image to freeze the display
            setButtonActive(false);
            setIsCameraActive(false); // Pause the webcam feed

            if (!img) {
                throw new Error("Failed to capture a screenshot.");
            }

            // Process the captured image
            const faceConfidence = await detectFaces(img);
            if (typeof faceConfidence !== "number") {
                throw new Error("Face detection returned an invalid response.");
            }

            if (faceConfidence === -1)
                toast.warning("No Face Detected.", {
                    position: "top-right",
                });
            else if (faceConfidence > props.threshold) {
                const result = await checkImage(img, faceConfidence); // Ensure checkImage is awaited to handle async operations.
                if (result) {
                    toast.success("Congratulations for Smiling.", {
                        position: "top-right",
                    });
                }
            } else {
                toast.warning("Please Smile", {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("An error occurred during capture:", error);
            toast.error(`Error: ${error.message}`, {
                position: "top-right",
            });
        } finally {
            setButtonActive(true);
            setIsCameraActive(true); // Resume the webcam feed
        }
    };

    return (
        <>
            <div className={styles.box}>
                {isCameraActive ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className={styles.CamCont}
                        mirrored={true}
                    />
                ) : (
                    <img src={capturedImage} alt="Captured" className={styles.CamCont}/>
                )}
                <button onClick={capture} className={styles.captureBtn} disabled={!buttonActive}>Capture Smile</button>
            </div>
        </>
    );
}

WebCamCont.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    AccessToken: PropTypes.string.isRequired,
    setPoint: PropTypes.func.isRequired,
    threshold: PropTypes.number.isRequired
}

export default WebCamCont;