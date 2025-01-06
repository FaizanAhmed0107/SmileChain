import {useState, useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TopBar from "./TopBar/TopBar.jsx";
import WebCamCont from "./WebCamContain/WebCamCont.jsx";
import PhotoFeed from "./PhotoFeed/PhotoFeed.jsx";
import RegisterLogin from "./Login_Register/RegisterLogin.jsx";
import DeviceDetector from "./DeviceDetector.jsx";

import {
    Audio,
    Bars,
    BallTriangle,
    Grid,
    Puff,
    Oval,
    Rings,
    Circles,
    Hearts,
    SpinningCircles,
    TailSpin,
    ThreeDots
} from 'react-loading-icons';

function App() {
    // Initialize state with values from sessionStorage (if they exist)
    const [isSmall, setIsSmall] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem("isLoggedIn")) || false);
    const [AccessToken, setAccessToken] = useState(sessionStorage.getItem("AccessToken") || "");
    const [showLogin, setShowLogin] = useState(false);

    // Sync state changes to sessionStorage
    useEffect(() => {
        sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        sessionStorage.setItem("AccessToken", AccessToken);
    }, [AccessToken]);

    return (
        <>
            {showLogin ?
                <RegisterLogin
                    setIsLoggedIn={setIsLoggedIn}
                    setAccessToken={setAccessToken}
                    setShowLogin={setShowLogin}
                    isSmall={isSmall}
                />
                :
                <>
                    <TopBar
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setShowLogin={setShowLogin}
                        AccessToken={AccessToken}
                        setAccessToken={setAccessToken}
                        isSmall={isSmall}
                    />
                    <WebCamCont isLoggedIn={isLoggedIn}/>
                    <PhotoFeed AccessToken={AccessToken} isLoggedIn={isLoggedIn}/>
                </>
            }

            <DeviceDetector setIsSmall={setIsSmall}/>
            <ToastContainer/>
        </>
    );
}

export default App;