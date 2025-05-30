import serverAddress from "./serverAddress.js";

const getPoints = async (accessToken) => {
    try {
        const response = await fetch(serverAddress + '/api/rewards/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const result = await response.json();
            return {success: true, data: result};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'No data Found!'};
        }
    } catch {
        return {success: false, message: 'Error Getting user info'};
    }

};

export default getPoints;