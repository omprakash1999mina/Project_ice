import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const Cart = (props) => {
    let total = 0;
    const [products, setProducts] = useState([]);
    const [login, setLogin] = useState(true);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        try {
            const { id, atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            const config = {
                headers: {
                    'Authorization': `Bearer ${atoken}`,
                    'Content-Type': 'application/json'
                }
            }
            if (Object.keys(cart.items).length === 0) {
                axios.get(API_URL + 'orders/' + id, config)
                    .then(response => {
                        const res = response.data;
                        // console.log(response.data);
                        if (res.length > 0) {
                            props.history.push({
                                pathname: '/orders',
                                state: res
                            })
                        }
                    }).catch(error => {
                        if (error.response) {
                            // console.log(error.response.status);
                            window.alert("Opp's there is some problem, so please login again !!");
                            console.log(error.response.data.message);
                        }
                    });
            }
            if (Object.keys(cart.items).length !== 0) {
                const data = JSON.stringify({ ids: Object.keys(cart.items) })
                // console.log(Object.keys(cart.items));
                axios.post(API_URL + 'products/cart-items', data, config)
                    .then(response => {
                        setProducts(response.data);
                    }).catch(error => {
                        if (error.response) {
                            window.alert("Opp's there is some problem, so please login again !!!");
                            console.log(error.response.data.message);
                        }
                    });
            }
        } catch (error) {
            window.alert("Opp's there is some problem, so please login again !!!!");
            console.log(error);
            setLogin(false);
        }

    }, [cart]);

    const getQty = (productId) => {
        return cart.items[productId];
    }

    const increment = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = { ...cart };
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const decrement = (productId) => {
        const existingQty = cart.items[productId];
        if (existingQty === 1) {
            return;
        }
        const _cart = { ...cart };
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }

    const getSum = (productId, price) => {
        const sum = price * getQty(productId);
        total = total + sum;
        // console.log(total)
        return sum;
    }

    const handleDelete = (productId) => {
        const _cart = { ...cart };
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart);
        const updatedProductsList = products.filter((product) => product._id !== productId);
        setProducts(updatedProductsList);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    


    return (
        !products.length
            ?
            <div className=" pt-14 ">
                <h1 className="font-semibold font-serif animate-wiggle text-center mt-10 text-2xl mb-2">Cart is Empty</h1>
                <img className="mx-auto w-1/3 mt-8" src="/images/empty-cart.png" alt="empty" />

                <div className="container mx-auto lg:w-1/2 w-full">
                    <h1 className="text-bold text-center mt-4 md:text-2xl  text-sm">Please choose some delicious iteams and order now .</h1>
                    <h1 className="text-bold text-center md:text-2xl text-sm"> Get instant Cashback !!</h1>
                </div>
                <div className="text-center m-6 mt-4">
                    <button onClick={() => props.history.push('/')} className="bg-gray-600 text-white px-4 py-2 rounded-lg shawod-lg">Go Back</button>
                </div>
            </div>
            :
            <div className="container relative mx-4 md:mx-auto lg:w-1/2 w-auto pt-20 pb-24">
                <h1 className="my-12 font-bold border-b font-serif">Cart items</h1>
                <ul className="m-2">
                    {
                        products.map(product => {
                            const price = getSum(product._id, product.price)
                            // console.log('map ' + product._id);
                            return (
                                <div key={product._id}>
                                    <li className="sm:hidden flex flex-col justify-center items-center mt-6 w-auto ">
                                        <div className="w-11/12 h-auto p-4 flex flex-col justify-center rounded-lg bg-gray-200">
                                            <div className="flex flex-row justify-center">
                                                <div className="w-1/2 flex flex-row justify-center">
                                                    {/* <img className=" w-28" src="images/pizza.png" alt="" /> */}
                                                    <img className='h-20 object-scale-down object-center' src={product.image} alt="" />

                                                </div>
                                                <div className="w-1/2 flex flex-col justify-center ">
                                                    <span className="ml-2 font-bold text-left ">{product.name}</span>
                                                    {/* <h1 className="text-lg text-left font-medium font-mono ">Vanilla</h1> */}
                                                    <span className="ml-2 text-lg mt-4 ">Price :_<i className="fa fa-rupee">  </i> {price}</span>
                                                    {/* <h1 className="text-lg text-left ">Price <i className="fa fa-rupee"></i> 200</h1> */}
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <div className="w-1/2 flex justify-center">
                                                    <div className="mt-3">
                                                        <button onClick={() => { decrement(product._id) }} className="bg-gray-700 px-2 py-1 rounded-lg text-white leading-none">-</button>
                                                        <b className="px-4">{getQty(product._id)}</b>
                                                        <button onClick={() => { increment(product._id) }} className="bg-gray-700 px-2 py-1 text-white rounded-lg leading-none">+</button>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 flex justify-start">
                                                    <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 mt-2 ml-2 px-4 py-1 rounded-lg  text-white">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="mb-12 hidden sm:block" >
                                        <div className="flex items-center justify-between">
                                            <div className="flex justify-center box-content h-16 w-32 items-center">
                                                <img className='h-16' src={product.image} alt="" />
                                            </div>
                                            <span className="font-bold ml-4 w-48">{product.name}</span>
                                            <div>
                                                <button onClick={() => { decrement(product._id) }} className="bg-gray-700 px-4 py-2 text-white rounded-full leading-none hover:shadow-lg hover:bg-gray-800">-</button>
                                                <b className="px-4">{getQty(product._id)}</b>
                                                <button onClick={() => { increment(product._id) }} className="bg-gray-700 px-4 py-2 text-white rounded-full leading-none hover:shadow-lg hover:bg-gray-800">+</button>
                                            </div>
                                            <span>  <i className="fa fa-rupee text-sm p-1"></i>{price} </span>
                                            <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white hover:shadow-lg hover:bg-red-600">Delete</button>
                                        </div>
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
                <hr className="my-6" />
                <div className="text-right mx-6">
                    <b>Grand Total:</b>  <i className="fa fa-rupee text-sm p-1"></i>{total}
                </div>
                <div className="text-right m-6 mt-4">
                    {login ?
                        <button onClick={() => props.history.push({ pathname: '/placeorders', state: { items: cart.items, totalgrand: total } })} className="bg-green-500 text-white px-4 py-2 rounded-full leading-none outline hover:shadow-lg hover:bg-green-600">Order Now</button>
                        : <button onClick={() => props.history.push('/login')} className="bg-red-400 text-white px-4 py-2 rounded-full leading-none">Login First</button>
                    }
                </div>
            </div >
    )
}

export default Cart;
