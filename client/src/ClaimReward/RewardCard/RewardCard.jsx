import styles from "./RewardCard.module.css"
import PropTypes from "prop-types";
import {FaCoins} from "react-icons/fa";
import {toast} from "react-toastify";
import redeemReward from "../../API_Requests/redeemReward.jsx";
import getPoints from "../../API_Requests/getPoints.jsx";

function RewardCard(props) {

    const redeem = async () => {
        try {
            const result = await redeemReward(props.AccessToken, props.points);
            if (result.success) {
                toast.success(result.data.message, {
                    position: "top-right",
                });
                setTimeout(() => {
                    getPoint();
                }, 8000);
            } else {
                toast.error(result.message, {
                    position: "top-right",
                });
                console.error(result.message);
            }
        } catch (error) {
            toast.error("Error redeeming Reward", {
                position: "top-right",
            });
            console.error("Error redeeming Reward:", error);
        }
    }

    const getPoint = async () => {
        try {
            const result = await getPoints(props.AccessToken);
            if (result.success) {
                props.setPoint(result.data.points);
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


    return (
        <div className={styles.outer}>
            <p className={styles.pointsText}><FaCoins/> {props.points} Points</p>
            <div className={styles.details}>{props.details} {props.type === 'Ether' ? "ETH" : ""}</div>
            <button className={styles.redeem} onClick={redeem}>Redeem Now</button>
        </div>
    );
}

RewardCard.propTypes = {
    points: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    AccessToken: PropTypes.string.isRequired,
    setPoint: PropTypes.func.isRequired
}

export default RewardCard;