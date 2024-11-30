import {useEffect, useState} from "react";
import io from "socket.io-client";
import styles from './PhotoFeed.module.css'
import SmileCard from "../SmileCard/SmileCard.jsx";
import serverAddress from "../API_Requests/serverAddress.js";
import getImages from "../API_Requests/getImages.jsx";
import {toast} from "react-toastify";


const socket = io(serverAddress);

function PhotoFeed() {
    const [images, setImages] = useState([]);

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
    }, []);


    useEffect(() => {
        socket.on("new-image", (newImage) => {
            setImages((prevImages) => [...prevImages, newImage]);
        });

        return () => {
            socket.off("new-image");
        };
    }, []);

    return (
        <>
            {images.length > 0 && <p className={styles.head}>Winning Pictures</p>}
            <div className={styles.container}>
                {
                    images.map((image, index) => {
                            return (
                                <SmileCard
                                    key={index}
                                    image={image.image}
                                    time={image.time}
                                    rating={image.stars}
                                />
                            )
                        }
                    )
                }
            </div>
        </>
    )
}


export default PhotoFeed;


// 11/18/2024, 2:40:09 AM