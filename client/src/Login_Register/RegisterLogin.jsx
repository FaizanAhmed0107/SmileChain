import Login from './Login.jsx';
import Side from './Side.jsx'
import styles from './RegisterLogin.module.css';
import PropTypes from "prop-types";
import {useState} from "react";

function RegisterLogin(props) {
    const [signUp, setSignUp] = useState(false);

    const toggleSignUp = () => {
        setSignUp((current) => !current);
    }


    const HideSignUp = () => {
        props.setShowLogin(false)
    }

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.outer} onClick={HideSignUp}>
            <div className={styles.card} onClick={stopPropagation}>
                <Login signUp={signUp} setIsLoggedIn={props.setIsLoggedIn} setAccessToken={props.setAccessToken}
                       setShowLogin={props.setShowLogin}/>
                <Side signUp={signUp} toggleSignUp={toggleSignUp}/>
            </div>
        </div>
    )
}

RegisterLogin.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired,
}

export default RegisterLogin;