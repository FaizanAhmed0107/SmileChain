import styles from "./ClaimReward.module.css"
import RewardCard from "./RewardCard/RewardCard.jsx";
import {FaCoins} from "react-icons/fa";
import {MdKeyboardBackspace} from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import getPoints from "../API_Requests/getPoints.jsx";
import PropTypes from "prop-types";
import getRewards from "../API_Requests/getRewards.jsx";
import getAbout from "../API_Requests/GetAbout.jsx";
import getHistory from "../API_Requests/getHistory.jsx";

function ClaimReward(props) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [activeSort, setActiveSort] = useState("None");
    const [activeFilter, setActiveFilter] = useState("None");
    const [point, setPoint] = useState(0);
    const [user, setUser] = useState({});
    const [history, setHistory] = useState([]);
    const sortOptions = ["Ascending", "Descending"];
    const filterOptions = ["All", "Ethers", "Gift Cards", "Coupons"];
    const navigate = useNavigate();

    const toggleIsFilterOpen = () => {
        setIsSortOpen(false);
        setIsFilterOpen(s => !s);
    }
    const toggleIsSortOpen = () => {
        setIsFilterOpen(false);
        setIsSortOpen(s => !s);
    }


    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const sortedRewards = [...rewards].sort((a, b) => {
            if (activeSort === "Ascending") {
                return a.points - b.points;
            } else {
                return b.points - a.points;
            }
        });
        setRewards(sortedRewards);
    }, [activeSort]);

    useEffect(() => {
        const getUser = async () => {
            try {
                const result = await getAbout(props.AccessToken);
                if (result.success) {
                    setUser(result.data);
                    if (result.data.isAdmin) {
                        navigate('/admin');
                    }
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
                    setPoint(result.data.points);
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

        const getHist = async () => {
            try {
                const result = await getHistory(props.AccessToken);
                if (result.success) {
                    setHistory(result.data);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error fetching Reward History", {
                    position: "top-right",
                });
                console.error("Error fetching Reward History:", error);
            }
        }

        if (props.isLoggedIn) {
            getUser();
            getPoint();
            getReward();
            getHist();
        }
    }, [navigate, props.AccessToken, props.isLoggedIn]);

    const getTime = (time) => {
        const months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        };
        const date = new Date(time);
        return months[date.getMonth()] + " " + date.getDate() + ', ' + date.getFullYear();
    }

    const filterMethod = (reward) => {
        if (activeFilter === "Ethers")
            return reward.type === "Ether";
        else if (activeFilter === "Gift Cards")
            return reward.type === "Other" && reward.value.includes("Gift Card")
        else if (activeFilter === "Coupons")
            return reward.type === "Other" && !reward.value.includes("Gift Card")
        return true;
    }

    const changeSort = (option) => {
        setActiveSort(option);
        setIsSortOpen(false);
    };

    const changeFilter = (option) => {
        setActiveFilter(option);
        setIsFilterOpen(false);
    };

    return (
        <div>
            <div className={styles.top}>
                <div className={styles.left}>
                    <button className={styles.back} onClick={() => navigate('/')}>
                        <MdKeyboardBackspace style={{fontSize: "20px"}}/>
                    </button>
                    <p className={styles.points}>Points: {point} <FaCoins/></p>
                </div>
                <p className={styles.head}>Redeem Rewards</p>
                <div className={styles.end}>
                    <div style={{alignContent: "center"}}>
                        <p className={styles.filter} onClick={toggleIsFilterOpen}
                           aria-haspopup="Filter Menu" aria-expanded={isFilterOpen}>Filter</p>
                        <div className={`${styles.filterDropdown} ${isFilterOpen ? styles.open : ""}`}>
                            {filterOptions.map((option, index) => (
                                <div key={index} className={styles.sortFilterItem} onClick={() => changeFilter(option)}>
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{alignContent: "center"}}>
                        <p className={styles.sort} onClick={toggleIsSortOpen}
                           aria-haspopup="Sort Menu" aria-expanded={isSortOpen}>Sort</p>
                        <div className={`${styles.sortDropdown} ${isSortOpen ? styles.open : ""}`}>
                            {sortOptions.map((option, index) => (
                                <div key={index} className={styles.sortMenuItem} onClick={() => changeSort(option)}>
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.sideBar}>
                    <div className={styles.highest}>
                        <p className={styles.highText}>Highest Achieved</p>
                        <p className={styles.hp}>{user.highestPoint} Points <FaCoins/></p>
                    </div>

                    <div className={styles.highest}>
                        <p className={styles.highText}>Transaction History</p>
                        {
                            history.map((hist, index) => (
                                <div key={index} className={styles.hist}>
                                    <div className={styles.histTop}>
                                        <p className={styles.histLeft}>Redeemed {hist.points} Point{hist.points > 1 ? 's' : ""}</p>
                                        <p className={styles.histRight}>{hist.value} {hist.type === 'Ether' ? "ETH" : ""}</p>
                                    </div>
                                    <p className={styles.histBottom}>{getTime(hist.createdAt)}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.contain}>
                        {
                            rewards.length === 0 ?
                                <p>No reward Found</p> :
                                rewards.filter(filterMethod).map((reward) => (
                                    <RewardCard key={reward.points} points={reward.points} type={reward.type}
                                                details={reward.value} AccessToken={props.AccessToken}
                                                setPoint={setPoint} setHistory={setHistory}/>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

ClaimReward.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}

export default ClaimReward;