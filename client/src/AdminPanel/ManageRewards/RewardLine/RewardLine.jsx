import styles from './RewardLine.module.css';
import PropTypes from "prop-types";
import {FaEdit, FaSave, FaBackspace} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import setReward from "../../../API_Requests/setReward.jsx";
import deleteReward from "../../../API_Requests/deleteReward.jsx";

function RewardLine(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    const [point, setPoint] = useState(0);
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
        setPoint(props.points);
        setType(props.type);
        setDetails(props.details);
    }, [props.details, props.points, props.type]);

    const handleDelete = async (points) => {
        try {
            const result = await deleteReward(props.AccessToken, points);
            console.log(result);
            if (result.success) {
                return true;
            } else {
                console.error(result.message);
                return false;
            }
        } catch (error) {
            toast.error("Error Deleting Reward.",
                {position: "top-right"});
            console.error("Error details:", error);
            return false;
        }
    }


    const handleDeleteClick = () => {
        setShowPopup(true);
        document.body.style.overflow = "hidden"; // Disable scrolling
    };

    const handleCancel = () => {
        setShowPopup(false);
        document.body.style.overflow = "auto"; // Re-enable scrolling
    };

    const handleConfirmDelete = async () => {
        if (await handleDelete(props.points)) {
            setShowPopup(false);
            document.body.style.overflow = "auto"; // Re-enable scrolling
            props.getReward();
            toast.success("Reward Deleted.",
                {position: "top-right"});
        }
    };

    const handleCancelClick = () => {
        setType(props.type);
        setPoint(props.points);
        setDetails(props.details);
        setCanEdit(false);
    }

    const handleSave = async () => {
        if (props.rewards.some(reward => (reward.points !== props.points && reward.points === point))) {
            toast.error("Reward with same point already Exists.", {position: "top-right"});
        } else if (point === 0) {
            toast.error("Point can't be zero.", {position: "top-right"});
        } else if (details.length === 0) {
            toast.error("Details can't be empty", {position: "top-right"});
        } else if (type === 'Ether' && isNaN(Number(details))) {
            toast.error("Enter a numeric value for Ethers", {position: "top-right"});
        } else {
            try {
                const result = await setReward(props.AccessToken, point, type, details);
                if (result.success) {
                    if (props.points !== point) {
                        await handleDelete(props.points);
                    }
                    setCanEdit(false);
                    props.getReward();
                    toast.success("Reward successfully updated.", {position: "top-right"});
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error updating Reward", {position: "top-right"});
                console.error("Error updating Reward:", error);
            }
        }
    };

    const disp = (
        <div className={styles.tableLine}>
            <p className={styles.tableLineItem}>{props.id + 1}</p>
            <p className={styles.tableLineItem}>{props.points}</p>
            <p className={styles.tableLineItem}>{props.type}</p>
            <p className={styles.tableLineItem}>{props.details}</p>
            <div className={styles.icons}>
                <FaEdit className={styles.edit} onClick={() => setCanEdit(true)}/>
                <MdDelete className={styles.delete} onClick={handleDeleteClick}/>
            </div>
        </div>
    );

    const edit = (
        <div className={styles.tableLine}>
            <p className={styles.tableLineItem}>{props.id + 1}</p>
            {/*<p className={styles.tableLineItem}>{props.points}</p>*/}
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
    );

    return (
        <>
            {canEdit ? edit : disp}

            {showPopup && (
                <div className={styles.overlay}>
                    <div className={styles.popup}>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this reward?</p>
                        <div className={styles.buttonGroup}>
                            <button className={styles.confirmButton} onClick={handleConfirmDelete}>
                                Yes, Delete
                            </button>
                            <button className={styles.cancelButton} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

RewardLine.propTypes = {
    id: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    AccessToken: PropTypes.string.isRequired,
    getReward: PropTypes.func.isRequired,
    rewards: PropTypes.array.isRequired
};

export default RewardLine;