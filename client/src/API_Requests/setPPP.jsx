import serverAddress from "./serverAddress.js";

const setPointsPerPic = async (accessToken, pointsToAdd) => {
    try {
        const data = {"pointsToAdd": pointsToAdd}

        const response = await fetch(serverAddress + '/api/rewards/admin/points', {
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
            return {success: false, message: errorResult.message || 'No data Found!'};
        }
    } catch {
        return {success: false, message: 'Error Setting Points per Pic'};
    }

};

export default setPointsPerPic