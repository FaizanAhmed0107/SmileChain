import serverAddress from "./serverAddress.js";

const redeemReward = async (accessToken, points) => {
    const data = {points};

    try {
        const response = await fetch(serverAddress + '/api/rewards/redeem', {
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
            return {success: false, message: errorResult.message || 'No reward Found!'};
        }
    } catch {
        return {success: false, message: 'Error Getting redeeming reward'};
    }
};

export default redeemReward;