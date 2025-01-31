import styles from './RewardLine.module.css'
import PropTypes from "prop-types";
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

function RewardLine(props) {
    return (
        <>
            <div className={styles.tableLine}>
                <p className={styles.tableLineItem}>{props.id}</p>
                <p className={styles.tableLineItem}>{props.points}</p>
                <p className={styles.tableLineItem}>{props.type}</p>
                <p className={styles.tableLineItem}>{props.details}</p>
                <div className={styles.icons}>
                    <FaEdit className={styles.edit}/>
                    <MdDelete className={styles.delete}/>
                </div>
            </div>
            <div className={styles.popup}>
                hello
            </div>
        </>
    );
}

RewardLine.propTypes = {
    id: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
}

export default RewardLine