import styles from './Login.module.css';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import HandleLogin from "../API_Requests/HandleLogin.jsx";
import HandleSignup from "../API_Requests/HandleSignup.jsx";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {SvgIcon} from "@mui/material";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [account, setAccount] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
        return passwordRegex.test(password);
    };

    const togglePassVisible = () => {
        setIsPassVisible((current) => !current);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault(); // Prevents page refresh on form submission
        const response = await HandleLogin(email, password);

        if (response.success) {
            toast.success("Login successful!");
            props.setAccessToken(response.accessToken);
            props.setIsLoggedIn(true);
            props.setShowLogin(false);
        } else {
            toast.error(response.message || "Login failed!");
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            toast.error('Email is not valid. Please enter a valid email address.');
        } else if (!validatePassword(password)) {
            toast.error('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.');
        } else if (password !== confPassword) {
            toast.error('Confirm Password does not Match password.')
        } else {
            const response = await HandleSignup(username, email, password, account);

            if (response.success) {
                toast.success("Account created successfully! Logging in...");
                props.setAccessToken(response.accessToken);
                props.setIsLoggedIn(true);
                props.setShowLogin(false);
            } else {
                toast.error(response.message || "Signup failed!");
            }
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loginForm = (
        <>
            <h1 className={styles.heading}>Log In</h1>
            <p className={styles.text}>Enter your email and password to log in</p>
            <form className={styles.form_container} onSubmit={handleLoginSubmit}>
                <input type="text" className={styles.userInput} name="email" placeholder="Email" required
                       onChange={(e) => setEmail(e.target.value)}/>
                <div className={styles.passBox}>
                    <input type={isPassVisible ? 'text' : 'password'} className={styles.passField} name="password"
                           placeholder="Password" required
                           onChange={(e) => setPassword(e.target.value)}/>
                    <SvgIcon className={styles.visibleIcon}
                             component={isPassVisible ? VisibilityOffIcon : VisibilityIcon}
                             onClick={togglePassVisible}/>
                </div>
                <button type="submit" className={styles.lgbutton}>Log in</button>
            </form>
        </>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const signupForm = (
        <>
            <h1 className={styles.heading}>Create Account</h1>
            <p className={styles.text}>Use your email for registration</p>
            <form className={styles.form_container} onSubmit={handleRegisterSubmit}>
                <input type="text" className={styles.userInput} name="username" placeholder="Username" required
                       onChange={(e) => setUsername(e.target.value)}/>
                <input type="text" className={styles.userInput} name="email" placeholder="Email" required
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" className={styles.userInput} name="account" placeholder="Etherium Account" required
                       onChange={(e) => setAccount(e.target.value)}/>
                <div className={styles.passBox}>
                    <input type={isPassVisible ? 'text' : 'password'} className={styles.passField} name="password"
                           placeholder="Password" required
                           onChange={(e) => setPassword(e.target.value)}/>
                    <SvgIcon className={styles.visibleIcon}
                             component={isPassVisible ? VisibilityOffIcon : VisibilityIcon}
                             onClick={togglePassVisible}/>
                </div>
                <div className={styles.passBox}>
                    <input type={isPassVisible ? 'text' : 'password'} className={styles.passField} name="confpassword"
                           placeholder="Confirm Password" required
                           onChange={(e) => setConfPassword(e.target.value)}/>
                    <SvgIcon className={styles.visibleIcon}
                             component={isPassVisible ? VisibilityOffIcon : VisibilityIcon}
                             onClick={togglePassVisible}/>
                </div>
                <button type="submit" className={styles.subutton}>Sign up</button>
            </form>
        </>
    );

    const [current, setCurrent] = useState(loginForm);
    useEffect(() => {
        setTimeout(() => {
            setCurrent(props.signUp ? signupForm : loginForm);
        }, 250);
    }, [props.signUp, loginForm, signupForm]);

    return (
        <>
            <div className={`${styles.login_container} ${props.signUp ? styles.toggle_right : ' '}`}>
                {current}
            </div>
        </>
    );
}

Login.propTypes = {
    signUp: PropTypes.bool.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    setShowLogin: PropTypes.func.isRequired
};

export default Login;