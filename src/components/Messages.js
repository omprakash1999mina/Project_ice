
import { useState, useEffect } from 'react';
import React from 'react';
import Message from './Message';
import axios from "axios";
const  API_URL = process.env.REACT_APP_API_URL;

const Messages = () => {
const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
const [messages, setMessages] = useState([]);
const config = {
    headers: {
        'Authorization': `Bearer ${atoken}`,
        
    }
}
// console.log(config);

useEffect(() => {

        axios.get(API_URL+'/messages',config)
        .then(response => {
            // console.log(response.data);
            setMessages(response.data);
            
        })
        
        .catch(error =>{
            if(error.response){
                // console.log(error.response.status);
                // console.log(error.response.headers);
                console.log(error.response.data.message);
                
            }
        });
}, []);

    // console.log(messages)
 
    return (
        <div className="bg-gray-100 ">
            {
                messages.map(message => <Message key={message._id} message={message}/>)
            }
        </div>
    )
}

export default Messages;

