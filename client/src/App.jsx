import {useState} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import TopBar from "./TopBar/TopBar.jsx";
import WebCamCont from "./WebCamContain/WebCamCont.jsx";
import PhotoFeed from "./PhotoFeed/PhotoFeed.jsx";
import RegisterLogin from "./Login_Register/RegisterLogin.jsx";
import DeviceDetector from "./DeviceDetector.jsx";


function App() {
    const [isSmall, setIsSmall] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [AccessToken, setAccessToken] = useState("");
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
            {showLogin ?
                <RegisterLogin setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken}
                               setShowLogin={setShowLogin} isSmall={isSmall}/>
                : <>
                    <TopBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin}
                            AccessToken={AccessToken} setAccessToken={setAccessToken} isSmall={isSmall}/>
                    <WebCamCont isLoggedIn={isLoggedIn}/>
                    <PhotoFeed AccessToken={AccessToken} isLoggedIn={isLoggedIn}/>
                </>
            }

            <DeviceDetector setIsSmall={setIsSmall}/>
            <ToastContainer/>
        </>
    )
}

export default App;


