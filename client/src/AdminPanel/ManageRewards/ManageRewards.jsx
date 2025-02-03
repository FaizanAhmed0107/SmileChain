import styles from './ManageRewards.module.css'
import {IoMdAdd} from "react-icons/io";
import RewardLine from "./RewardLine/RewardLine.jsx";
import PropTypes from "prop-types";
import {FaBackspace, FaSave} from "react-icons/fa";
import {useState} from "react";
import setReward from "../../API_Requests/setReward.jsx";
import {toast} from "react-toastify";

function ManageRewards(props) {
    const [isNew, setIsNew] = useState(false);
    const [point, setPoint] = useState(0);
    const [type, setType] = useState("Ether");
    const [details, setDetails] = useState("");

    const handleCancelClick = () => {
        setIsNew(false);
        setPoint(0);
        setType("Ether");
        setDetails("");
    }

    const handleSave = async () => {
        if (props.rewards.some(reward => reward.points === point)) {
            toast.error("Reward with same point already Exists.",
                {position: "top-right"}
            );
        } else if (point === 0) {
            toast.error("Point cant be zero.",
                {position: "top-right"}
            );
        } else if (details.length === 0) {
            toast.error("Details cant be empty",
                {position: "top-right"}
            );
        } else if (type === 'Ether' && isNaN(Number(details))) {
            toast.error("Enter a numeric value for Ethers",
                {position: "top-right"}
            );
        } else {
            try {
                const result = await setReward(props.AccessToken, point, type, details);
                if (result.success) {
                    setIsNew(false);
                    props.getReward();
                    toast.success("Reward successfully updated.",
                        {position: "top-right"}
                    );
                    setIsNew(false);
                    setPoint(0);
                    setType("Ether");
                    setDetails("");
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error updating Reward",
                    {position: "top-right"}
                );
                console.error("Error updating Reward:", error);
            }
        }
    }

    return (
        <div className={styles.rewards}>
            <div className={styles.headLine}>
                <p className={styles.heading}>Rewards</p>
                <button className={styles.addReward} onClick={() => setIsNew(true)}><IoMdAdd
                    style={{fontSize: "20px"}}/>Add Reward
                </button>
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
                                type={reward.type} AccessToken={props.AccessToken} getReward={props.getReward}
                                rewards={props.rewards}/>
                ))
            }
            {
                isNew &&
                <div className={styles.tableLine}>
                    <p className={styles.tableLineItem}>*</p>
                    <input type={"string"} className={styles.inputPoints} value={point ?? 0}
                           onChange={(e) => setPoint(Number(e.target.value))}/>
                    <select className={styles.inputType} value={type ?? 'Ether'}
                            onChange={(e) => setType(e.target.value)}>
                        <option value="Ether">Ether</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type={"string"} className={styles.inputDetails} value={details ?? ""}
                           onChange={(e) => setDetails(e.target.value)}/>
                    <div className={styles.icons}>
                        <FaSave className={styles.edit} onClick={handleSave}/>
                        <FaBackspace className={styles.delete} onClick={handleCancelClick}/>
                    </div>
                </div>
            }
        </div>
    );
}

ManageRewards.propTypes = {
    rewards: PropTypes.array.isRequired,
    AccessToken: PropTypes.string.isRequired,
    getReward: PropTypes.func.isRequired
}

export default ManageRewards