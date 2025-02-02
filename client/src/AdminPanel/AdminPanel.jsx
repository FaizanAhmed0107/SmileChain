import styles from './AdminPanel.module.css'
import {useEffect, useState} from "react";
import getAbout from "../API_Requests/GetAbout.jsx";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {FaSave} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import ManageRewards from "./ManageRewards/ManageRewards.jsx";
import setPointsPerPic from "../API_Requests/setPPP.jsx";
import setDelayValue from "../API_Requests/setDelayValue.jsx";
import getAdminValues from "../API_Requests/getAdminValues.jsx";
import getRewards from "../API_Requests/getRewards.jsx";

function AdminPanel(props) {
    const [userAdmin, setUserAdmin] = useState(false);
    const [pointsToAdd, setPointsToAdd] = useState(0);
    const [delay, setDelay] = useState(0);
    const [rewards, setRewards] = useState([]);
    const navigate = useNavigate();

    const home = () => {
        navigate('/');
    }

    const Logout = () => {
        props.setIsLoggedIn(false);
        props.setAccessToken("");
        navigate('/');
    };

    const getReward = async () => {
        try {
            const result = await getRewards();
            if (result.success) {
                setRewards(result.data.data);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            toast.error("Error fetching Reward", {
                position: "top-right",
            });
            console.error("Error fetching Reward:", error);
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getAbout(props.AccessToken);
                if (result.success) {
                    setUserAdmin(result.data.isAdmin);
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

        const getValues = async () => {
            try {
                const result = await getAdminValues(props.AccessToken);
                if (result.success) {
                    setPointsToAdd(result.data.data.pointsToAdd);
                    setDelay(result.data.data.postDelay);
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
            getValues();
            getReward();
        }
    }, [props.AccessToken, props.isLoggedIn]);

    const setAdminVal = async () => {
        try {
            const result1 = await setDelayValue(props.AccessToken, delay);
            if (result1.success) {
                const result2 = await setPointsPerPic(props.AccessToken, pointsToAdd);
                if (result2.success) {
                    toast.success("Values Updated Successfully.",
                        {position: "top-right"}
                    );
                } else {
                    console.error(result2.message);
                }
            } else {
                console.error(result1.message);
            }
        } catch (error) {
            toast.error("Error fetching user details",
                {position: "top-right"}
            );
            console.error("Error fetching user details:", error);
        }
    }

    return (
        userAdmin ?
            <>
                <div className={styles.top}>
                    <div></div>
                    <p className={styles.head}>Admin Panel</p>
                    <div className={styles.end}>
                        <button className={styles.logout} onClick={Logout}>Log out</button>
                    </div>
                </div>
                <div className={styles.body}>
                    <div className={styles.setting}>
                        <p className={styles.heading}>Settings</p>
                        <div className={styles.options}>

                            <div className={styles.option}>
                                <p className={styles.name}>Points to add</p>
                                <input type={"number"} className={styles.input} value={pointsToAdd ?? 0}
                                       onChange={(e) => setPointsToAdd(Number(e.target.value))}/>
                            </div>
                            <div className={styles.option}>
                                <p className={styles.name}>Delay between rewards (in hrs)</p>
                                <input type={"number"} className={styles.input} step="0.01" value={delay ?? 0}
                                       onChange={(e) => setDelay(Number(e.target.value))}/>
                            </div>
                        </div>
                        <button className={styles.saveSetting} onClick={setAdminVal}>
                            <FaSave style={{fontSize: "20px"}}/> Save Settings
                        </button>
                    </div>
                    <ManageRewards rewards={rewards} AccessToken={props.AccessToken} getReward={getReward}/>
                </div>
                <div className={styles.footer}>
                    <p className={styles.rewardCount}>Total Rewards: {rewards.length}</p>
                </div>
            </>
            :
            <div className={styles.denied}>
                You are not an admin
                <button className={styles.home} onClick={home}>Home</button>
            </div>
    );
}

AdminPanel.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
    setAccessToken: PropTypes.func.isRequired
}

export default AdminPanel