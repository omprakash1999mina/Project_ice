import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const utils = {
    async getNewAccessToken(refresh_token) {
        let access_token = false;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = {
            refresh_token: refresh_token
        }
        await axios.post(API_URL + 'refresh', data, config)
            .then(response => {
                const data = response.data;
                access_token = data.access_token;
            })
            .catch(error => {
                // console.log(error);
                window.localStorage.clear();
            })
        return access_token;
    },
}

export default utils;