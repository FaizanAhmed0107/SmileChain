import styles from "./RewardCard.module.css"
import PropTypes from "prop-types";
import {FaCoins} from "react-icons/fa";

function RewardCard(props) {
    return (
        <div className={styles.outer}>
            <p className={styles.pointsText}><FaCoins/> {props.points} Points</p>
            <div className={styles.details}>{props.details}</div>
            <button className={styles.redeem}>Redeem Now</button>
        </div>
    );
}

RewardCard.propTypes = {
    points: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
}

export default RewardCard;