import {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import styles from './PhotoFeed.module.css'
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

    const fetchLikedImages = async () => {
        try {
            const result = await getAbout(props.AccessToken); // Await the result
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
    };

    // Fetch initial images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await getImages(); // Await the result
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
    }, [props.AccessToken]);


    useEffect(() => {
        socket.on("new-image", (newImage) => {
            setImages((prevImages) => [...prevImages, newImage]);
        });

        return () => {
            socket.off("new-image");
        };
    }, []);

    useEffect(() => {
        socket.on("image-like-changed", (data) => {
            if (props.isLoggedIn) {
                if (data.userId === userId.current)
                    fetchLikedImages()
            }
        });

        return () => {
            socket.off("image-like-changed");
        };
    }, [fetchLikedImages, props.isLoggedIn]);

    return (
        <>
            {images.length > 0 && <p className={styles.head}>Winning Pictures</p>}
            <div className={styles.container}>
                {
                    images.map((image, index) => {
                            return (
                                <SmileCard
                                    likedImg={likedImg}
                                    AccessToken={props.AccessToken}
                                    key={index}
                                    image={image.image}
                                    time={image.time}
                                    rating={image.stars}
                                    id={image._id}
                                    likes={image.likes}
                                />
                            )
                        }
                    )
                }
            </div>
        </>
    )
}

PhotoFeed.propTypes = {
    AccessToken: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}

export default PhotoFeed;


// 11/18/2024, 2:40:09 AM