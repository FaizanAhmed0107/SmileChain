import serverAddress from "./serverAddress.js";

const deleteReward = async (accessToken, points) => {
    const data = {points};

    try {
        const response = await fetch(serverAddress + '/api/rewards/del', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            return {success: true, data: result};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'Update failed!'};
        }
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return {success: false, message: 'Error deleting reward.'};
    }
};

export default deleteReward;

