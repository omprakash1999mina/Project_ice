import { Component} from 'react';
import { CartContext } from '../CartContext';
const API_URL = process.env.REACT_APP_API_URL;

let total = 0;
export class Cart extends Component {
    // const Cart = (props) => {
    static contextType = CartContext;
    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        // const { cart, setCart } = CartContext;
        this.state = { products: [], modal: false, payment: false, confirm: false, priceFetched: false, }
        const { cart } = this.context;
        console.log(cart);
    }

    // const [products, setProducts] = useState([]);
    // const [modal, setModal] = useState(false);
    // const [payment, setPayment] = useState(false);
    // const [confirm, setConfirm] = useState(false);
    // const [priceFetched, togglePriceFetched] = useState(false);

    // useEffect(() => {
    componentDidMount() {
        console.log('mounted');
        // const value = this.context;
        // console.log(this.context);
        // console.log(cart.items);
        let cart;
        if (!cart.items) {
            console.log('returned not iteams');
            return;
        }

        if (this.state.priceFetched) {
            console.log('price is there');
            return;
        }

        fetch(API_URL + 'products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        }).then(res => res.json())
            .then(products => {
                console.log(products);
                // setProducts(products);
                // togglePriceFetched(true);
                this.setState({products: products, priceFetched: true})
            })
        // }, [cart, priceFetched]);
    }

    getQty = (productId) => {
        const {cart } = this.context;
        return cart.items[productId];
    }

    increment = (productId) => {
        const {cart , setCart} = this.context;
        const existingQty = cart.items[productId];
        const _cart = { ...cart };
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        // this.setState({cart: _cart});
        setCart(_cart);
    }

    decrement = (productId) => {
        const {cart , setCart} = this.context;
        const existingQty = cart.items[productId];
        if (existingQty === 1) {
            return;
        }
        const _cart = { ...cart };
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
        // this.setState({cart: _cart});
    }

    getSum = (productId, price) => {
        const sum = price * this.getQty(productId);
        total = total + sum;
        // console.log(total)
        return sum;
    }

    handleDelete = (productId) => {
        const {cart , setCart} = this.context;
        const _cart = { ...cart };
        const qty = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= qty;
        const updatedProductsList = this.state.products.filter((product) => product._id !== productId);
        setCart(_cart);
        this.setState({products: updatedProductsList});
    }

    handleOrderNow = () => {
        // window.alert('Order placed succesfully!');
        // setProducts([]);
        // setCart({});
        // setModal(false)
        // setModal(false)
        this.setState({modal: false})
    }
    render() {
        const { products, payment, confirm, modal, }= this.state;
        return (!products.length ?
            <div className=" pt-14 " >
                <h1 className="font-semibold font-serif animate-wiggle text-center mt-10 text-2xl mb-2">Cart is Empty</h1>
                <img className="mx-auto w-1/3 mt-8" src="/images/empty-cart.png" alt="empty" />

                <div className="container mx-auto lg:w-1/2 w-full">
                    <h1 className="text-bold text-center mt-4 md:text-2xl  text-sm">Please choose some delicious iteams and order now .</h1>
                    <h1 className="text-bold text-center md:text-2xl text-sm"> Get instant Cashback !!</h1>
                </div>
                <div className="text-center m-6 mt-4">
                    <button onClick={() => this.props.history.push('/')} className="bg-gray-600 text-white px-4 py-2 rounded-lg shawod-lg">Go Back</button>
                </div>
            </div>
            :
            <div className="container relative mx-4 md:mx-auto lg:w-1/2 w-auto pt-20 pb-24">
                <h1 className="my-12 font-bold border-b font-serif">Cart items</h1>
                <ul className="m-2">
                    {
                        products.map(product => {
                            const price = this.getSum(product._id, product.price)
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
                                                    <span className="ml-2 font-bold text-left ">{product.name}</span>
                                                    {/* <h1 className="text-lg text-left font-medium font-mono ">Vanilla</h1> */}
                                                    <span className="ml-2 text-lg mt-4 ">Price :_<i className="fa fa-rupee">  </i> {price}</span>
                                                    {/* <h1 className="text-lg text-left ">Price <i className="fa fa-rupee"></i> 200</h1> */}
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between">
                                                <div className="w-1/2 flex justify-center">
                                                    <div className="mt-3">
                                                        <button onClick={() => { this.decrement(product._id) }} className="bg-gray-700 px-2 py-1 rounded-lg text-white leading-none">-</button>
                                                        <b className="px-4">{this.getQty(product._id)}</b>
                                                        <button onClick={() => { this.increment(product._id) }} className="bg-gray-700 px-2 py-1 text-white rounded-lg leading-none">+</button>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 flex justify-start">
                                                    <button onClick={() => { this.handleDelete(product._id) }} className="bg-red-500 mt-2 ml-2 px-4 py-1 rounded-lg  text-white">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="mb-12 hidden sm:block" key={product._id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex justify-center box-content h-16 w-32 items-center">
                                                <img className='h-16' src={product.image} alt="" />
                                            </div>
                                            <span className="font-bold ml-4 w-48">{product.name}</span>
                                            <div>
                                                <button onClick={() => { this.decrement(product._id) }} className="bg-gray-700 px-4 py-2 text-white rounded-full leading-none">-</button>
                                                <b className="px-4">{this.getQty(product._id)}</b>
                                                <button onClick={() => { this.increment(product._id) }} className="bg-gray-700 px-4 py-2 text-white rounded-full leading-none">+</button>
                                            </div>
                                            <span>  <i className="fa fa-rupee"></i>  {price} </span>
                                            <button onClick={() => { this.handleDelete(product._id) }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                                        </div>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
                <hr className="my-6" />
                <div className="text-right mx-6">
                    <b>Grand Total:</b>  <i className="fa fa-rupee"></i>  {total}
                </div>
                <div className="text-right m-6 mt-4">
                    <button onClick={() => this.setState({modal:true})} className="bg-green-500 text-white px-4 py-2 rounded-full leading-none">Order Now</button>
                </div>

                {modal &&
                    <div className="bg-gray-200 bg-opacity-50 h-screen animated fixed left-0 top-0 flex justify-center items-center inset-0 z-50  bg-no-repeat bg-center bg-cover ">
                        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">
                            {payment ? <p className="font-bold mt-3 text-center text-gray-700 ">Payment Mode</p>
                                : <p className="font-bold mt-3 text-center text-gray-700 ">Shipping Information</p>}
                            {
                                payment &&
                                <div className="text-center p-5 flex-auto justify-center">
                                    <svg width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-gray-500 mx-auto" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
                                    </svg>
                                    <section class="text-gray-600 body-font overflow-hidden">
                                        <div class="p-4 w-full">
                                            <div class="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                                                <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">COD</span>
                                                {/* <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute left-0 top-0 rounded-bl">POPULAR</span> */}
                                                <div className='flex flex-wrap py-4 justify-between'>
                                                    <h2>Subtotal</h2>
                                                    <h2>$320</h2>
                                                </div>
                                                <div className='flex flex-wrap py-4 justify-between'>
                                                    <h2>Taxes</h2>
                                                    <h2>$5</h2>
                                                </div>
                                                <div className='flex flex-wrap border-b-2 py-4 justify-between'>
                                                    <h2>Shipping Charges</h2>
                                                    <h2>$15</h2>
                                                </div>
                                                <div className='flex flex-wrap border-b-2 font-bold py-4 justify-between'>
                                                    <h2>Total grand</h2>
                                                    <h2>$15</h2>
                                                </div>
                                                {<button onClick={this.handleOrderNow} className="mb-2 m-4 md:mb-0 p-2 text-sm shadow-sm font-medium border text-white rounded-full hover:shadow-lg bg-gray-600 hover:bg-gray-800">Confirm</button>}
                                                <p class="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them ice-cream's.</p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            }
                            {!payment &&
                                <div className="w-full mx-2 flex-1 ">
                                    <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">full name</p>
                                    <input className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" name="name" placeholder="name" />

                                    <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">address</p>
                                    <textarea className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" name="address" placeholder="address" />
                                    <div className='flex flwx-wrap justify-between'>
                                        <div className='mx-1'>
                                            <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">city</p>
                                            <input className=" py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" name="city" placeholder="name" />
                                        </div>
                                        <div className='mx-1'>
                                            <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">State</p>
                                            <input className=" py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" name="state" placeholder="name" />
                                        </div>
                                    </div>
                                    <div className='flex flwx-wrap justify-between'>
                                        <div className='mx-1'>
                                            <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">postal Code</p>
                                            <input className=" py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="number" name="postal code" placeholder="name" />
                                        </div>
                                        <div className='mx-1'>
                                            <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">phone</p>
                                            <input className=" py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" name="phone" placeholder="name" />
                                        </div>
                                    </div>

                                    <div className="p-3 justify-end mt-2 text-center space-x-4 md:block">
                                        {<button onClick={() => this.setState({modal:false})} className="mb-2 m-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>}
                                        {<button onClick={() => this.setState({payment:true})} className="mb-2 m-4 md:mb-0 bg-green-400 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Proceed</button>}
                                        {/* { updated && <button onClick={this.cancleHandler} className="mb-2  bg-green-400 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Go Back to Profile</button>} */}
                                    </div>
                                </div>
                            }
                            {confirm &&
                                <div>
                                    <svg width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-gray-500 mx-auto" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
                                    </svg>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default Cart;
