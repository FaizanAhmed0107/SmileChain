import serverAddress from "./serverAddress.js";

const setDelayValue = async (accessToken, postDelay) => {
    try {
        const data = {"postDelay": postDelay}

        const response = await fetch(serverAddress + '/api/rewards/admin/delay', {
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
        return {success: false, message: 'Error Setting delay'};
    }

};

export default setDelayValue;