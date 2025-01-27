import styles from './TopBar.module.css';
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import getAbout from "../API_Requests/GetAbout.jsx";
import getPoints from "../API_Requests/getPoints.jsx";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

function TopBar(props) {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

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
        const getPoint = async () => {
            try {
                const result = await getPoints(props.AccessToken);
                if (result.success) {
                    props.setPoint(result.data.points);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error fetching user points", {
                    position: "top-right",
                });
                console.error("Error fetching user points:", error);
            }
        }

        if (props.isLoggedIn) {
            getUser();
            getPoint();
        }
    }, [props.AccessToken, props.isLoggedIn]);


    const displayLogin = () => {
        navigate('/login');
    };

    const Logout = () => {
        props.setIsLoggedIn(false);
        props.setAccessToken("");
    };

    const pointIcon = (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
             strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" fill={"#ff2424"} stroke={"#474747"}></polyline>
            <circle cx="12" cy="8" r="7" fill={"#ffd824"} stroke={"#474747"}></circle>
        </svg>
    )

    const login = (
        <div className={styles.loginCont}>
            <button className={styles.loginButton} onClick={displayLogin}>
                Log in / Sign up
            </button>
        </div>
    );

    const loggedIn = (
        <div className={styles.logoutCont}>
            <p className={styles.username}>Welcome, {user}</p>
            <button className={styles.logoutButton} onClick={Logout}>Log out</button>
        </div>
    );

    const points = (
            props.isLoggedIn ? <div className={styles.pointsBox}>
                    <p className={styles.points}>Points: {props.point} {pointIcon}</p>
                </div> :
                <div/>
        )
    ;

    return (
        <header className={styles.head}>
            {props.isSmall ?
                <>
                    <div className={styles.top}>
                        <h1 className={styles.heading}>Smile Chain</h1>
                        <p className={styles.below}>Unlock happiness and earn rewards for your genuine smiles!</p>
                    </div>
                    <div className={styles.bottom}>
                        {props.isLoggedIn ? <>{points} {loggedIn}</> : login}
                    </div>
                </>
                :
                <>
                    {points}
                    <div>
                        <h1 className={styles.heading}>Smile Chain</h1>
                        <p className={styles.below}>Unlock happiness and earn rewards for your genuine smiles!</p>
                    </div>
                    {props.isLoggedIn ? loggedIn : login}
                </>
            }
        </header>
    );
}


TopBar.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isSmall: PropTypes.bool.isRequired,
    setAccessToken: PropTypes.func.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
    point: PropTypes.number.isRequired,
    setPoint: PropTypes.func.isRequired
}

export default TopBar;