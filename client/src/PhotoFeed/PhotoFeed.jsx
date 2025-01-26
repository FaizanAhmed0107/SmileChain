import {useEffect, useRef, useState, useCallback} from "react";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {BallTriangle} from 'react-loading-icons'
import styles from "./PhotoFeed.module.css";
import SmileCard from "../SmileCard/SmileCard.jsx";
import getImages from "../API_Requests/getImages.jsx";
import getAbout from "../API_Requests/GetAbout.jsx";
import socket from "../API_Requests/socket.js";

function PhotoFeed(props) {
    const [images, setImages] = useState([]);
    const [likedImg, setLikedImg] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userId = useRef(null);

    const fetchLikedImages = useCallback(async () => {
        if (props.isLoggedIn) {
            try {
                const result = await getAbout(props.AccessToken);
                if (result.success) {
                    userId.current = result.data.id;
                    setLikedImg(result.data.likedImages);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error fetching liked images", {position: "top-right"});
                console.error("Error fetching liked images:", error);
            }
        }
    }, [props.AccessToken, props.isLoggedIn]);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const result = await getImages();
                if (result.success) {
                    setImages(result.data);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error fetching images", {position: "top-right"});
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
        fetchLikedImages();
    }, [fetchLikedImages]);

    useEffect(() => {
        const handleNewImage = (newImage) => {
            setImages((prevImages) => [...prevImages, newImage]);
        };

        socket.on("new-image", handleNewImage);

        return () => {
            socket.off("new-image", handleNewImage);
        };
    }, []);

    useEffect(() => {
        const handleLikeChange = (data) => {
            if (props.isLoggedIn && data.userId === userId.current) {
                fetchLikedImages();
            }
        };

        socket.on("image-like-changed", handleLikeChange);

        return () => {
            socket.off("image-like-changed", handleLikeChange);
        };
    }, [fetchLikedImages, props.isLoggedIn]);

    useEffect(() => {
        if (!props.isLoggedIn) setLikedImg([]);
    }, [props.isLoggedIn]);

    return (
        <>
            {isLoading ?
                <BallTriangle className={styles.loading} fill={"hsl(201, 50%, 73%)"} speed={.75} stroke={"hsl(201, 50%, 73%)"}/>
                : images.length > 0 ?
                    <div className={styles.box}>
                        <p className={styles.head}>Winning Pictures!</p>
                        <div className={styles.container}>
                            {images.map((image, index) => (
                                <SmileCard
                                    key={index}
                                    likedImg={likedImg}
                                    updateLikedImg={setLikedImg}
                                    AccessToken={props.AccessToken}
                                    image={image.image}
                                    time={image.time}
                                    rating={image.stars}
                                    id={image._id}
                                    likes={image.likes}
                                    isLoggedIn={props.isLoggedIn}
                                    point={image.points}
                                />
                            ))}
                        </div>
                    </div>
                    : <></>
            }
        </>
    );
}

PhotoFeed.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default PhotoFeed;
