import styles from './Side.module.css'
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

function Side(props) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const login = (
        <div className={styles.container}>
            <h1 className={styles.heading}>Hello, Friend!</h1>
            <p className={styles.text}>Register with your personal details to use all of site features</p>
            <button className={styles.button} onClick={props.toggleSignUp}>Sign up</button>
        </div>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const signup = (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome Back!</h1>
            <p className={styles.text}>Enter your personal details to use all of site features</p>
            <button className={styles.button} onClick={props.toggleSignUp}>Log in</button>
        </div>
    );

    const [current, setCurrent] = useState(login);
    useEffect(() => {
        setTimeout(() => {
            setCurrent(props.signUp ? signup : login);
        }, 200)

    }, [login, props.signUp, signup]);

    return (
        <div className={`${styles.side} ${props.signUp ? styles.toggle_left : ' '}`}>
            {current}
        </div>
    );
}

Side.propTypes = {
    signUp: PropTypes.bool.isRequired,
    toggleSignUp: PropTypes.func.isRequired
}

export default Side;