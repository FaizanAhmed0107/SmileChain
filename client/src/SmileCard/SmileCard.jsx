import {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import HandleLikeImage from "../API_Requests/HandleLikeImage.jsx";
import styles from './SmileCard.module.css';
import io from "socket.io-client";
import serverAddress from "../API_Requests/serverAddress.js";

const socket = io(serverAddress);

function SmileCard(props) {
    const [likes, setLikes] = useState(props.likes);

    const likePic = async () => {
        const response = await HandleLikeImage(props.id, props.AccessToken);
        if (!response.success) {
            console.error(response.message);
        }
    };

    useEffect(() => {
        const handleLikeChange = (data) => {
            if (data.imageId === props.id) {
                setLikes(data.likes);
            }
        };
        socket.on("image-like-changed", handleLikeChange);

        return () => {
            socket.off("image-like-changed");
        };
    }, [props.id]);

    return (
        <div className={styles.container}>
            <img className={styles.image} src={props.image} alt="Captured Image"/>
            <div className={styles.line}>
                <p className={styles.time}>{props.time}</p>
                <button className={`${styles.likes} ${props.likedImg.includes(props.id) ? styles.liked : ""}`}
                        onClick={likePic}>👍{likes}</button>
            </div>
            <p className={styles.winner}>$ Winner!</p>
            <p className={styles.award}>🎉 0.001🪙 awarded! 🎉</p>
            <p className={styles.rating}>{props.rating}/5⭐</p>
        </div>
    );
}

SmileCard.propTypes = {
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired,
    AccessToken: PropTypes.string.isRequired,
    likedImg: PropTypes.array.isRequired,
};

export default SmileCard;
