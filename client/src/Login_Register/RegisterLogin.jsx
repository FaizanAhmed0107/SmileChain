import Login from './Login.jsx';
import Side from './Side.jsx'
import styles from './RegisterLogin.module.css';
import PropTypes from "prop-types";

function RegisterLogin(props) {
    const HideSignUp = () => {
        props.setShowLogin(false)
    }

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.outer} onClick={HideSignUp}>
            <div className={styles.card} onClick={stopPropagation}>
                <Login signUp={props.signUp} setIsLoggedIn={props.setIsLoggedIn} setAccessToken={props.setAccessToken} setShowLogin={props.setShowLogin}/>
                <Side signUp={props.signUp} toggleSignUp={props.toggleSignUp}/>
            </div>
        </div>
    )
}

RegisterLogin.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    signUp: PropTypes.bool.isRequired,
    toggleSignUp: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired,
}

export default RegisterLogin;