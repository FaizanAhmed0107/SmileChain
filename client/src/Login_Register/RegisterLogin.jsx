import Login from './Login.jsx';
import Side from './Side.jsx'
import styles from './RegisterLogin.module.css';
import PropTypes from "prop-types";
import {useState} from "react";
import MobileLogin from "./MobileLogin.jsx";

function RegisterLogin(props) {
    const [signUp, setSignUp] = useState(false);

    const toggleSignUp = () => {
        setSignUp((current) => !current);
    };

    const HideSignUp = () => {
        props.setShowLogin(false)
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.outer} onClick={HideSignUp}>
            {
                props.isSmall ? (
                    <div className={styles.halfCard} onClick={stopPropagation}>
                        <MobileLogin setAccessToken={props.setAccessToken} toggleSignUp={toggleSignUp} signUp={signUp}
                                     setShowLogin={props.setShowLogin} setIsLoggedIn={props.setIsLoggedIn}/>
                    </div>
                ) : (
                    <div className={styles.fullCard} onClick={stopPropagation}>
                        <Login signUp={signUp} setIsLoggedIn={props.setIsLoggedIn} setAccessToken={props.setAccessToken}
                               setShowLogin={props.setShowLogin}/>
                        <Side signUp={signUp} toggleSignUp={toggleSignUp}/>
                    </div>
                )
            }
        </div>
    )
}

RegisterLogin.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired,
    isSmall: PropTypes.bool.isRequired,
}

export default RegisterLogin;