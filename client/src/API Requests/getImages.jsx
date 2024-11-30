import serverAddress from "./serverAddress.js";

const getImages = async () => {
    try {
        const response = await fetch(serverAddress + "/api/image", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return {success: true, data: data};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'No data Found!'};
        }

    } catch {
        return {success: false, message: 'Error Getting contacts.'};
    }
};

export default getImages;