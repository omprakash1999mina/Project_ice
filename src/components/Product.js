import { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import {  useLocation } from 'react-router-dom';

const Product = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const location = useLocation();
    const { product } = props;
    let adminpanel = false;
    const role = window.localStorage.getItem('Role');

    if(location.pathname === '/admin/products' && role === 'admin' ){
        adminpanel = true;
    }

    const addToCart = (event, product) => {
        event.preventDefault();

        // let _cart = {...cart}; // { items: {}}
        const _cart = {...cart} ; // { items: {}}
        if (!_cart.items) {
            _cart.items = {}
        }
        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1;
        } else {
            _cart.items[product._id] = 1;
        }

        if(!_cart.totalItems) {
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart);
        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
        // const cart = {
        //     items: {
        //         '608c2960e165f6137f02b552': 2,
        //         '608c28e8e165f6137f02b550': 3
        //     },
        //     totalItems: 5
        // }

    }

    return (

            <div className=" flex flex-col justify-between lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl bg-gray-100 m-2 mt-8 rounded-2xl">
                {/* <Link to={`/products/${product._id}`}> */}
                        <div className="block relative h-48 rounded overflow-hidden"  >
                            <img className="object-contain object-center w-full h-full block" src={product.image} alt="ice-cream" />
                        </div>
                {/* </Link> */}
                
                    <div className="text-center">
                        <h2 className="text-lg font-bold py-2">{product.name}</h2>
                    </div>
                    
                    { adminpanel === false ?  
                        <div>
                            <div className="text-center">
                                <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{ product.size }</span>
                            </div> 
                            <div className="flex justify-between items-center mt-4">
                                <span className="pl-4"> <i className="fa fa-rupee"></i>  { product.price }</span>
                                <button disabled={isAdding} onClick={(e) => { addToCart(e, product) }} className={`${ isAdding ? 'bg-green-500': 'bg-gray-600' } py-1 px-4 rounded-lg text-white font-bold`}>ADD{isAdding ? 'ED': ''}</button> 
                                {/* <button disabled={isAdding} onClick={Notification} className={`${ isAdding ? 'bg-green-500': 'bg-yellow-500' } py-1 px-4 rounded-full font-bold`}>ADD{isAdding ? 'ED': ''}</button>  */}
                            </div>
                        </div>
                        :
                        <div>
                            <div className="text-center">
                                <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{ product.size }</span>
                            </div>
                            <span className="py-2 border-b-2 block"> <i className="fa fa-rupee"></i>  { product.price }</span>
                            <div className="flex justify-between items-center mt-2">
                                <button className='text-sm font-semibold text-white bg-gray-600 py-1 px-4 border-2 focus:outline-none hover:bg-gray-800 rounded-lg'>Edit</button>
                                <button className='text-sm font-semibold text-white py-1 px-4 bg-red-400 border-0 focus:outline-none hover:bg-red-600 rounded-lg '>Delete</button>     
                            </div> 
                        </div>
                    }
        </div>

    )
}

export default Product;


