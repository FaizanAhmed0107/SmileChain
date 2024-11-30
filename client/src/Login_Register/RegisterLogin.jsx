import Login from './Login.jsx';
import Side from './Side.jsx'
import styles from './RegisterLogin.module.css';
import {useState} from "react";
import PropTypes from "prop-types";

function RegisterLogin(props) {

    const [signUp, setSignUp] = useState(false);

    const toggleSignUp = () => {
        setSignUp((current) => !current);
    }

    return (
        <div className={styles.outer}>
            <div className={styles.card}>
                <Login signUp={signUp} setIsLoggedIn={props.setIsLoggedIn} setAccessToken={props.setAccessToken}/>
                <Side signUp={signUp} toggleSignUp={toggleSignUp}/>
            </div>
        </div>
    )
}

RegisterLogin.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setAccessToken: PropTypes.func.isRequired,
}

export default RegisterLogin;