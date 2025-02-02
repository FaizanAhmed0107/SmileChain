import styles from './RewardLine.module.css';
import PropTypes from "prop-types";
import {FaEdit} from "react-icons/fa";
import {FaSave} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import setReward from "../../../API_Requests/setReward.jsx";
import deleteReward from "../../../API_Requests/deleteReward.jsx";

function RewardLine(props) {
    const [showPopup, setShowPopup] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    const [type, setType] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
        setType(props.type);
        setDetails(props.details);
    }, [props.details, props.points, props.type]);

    const handleDeleteClick = () => {
        setShowPopup(true);
        document.body.style.overflow = "hidden"; // Disable scrolling
    };

    const handleCancel = () => {
        setShowPopup(false);
        document.body.style.overflow = "auto"; // Re-enable scrolling
    };

    const handleConfirmDelete = async () => {
        try {
            const result = await deleteReward(props.AccessToken, props.points);
            console.log(result);
            if (result.success) {
                setShowPopup(false);
                document.body.style.overflow = "auto"; // Re-enable scrolling
                props.getReward();
                toast.success("Reward Deleted.",
                    {position: "top-right"});
            } else {
                console.error(result.message);
            }
        } catch (error) {
            toast.error("Error Deleting Reward.",
                {position: "top-right"});
            console.error("Error details:", error);
        }
    };

    const handleSave = async () => {
        try {
            const result = await setReward(props.AccessToken, props.points, type, details);
            if (result.success) {
                setCanEdit(false);
                props.getReward();
                toast.success("Reward successfully updated.",
                    {position: "top-right"}
                );
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
            <p className={styles.tableLineItem}>{props.points}</p>
            <select className={styles.inputType} value={type ?? 'Ether'}
                    onChange={(e) => setType(e.target.value)}>
                <option value="Ether">Ether</option>
                <option value="Other">Other</option>
            </select>
            <input type={"string"} className={styles.inputDetails} value={details ?? ""}
                   onChange={(e) => setDetails(e.target.value)}/>
            <div className={styles.icons}>
                <FaSave className={styles.edit} onClick={handleSave}/>
                <MdDelete className={styles.delete} onClick={handleDeleteClick}/>
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
    getReward: PropTypes.func.isRequired
};

export default RewardLine;