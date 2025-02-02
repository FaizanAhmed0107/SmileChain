import styles from './ManageRewards.module.css'
import {IoMdAdd} from "react-icons/io";
import RewardLine from "./RewardLine/RewardLine.jsx";
import PropTypes from "prop-types";

function ManageRewards(props) {
    return (
        <div className={styles.rewards}>
            <div className={styles.headLine}>
                <p className={styles.heading}>Rewards</p>
                <button className={styles.addReward}><IoMdAdd style={{fontSize: "20px"}}/>Add Reward</button>
            </div>
            <div className={styles.tableHeadLine}>
                <p className={styles.tableHead}>ID</p>
                <p className={styles.tableHead}>Points</p>
                <p className={styles.tableHead}>Type</p>
                <p className={styles.tableHead}>Details</p>
                <p className={styles.tableHead}>Action</p>
            </div>
            {
                props.rewards.map((reward, index) => (
                    <RewardLine key={index} details={reward.value} id={index} points={reward.points}
                                type={reward.type}/>
                ))
            }
        </div>
    );
}

ManageRewards.propTypes = {
    rewards: PropTypes.array.isRequired
}

export default ManageRewards