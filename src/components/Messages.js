
import { useState, useEffect } from 'react';
import React from 'react';
import Message from './Message';
import axios from "axios";

let API_URL = "https://apis.opdevelopers.live/api/";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4YTdmODRjMThiMjE0YTRlMjBiN2MiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MjYyNDMxNjEsImV4cCI6MTY1NzgwMDc2MX0.dfkr1CTsIAh-X1yWN-puO5nXyYUJuzvWR3137Lr1p-s';


const Messages = () => {

const [messages, setMessages] = useState([]);
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        
    }
}
// console.log(config);

useEffect(() => {

    
        axios.get(API_URL+'/messages',config)
        .then(response => {
            // console.log(response.data);

            // const data = response.data;
            setMessages(response.data);
            
        })
        
        .catch(error =>{
            if(error.response){
                // console.log(error.response.status);
                let error_message = error.response.data.message;
                
                console.log(error_message);
                // console.log(error.response.headers);
                
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

// const Products = () => {

// const [products, setProducts] = useState([]);
// useEffect(() => {
//    fetch('http://localhost:5000/api/products')
//    .then(response => response.json())
//    .then(products => {
//     setProducts(products);
//    });
// }, []);
//     console.log(products)

//     return (
//         <div className="container mx-auto pb-24">
//             <h1 className="text-lg font-bold my-8">Products</h1>
//             <div className="grid grid-cols-5 my-8 px-4 gap-24">
//                 {
//                    products.map(product => <Product key={product._id} product={product}/>)
//                 }
//             </div>
//         </div>
//     )
// }


// export default Products;

