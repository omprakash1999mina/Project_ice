import React from 'react';
import { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios';
const  API_URL = process.env.REACT_APP_API_URL;

const Products = () => {

const [products, setProducts] = useState([]);
useEffect(() => {
    axios.get(`${API_URL}products`,).then(response => {
        // console.log(response.data)
        setProducts(response.data)
    }).catch(error =>{
        console.log(error)
    })

}, []);
    // console.log(products)

    return (
        <div className="text-gray-600 body-font">

            <div className="container px-5 mx-auto pb-24">
                <h1 className="text-lg font-bold mb-8">Products</h1>
                {/* <div className="grid grid-cols-5 my-8 px-4 gap-24"> */}
                <div className="flex flex-wrap justify-between  -m-4">
                    {
                    products.map(product => <Product key={product._id} product={product}/>)
                    }
                </div>
            </div>
        </div>

    )
}


export default Products;

