import styles from './RewardLine.module.css';
import PropTypes from "prop-types";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useState} from "react";

function RewardLine(props) {
    const [showPopup, setShowPopup] = useState(false);

    const handleDeleteClick = () => {
        setShowPopup(true);
        document.body.style.overflow = "hidden"; // Disable scrolling
    };

    const handleCancel = () => {
        setShowPopup(false);
        document.body.style.overflow = "auto"; // Re-enable scrolling
    };

    const handleConfirmDelete = () => {
        console.log("Reward deleted with id:", props.id);
        setShowPopup(false);
        document.body.style.overflow = "auto"; // Re-enable scrolling
    };

    return (
        <>
            <div className={styles.tableLine}>
                <p className={styles.tableLineItem}>{props.id + 1}</p>
                <p className={styles.tableLineItem}>{props.points}</p>
                <p className={styles.tableLineItem}>{props.type}</p>
                <p className={styles.tableLineItem}>{props.details}</p>
                <div className={styles.icons}>
                    <FaEdit className={styles.edit}/>
                    <MdDelete className={styles.delete} onClick={handleDeleteClick}/>
                </div>
            </div>

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
    details: PropTypes.string.isRequired
};

export default RewardLine;