
import Product from './Product';
import { useState, useEffect } from 'react';
import React from 'react';

const Products = () => {

const [products, setProducts] = useState([]);
useEffect(() => {
   fetch('https://apis.opdevelopers.live/api/products')
   .then(response => response.json())
   .then(products => {
    setProducts(products);
   });
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

