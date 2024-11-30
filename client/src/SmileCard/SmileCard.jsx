import {useState} from "react";
import styles from './SmileCard.module.css'
import PropTypes from "prop-types";

function SmileCard(props) {
    const [likes, setLikes] = useState(0);

    const increaseLikes = () => {
        setLikes((current) => current + 1)
    }

    return (
        <div className={styles.container}>
            <img className={styles.image} src={props.image} alt="Captured Image"/>
            <div className={styles.line}>
                <p className={styles.time}>{props.time}</p>
                <button className={styles.likes} onClick={increaseLikes}>👍{likes}</button>
            </div>
            <p className={styles.winner}>$ Winner!</p>
            <p className={styles.award}>🎉 0.001🪙 awarded! 🎉</p>
            <p className={styles.rating}>{props.rating}/5⭐</p>
        </div>
    )
}

SmileCard.propTypes = {
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
}

export default SmileCard;