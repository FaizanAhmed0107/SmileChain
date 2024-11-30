import serverAddress from "./serverAddress.js";

const HandleLogin = async (email, password) => {
    const data = {email, password};

    try {
        const response = await fetch(serverAddress+'/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            return {success: true, accessToken: result.accessToken};
        } else {
            const errorResult = await response.json();
            return {success: false, message: errorResult.message || 'Login failed!'};
        }
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return {success: false, message: 'Error sending login request.'};
    }
};

export default HandleLogin;
