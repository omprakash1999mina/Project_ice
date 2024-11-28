import { React, useState, useEffect } from 'react';
import Message from './Message';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Messages = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
        const config = {
            headers: {
                'Authorization': `Bearer ${atoken}`,
            }
        }
        axios.get(API_URL + 'messages', config)
            .then(response => {
                setMessages(response.data);
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data.message);
                }
                console.log(error);
            });
    }, []);

    return (
        <div className="bg-gray-100 ">
            {
                messages.map(message => <Message key={message._id} message={message} />)
            }
        </div>
    )
}

export default Messages;

