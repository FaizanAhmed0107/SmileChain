import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import styles from './PhotoFeed.module.css';
import SmileCard from "../SmileCard/SmileCard.jsx";
import serverAddress from "../API_Requests/serverAddress.js";
import getImages from "../API_Requests/getImages.jsx";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import getAbout from "../API_Requests/GetAbout.jsx";

const socket = io(serverAddress);

function PhotoFeed(props) {
    const [images, setImages] = useState([]);
    const [likedImg, setLikedImg] = useState([]);
    const userId = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchLikedImages = async () => {
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
                toast.error("Error fetching liked images", {
                    position: "top-right",
                });
                console.error("Error fetching images:", error);
            }
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await getImages();
                if (result.success) {
                    setImages(result.data);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                toast.error("Error fetching images", {
                    position: "top-right",
                });
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
        fetchLikedImages();
    }, [fetchLikedImages, props.AccessToken]);

    // Listen for new image socket events
    useEffect(() => {
        socket.on("new-image", (newImage) => {
            setImages((prevImages) => [...prevImages, newImage]);
        });

        return () => {
            socket.off("new-image");
        };
    }, []);

    // Listen for like change socket events
    useEffect(() => {
        socket.on("image-like-changed", (data) => {
            if (props.isLoggedIn && data.userId === userId.current) {
                fetchLikedImages();  // Refresh the liked images
            }
        });

        return () => {
            socket.off("image-like-changed");
        };
    }, [fetchLikedImages, props.isLoggedIn]);

    useEffect(() => {
        if (!props.isLoggedIn)
            setLikedImg([]);
    }, [props.isLoggedIn]);

    return (
        <>
            {images.length > 0 && <p className={styles.head}>Winning Pictures</p>}
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
                    />
                ))}
            </div>
        </>
    );
}

PhotoFeed.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

export default PhotoFeed;