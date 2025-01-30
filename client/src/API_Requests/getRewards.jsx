import serverAddress from "./serverAddress.js";

const getRewards = async () => {
    try {
        const response = await fetch(serverAddress + '/api/rewards/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const result = await response.json();
            return {success: true, data: result};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'No reward Found!'};
        }
    } catch {
        return {success: false, message: 'Error Getting reward info'};
    }
};

export default getRewards;