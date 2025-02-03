import serverAddress from "./serverAddress.js";

const CheckImage = async (img, stars, accessToken) => {
    try {
        const time = new Date();
        const response = await fetch(serverAddress + '/api/image', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({image: img, time, stars}),
        });

        if (response.ok) {
            const result = await response.json();
            return {success: true, data: result};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'No data Found!'};
        }
    } catch {
        return {success: false, message: 'Error Getting result.'};
    }
}

export default CheckImage


