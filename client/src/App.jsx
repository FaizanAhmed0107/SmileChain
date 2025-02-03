import {useState, useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RegisterLogin from "./Login_Register/RegisterLogin.jsx";
import DeviceDetector from "./DeviceDetector.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Front from "./Front/Front.jsx";
import ClaimReward from "./ClaimReward/ClaimReward.jsx";
import AdminPanel from "./AdminPanel/AdminPanel.jsx";

function App() {
    // Initialize state with values from sessionStorage (if they exist)
    const [isSmall, setIsSmall] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem("isLoggedIn")) || false);
    const [AccessToken, setAccessToken] = useState(sessionStorage.getItem("AccessToken") || "");

    // Sync state changes to sessionStorage
    useEffect(() => {
        sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        sessionStorage.setItem("AccessToken", AccessToken);
    }, [AccessToken]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Front AccessToken={AccessToken} isLoggedIn={isLoggedIn} isSmall={isSmall}
                            setAccessToken={setAccessToken} setIsLoggedIn={setIsLoggedIn}/>,
        },
        {
            path: "/login",
            element: <RegisterLogin setIsLoggedIn={setIsLoggedIn} setAccessToken={setAccessToken}
                                    isSmall={isSmall}/>,
        },
        {
            path: "/redeem",
            element: <ClaimReward AccessToken={AccessToken} isLoggedIn={isLoggedIn}/>
        },
        {
            path: "/admin",
            element: <AdminPanel AccessToken={AccessToken} isLoggedIn={isLoggedIn} setAccessToken={setAccessToken}
                                 setIsLoggedIn={setIsLoggedIn}/>
        }
    ]);


    return (
        <>
            <RouterProvider router={router}/>
            <DeviceDetector setIsSmall={setIsSmall}/>
            <ToastContainer/>
        </>
    );
}

export default App;