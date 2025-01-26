import styles from './TopBar.module.css';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import getAbout from "../API_Requests/GetAbout.jsx";
import {toast} from "react-toastify";

function TopBar(props) {
    const [user, setUser] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getAbout(props.AccessToken);
                if (result.success) {
                    setUser(result.data.username);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error fetching user details", {
                    position: "top-right",
                });
                console.error("Error fetching user details:", error);
            }
        };

        if (props.isLoggedIn) {
            getUser();
        }
    }, [props.AccessToken, props.isLoggedIn]);


    const displayLogin = () => {
        props.setShowLogin(true);
    };

    const Logout = () => {
        props.setIsLoggedIn(false);
        props.setShowLogin(false);
        props.setAccessToken("");
    };

    const login = (
        <div>
            <button className={props.isSmall ? styles.centeredButton : styles.login} onClick={displayLogin}>
                Log in / Sign up
            </button>
        </div>
    );

    const loggedIn = (
        <div className={props.isSmall ? styles.centeredContainer : styles.username}>
            <p>Welcome, {user}</p>
            <button className={styles.logout} onClick={Logout}>Log out</button>
        </div>
    );

    return (
        <header className={styles.head}>
            <div>
                <h1 className={styles.heading}>Smile Rewards</h1>
                <p className={styles.below}>Unlock happiness and earn rewards for your genuine smiles!</p>
            </div>
            {props.isLoggedIn ? loggedIn : login}
        </header>
    );
}


TopBar.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    setShowLogin: PropTypes.func.isRequired,
    isSmall: PropTypes.bool.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default TopBar;