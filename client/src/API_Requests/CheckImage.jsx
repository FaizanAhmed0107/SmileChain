import serverAddress from "./serverAddress.js";

const CheckImage = async (img, stars, accessToken) => {
    try {
        const date = new Date();
        const today = (date.getHours() % 12 === 0) ? 12 : date.getHours() % 12;
        const apm = (date.getHours() >= 12) ? 'PM' : 'AM';
        const time = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ', ' + today + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + apm;
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


