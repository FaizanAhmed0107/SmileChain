import {useState} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import TopBar from "./TopBar/TopBar.jsx";
import WebCamCont from "./WebCamContain/WebCamCont.jsx";
import PhotoFeed from "./PhotoFeed/PhotoFeed.jsx";


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <TopBar isLoggedIn={isLoggedIn}/>
            <WebCamCont isLoggedIn={isLoggedIn}/>
            <PhotoFeed/>

            <ToastContainer/>
        </>
    )
}

export default App;


