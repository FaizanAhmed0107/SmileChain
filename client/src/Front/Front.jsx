import TopBar from "../TopBar/TopBar.jsx";
import WebCamCont from "../WebCamContain/WebCamCont.jsx";
import PhotoFeed from "../PhotoFeed/PhotoFeed.jsx";
import {useState} from "react";
import PropTypes from "prop-types";

function Front(props) {
    const [point, setPoint] = useState(0);

    return (
        <>
            <TopBar
                isLoggedIn={props.isLoggedIn}
                setIsLoggedIn={props.setIsLoggedIn}
                AccessToken={props.AccessToken}
                setAccessToken={props.setAccessToken}
                isSmall={props.isSmall}
                point={point}
                setPoint={setPoint}
            />
            <WebCamCont isLoggedIn={props.isLoggedIn} AccessToken={props.AccessToken} setPoint={setPoint}
                        threshold={0.6}/>
            <PhotoFeed isLoggedIn={props.isLoggedIn} AccessToken={props.AccessToken}/>
        </>
    )
}

Front.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isSmall: PropTypes.bool.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default Front;