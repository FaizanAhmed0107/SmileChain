import serverAddress from "./serverAddress.js";

const HandleLikeImage = async (imageId, accessToken) => {
    try {
        const response = await fetch(serverAddress + "/api/image/" + imageId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const data = await response.json();
            return {success: true, data: data};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'No data Found!'};
        }

    } catch {
        return {success: false, message: 'Error Liking Image.'};
    }
};

export default HandleLikeImage;