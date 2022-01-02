import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../CartContext';
const  API_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
    let total = 0;
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);

    const [priceFetched, togglePriceFetched] = useState(false);

    useEffect(() => {
        if (!cart.items) {
            return;
        }

        if (priceFetched) {
            return;
        }

        fetch(API_URL+'products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ ids: Object.keys(cart.items)})
        }).then(res => res.json())
        .then(products => {
            setProducts(products);
            togglePriceFetched(true);
        })
    }, [cart, priceFetched]);

    const getQty = (productId) => {
        return cart.items[productId];
    }

    const increment = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = {...cart};
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const decrement = (productId) => {
        const existingQty = cart.items[productId];
       if (existingQty === 1) {
            return;
       }
        const _cart = {...cart};
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }

    const getSum = (productId, price) => {
        const sum = price * getQty(productId);
        total = total + sum ;
        // console.log(total)
        return sum;
    }

    const handleDelete = (productId) => {
        const _cart = {...cart};
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        setCart(_cart);
        const updatedProductsList = products.filter((product) => product._id !== productId);
        setProducts(updatedProductsList);
    }

    const handleOrderNow = () => {
        window.alert('Order placed succesfully!');
        setProducts([]);
        setCart({});
    }

    return (
        !products.length
        ? 
        <div className=" ">
                <h1 className="font-semibold font-serif animate-wiggle text-center mt-10 text-2xl mb-2">Cart is Empty</h1>
            <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="" />
            
            <div className="container mx-auto lg:w-1/2 w-full">
                <h1 className="text-bold text-center mt-4 md:text-2xl  text-sm">Please choose some delicious iteams and order now .</h1>
                <h1 className="text-bold text-center md:text-2xl text-sm"> Get instant Cashback !!</h1>
            </div>
            <div className="text-center m-6 mt-4">
                <button onClick={()=> console.log('back')} className="bg-gray-600 text-white px-4 py-2 rounded-lg shawod-lg">Go Back</button>
            </div>
        </div> 
        :
        <div className="container relative mx-4 md:mx-auto lg:w-1/2 w-auto  pb-24">
            <h1 className="my-12 font-bold border-b font-serif">Cart items</h1>
            <ul className="m-2">
                {
                    products.map(product => {
                        const price = getSum(product._id, product.price)
                        return (
                            <>
                              <li key={product._id} className="sm:hidden flex flex-col justify-center items-center mt-6 w-auto ">
                                    <div className="w-11/12 h-auto p-4 flex flex-col justify-center rounded-lg bg-gray-200">
                                    <div className="flex flex-row justify-center">
                                        <div className="w-1/2 flex flex-row justify-center">
                                            {/* <img className=" w-28" src="images/pizza.png" alt="" /> */}
                                            {/* <div className="box-content w-full items-center"> */}
                                                <img className='h-20 object-scale-down object-center' src={product.image} alt="" />
                                            {/* </div> */}
                                            
                                        </div>
                                            <div className="w-1/2 flex flex-col justify-center ">
                                                <span className="ml-2 font-bold text-left ">{ product.name }</span>
                                                {/* <h1 className="text-lg text-left font-medium font-mono ">Vanilla</h1> */}
                                                <span className="ml-2 text-lg mt-4 ">Price :_<i className="fa fa-rupee">  </i> { price }</span>
                                                {/* <h1 className="text-lg text-left ">Price <i className="fa fa-rupee"></i> 200</h1> */}
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <div className="w-1/2 flex justify-center">
                                                <div className="mt-3">
                                                    <button onClick={() => { decrement(product._id) }} className="bg-gray-700 px-2 py-1 rounded-lg text-white leading-none">-</button>
                                                    <b className="px-4">{ getQty(product._id) }</b>
                                                    <button onClick={() => { increment(product._id) }} className="bg-gray-700 px-2 py-1 text-white rounded-lg leading-none">+</button>
                                                </div>
                                            </div>
                                            <div className="w-1/2 flex justify-start">
                                                <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 mt-2 ml-2 px-4 py-1 rounded-lg  text-white">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="mb-12 hidden sm:block" key={product._id}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex justify-center box-content h-16 w-32 items-center">
                                            <img className='h-16' src={product.image} alt="" />
                                        </div>
                                            <span className="font-bold ml-4 w-48">{ product.name }</span>
                                        <div>
                                        <button onClick={() => { decrement(product._id) }} className="bg-gray-700 px-4 py-2 text-white rounded-full leading-none">-</button>
                                        <b className="px-4">{ getQty(product._id) }</b>
                                        <button onClick={() => { increment(product._id) }} className="bg-gray-700 px-4 py-2 text-white rounded-full leading-none">+</button>
                                        </div>
                                        <span>  <i className="fa fa-rupee"></i>  { price } </span>
                                        <button onClick={() => { handleDelete(product._id) }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                                    </div>
                                </li>
                        </>
                        )
                    })
                }
            </ul>
            <hr className="my-6"/>
            <div className="text-right mx-6">
                <b>Grand Total:</b>  <i className="fa fa-rupee"></i>  { total }
            </div>
            <div className="text-right m-6 mt-4">
                <button onClick={handleOrderNow} className="bg-green-500 text-white px-4 py-2 rounded-full leading-none">Order Now</button>
            </div>
        </div>
    )
}

export default Cart;
