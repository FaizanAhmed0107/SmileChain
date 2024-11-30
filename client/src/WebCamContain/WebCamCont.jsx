import styles from './WebCamCont.module.css'
import Webcam from "react-webcam";
import {useRef} from "react";
import {toast} from "react-toastify";
import CheckImage from "../API Requests/CheckImage.jsx";
import PropTypes from "prop-types";

function WebCamCont(props) {
    const webcamRef = useRef(null);
    const videoConstraints = {
        width: 720,
        height: 720,
        facingMode: "user"
    };

    const checkImage = async (img) => {
        const response = await CheckImage(img)
        if (response.success) {
            console.log(response.data)
        } else {
            console.log(response.message || 'Error Fetching Contacts!')
        }
    }

    const capture = () => {
        if (props.isLoggedIn) {
            const img = webcamRef.current.getScreenshot();
            checkImage(img)
        } else {
            toast.error("Please log in to capture a photo.", {
                position: "top-right",
            });
        }
    }
    return (
        <>
            <div className={styles.box}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className={styles.CamCont}
                    mirrored={true}
                />
                <button onClick={capture} className={styles.captureBtn}>Capture photo</button>
            </div>
        </>
    )
}

WebCamCont.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

export default WebCamCont;