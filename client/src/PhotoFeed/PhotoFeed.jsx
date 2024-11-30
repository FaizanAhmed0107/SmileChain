import {useEffect, useState} from "react";
import io from "socket.io-client";
import styles from './PhotoFeed.module.css'
import SmileCard from "../SmileCard/SmileCard.jsx";
import serverAddress from "../API Requests/serverAddress.js";
import getImages from "../API Requests/getImages.jsx";


const socket = io(serverAddress);

function PhotoFeed() {
    const [images, setImages] = useState([]);

    // Fetch initial images
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await getImages(); // Await the result
                if (result.success) {
                    console.log(result.data);
                    setImages(result.data);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
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