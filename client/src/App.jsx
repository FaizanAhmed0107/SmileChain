import {useState} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import TopBar from "./TopBar/TopBar.jsx";
import WebCamCont from "./WebCamContain/WebCamCont.jsx";
import PhotoFeed from "./PhotoFeed/PhotoFeed.jsx";
import RegisterLogin from "./Login_Register/RegisterLogin.jsx";


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [AccessToken, setAccessToken] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);

    const toggleSignUp = () => {
        setSignUp((current) => !current);
    }

    return (
        <>
            {showLogin ?
                <RegisterLogin setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken} signUp={signUp}
                               toggleSignUp={toggleSignUp} setShowLogin={setShowLogin}/>
                : <>
                    <TopBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin}
                            setSignUp={setSignUp} AccessToken={AccessToken} setAccessToken={setAccessToken}/>
                    <WebCamCont isLoggedIn={isLoggedIn}/>
                    <PhotoFeed/>
                </>
            }

            <ToastContainer/>
        </>
    )
}

export default App;


