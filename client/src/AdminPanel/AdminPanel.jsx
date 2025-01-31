import styles from './AdminPanel.module.css'
import {useEffect, useState} from "react";
import getAbout from "../API_Requests/GetAbout.jsx";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {FaSave} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import ManageRewards from "./ManageRewards/ManageRewards.jsx";

function AdminPanel(props) {
    const [userAdmin, setUserAdmin] = useState(false);
    const navigate = useNavigate();

    const rewards = [
        {points: 1500, type: 'Ether', value: 0.05},
        {points: 2000, type: 'Ether', value: 0.10},
        {points: 3500, type: 'Other', value: '₹500 Amazon Gift Card'},
        {points: 4000, type: 'Ether', value: 0.15},
        {points: 4500, type: 'Other', value: '50% Flipkart Discount'},
    ];

    const home = () => {
        navigate('/');
    }

    const Logout = () => {
        props.setIsLoggedIn(false);
        props.setAccessToken("");
        navigate('/');
    };

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

        if (props.isLoggedIn) {
            getUser();
        }
    }, [props.AccessToken, props.isLoggedIn]);

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
                                <input type={"number"} className={styles.input}></input>
                            </div>
                            <div className={styles.option}>
                                <p className={styles.name}>Delay between rewards (in hrs)</p>
                                <input type={"number"} className={styles.input}></input>
                            </div>
                        </div>
                        <button
                            className={styles.saveSetting}><FaSave style={{fontSize: "20px"}}/> Save Settings
                        </button>
                    </div>
                    <ManageRewards rewards={rewards}/>
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