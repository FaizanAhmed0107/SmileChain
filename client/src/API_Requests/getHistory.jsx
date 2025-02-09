import serverAddress from "./serverAddress.js";

const getHistory = async (accessToken) => {
    try {
        const response = await fetch(serverAddress + '/api/history', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const result = await response.json();
            return {success: true, data: result.data};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'No data Found!'};
        }
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return {success: false, message: 'Error Getting reward History.'};
    }

};

export default getHistory;