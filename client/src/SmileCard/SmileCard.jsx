import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import styles from "./SmileCard.module.css";
import socket from "../API_Requests/socket.js";
import {IoMdThumbsUp} from "react-icons/io";
import {FaStar} from "react-icons/fa";

function SmileCard(props) {
    const [likes, setLikes] = useState(props.likes);

    const likePic = () => {
        if (props.isLoggedIn) {
            // Optimistic update
            const wasLiked = props.likedImg.includes(props.id);
            setLikes((prevLikes) => (wasLiked ? prevLikes - 1 : prevLikes + 1));
            if (wasLiked) {
                props.updateLikedImg((prevLiked) => prevLiked.filter((id) => id !== props.id));
            } else {
                props.updateLikedImg((prevLiked) => [...prevLiked, props.id]);
            }

            // Emit the like event
            socket.emit(
                "likeImage",
                {imageId: props.id, AccessToken: props.AccessToken},
                (response) => {
                    if (!response || !response.success) {
                        console.error(response?.message || "No response from server");
                        toast.error("Failed to like the image. Please try again.", {
                            position: "top-right",
                        });

                        // Revert optimistic update
                        setLikes((prevLikes) => (wasLiked ? prevLikes + 1 : prevLikes - 1));
                        props.updateLikedImg((prevLiked) =>
                            wasLiked
                                ? [...prevLiked, props.id]
                                : prevLiked.filter((id) => id !== props.id)
                        );
                    }
                }
            );
        } else {
            toast.error("Please log in to like.", {
                position: "top-right",
            });
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
            socket.off("image-like-changed", handleLikeChange);
        };
    }, [props.id]);

    const pointIcon = (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
             strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" fill={"#ff2424"} stroke={"#ff2424"}></polyline>
            <circle cx="12" cy="8" r="7" fill={"#ffd824"} stroke={"#ffd824"}></circle>
        </svg>
    )

    return (
        <div className={styles.container}>
            <img className={styles.image} src={props.image} alt="Captured Image"/>
            <div className={styles.line}>
                <p className={styles.time}>{props.time}</p>
                <button
                    className={`${styles.likes} ${
                        props.isLoggedIn && props.likedImg.includes(props.id) ? styles.liked : ""
                    }`}
                    onClick={likePic}
                >
                    <IoMdThumbsUp/>{likes}
                </button>
            </div>
            <p className={styles.winner}>$ Winner!</p>
            <p className={styles.award}>🎉 {props.point}{pointIcon} awarded! 🎉</p>
            <p className={styles.rating}>{props.rating}/5 <FaStar className={styles.star}/></p>
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
    likedImg: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateLikedImg: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    point: PropTypes.number.isRequired
};

export default SmileCard;
