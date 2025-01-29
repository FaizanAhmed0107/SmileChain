import styles from "./ClaimReward.module.css"
import RewardCard from "./RewardCard/RewardCard.jsx";
import {FaCoins} from "react-icons/fa";
import {MdKeyboardBackspace} from "react-icons/md";
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import getPoints from "../API_Requests/getPoints.jsx";
import PropTypes from "prop-types";

function ClaimReward(props) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [activeSort, setActiveSort] = useState("Ascending");
    const [activeFilter, setActiveFilter] = useState("None");
    const [point, setPoint] = useState(0);
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


    const [rewards, setRewards] = useState([
        {point: 1500, type: "Ether", detail: "0.05 ETH"},
        {point: 2000, type: "Other", detail: "₹500 Amazon Gift Card"},
        {point: 3500, type: "Ether", detail: "0.15 ETH"},
        {point: 2200, type: "Other", detail: "₹1000 Swiggy Gift Card"},
        {point: 3200, type: "Ether", detail: "0.15 ETH"},
        {point: 2020, type: "Other", detail: "50% discount Flipkart"},
        {point: 3503, type: "Ether", detail: "0.15 ETH"},
    ]);

    useEffect(() => {
        const sortedRewards = [...rewards].sort((a, b) => {
            if (activeSort === "Ascending") {
                return a.point - b.point;
            } else {
                return b.point - a.point;
            }
        });
        setRewards(sortedRewards);
    }, [activeSort, rewards]);

    useEffect(() => {
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

        if (props.isLoggedIn) {
            getPoint();
        }
    }, [props.AccessToken, props.isLoggedIn]);

    const filterMethod = (reward) => {
        if (activeFilter === "Ethers")
            return reward.type === "Ether";
        else if (activeFilter === "Gift Cards")
            return reward.type === "Other" && reward.detail.includes("Gift Card")
        else if (activeFilter === "Coupons")
            return reward.type === "Other" && !reward.detail.includes("Gift Card")
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
                <div style={{alignContent: "center"}}>
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
            <div className={styles.contain}>
                {
                    rewards.filter(filterMethod).map((reward) => (
                        <RewardCard key={reward.point} points={reward.point} type={reward.type}
                                    details={reward.detail}/>
                    ))
                }
            </div>
            <button className={styles.back} onClick={() => navigate('/')}>
                <MdKeyboardBackspace style={{fontSize: "20px"}}/> Back
            </button>
        </div>
    )
}

ClaimReward.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}

export default ClaimReward;