
import { initializeApp } from 'firebase/app';
import { uploadBytesResumable, ref } from "firebase/storage";
import { getStorage } from "firebase/storage";
// import {storage} from 'firebase'
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;

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
                // console.log("token fetched successfully")
                access_token = data.access_token;
            })
            .catch(error => {
                console.log(error);
                window.localStorage.clear();
            })

        return access_token;
    },
    uploadImage(path, image) {

        const firebaseConfig = {
            apiKey: `${FIREBASE_API_KEY}`,
            authDomain: `${FIREBASE_AUTH_DOMAIN}`,
            projectId: `${FIREBASE_PROJECT_ID}`,
            storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
            messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
            appId: `${FIREBASE_APP_ID}`,
            measurementId: `${FIREBASE_MEASUREMENT_ID}`
        };
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);

        const imageName = `${new Date().getTime()}${image.name}`;
        const storageRef = ref(storage, `${path}/${new Date().getTime()}${imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        
        return uploadTask;
    }
}

export default utils;