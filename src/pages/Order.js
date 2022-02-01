import React, { Component } from 'react';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString([], options);
}
const getTotal = (products, order) => {
    let total = 0;
    products.forEach(product => {
        total = total + Number(order.items[product._id] * product.price);
    });
    return total;
}
export class Order extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        this.state = { time: '12:30 PM', date: '12 Jen 2022', open: false, status: 'placed', order: {}, products: {}, processing: false }
    }
    componentDidMount() {
        try {
            const { order, items } = this.props.location.state;
            this.setState({ subtotal: getTotal(items, order), open: true, time: formatTime(order.createdAt), date: formatDate(order.createdAt), status: order.status, order: order, products: items });
        } catch (error) {
            this.props.history.push('/notauthorized')
            console.log(error);
        }
    }
    handleBack = () => {
        try {
            this.setState({ processing: true })
            const { id, atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            const config = {
                headers: {
                    'Authorization': `Bearer ${atoken}`,
                    'Content-Type': 'application/json'
                }
            }
            axios.get(API_URL + 'orders/' + id, config)
                .then(response => {
                    const res = response.data;
                    if (res.length > 0) {
                        this.props.history.push({
                            pathname: '/orders',
                            state: res
                        })
                    }
                }).catch(error => {
                    if (error.response) {
                        window.alert("Opp's there is some problem, so please login again !!");
                        console.log(error.response.data.message);
                    }
                });
        } catch (error) {
            window.alert("Opp's there is some problem, so please login again !!!!");
            console.log(error);
            this.props.history.push('/notauthorized')
        }

    }

    render() {
        const { processing, subtotal, open, status, date, time, order, products } = this.state;
        return (
            <section className='px-2 pt-24'>
                <p className='font-serif border-b-2 font-medium py-2 md:p-4 px-2'>Order Summary</p>
                {(open && (window.screen.width > 640)) &&
                    <div className="bg-white ">
                        <div className='flex flex-col xl:flex-row justify-between'>
                            <ul className='invisible sm:visible bg-gray-100 mt-4 xl:mx-4 px-4 shadow-lg rounded-lg pl-16 xl:w-1/2 md:w-2/3 sm:w-full mx-auto '>
                                <p className='py-4 mr-16 py-2 font-serif text-center font-bold'>Track Delivery Status</p>
                                <li className='flex items-center justify-between py-6'>
                                    <div className='flex items-center'>
                                        <svg fill="currentColor" className={`${status === 'placed' && 'text-green-400'} w-12  flex items-center`} viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                                        </svg>
                                        <div className='mx-6 flex flex-col items-center relative'>
                                            <div className='flex items-center'>
                                                <svg fill="currentColor" className={`${status === 'placed' && 'text-green-400'} flex items-center -m-4 w-12`} viewBox="0 0 16 16">
                                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                </svg>
                                                <p className={`${status === 'placed' && 'text-green-400'} font-serif font-bold p-4 `}>Order Placed</p>
                                            </div>
                                            <span className={`${status === 'confirmed' ? 'border-green-400 bg-green-400' : 'border-gray-400 bg-gray-200'} left-1.5 top-10 border-2 absolute border-opacity-20 h-20  `} ></span>
                                        </div>
                                    </div>
                                    {status === 'placed' &&
                                        <div className='text-left pr-20'>
                                            <p className='font-mono font-bold '>{time} </p>
                                            <p className='font-mono font-bold '>{date}</p>
                                        </div>
                                    }
                                </li>
                                <li className='flex items-center justify-between py-6'>
                                    <div className='flex items-center'>
                                        <svg fill="currentColor" className={`${status === 'confirmed' && 'text-green-400'} w-12  flex items-center`} viewBox="0 0 16 16">
                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                                        </svg>
                                        <div className='mx-6 flex flex-col items-center relative'>
                                            <div className='flex items-center'>
                                                <svg fill="currentColor" className={`${status === 'confirmed' && 'text-green-400'} flex items-center -m-4 w-12`} viewBox="0 0 16 16">
                                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                </svg>
                                                <p className={`${status === 'confirmed' && 'text-green-400'} font-serif font-bold p-4 `}>Order Confirmation</p>
                                            </div>
                                            <span className={`${status === 'prepared' ? 'border-green-400 bg-green-400' : 'border-gray-400 bg-gray-200'} left-1.5 top-10 border-2 absolute border-opacity-20 h-20  `} ></span>
                                        </div>
                                    </div>
                                    {status === 'confirmed' &&
                                        <div className='text-left'>
                                            <p className='font-mono font-bold '>{time} </p>
                                            <p className='font-mono font-bold '>{date}</p>
                                        </div>
                                    }
                                </li>
                                <li className='flex items-center justify-between py-6'>
                                    <div className='flex items-center'>
                                        <svg fill="currentColor" className={`${status === 'prepared' && 'text-green-400'} w-12  flex items-center`} viewBox="0 0 16 16">
                                            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
                                        </svg>
                                        <div className='mx-6 flex flex-col items-center relative'>
                                            <div className='flex items-center'>
                                                <svg fill="currentColor" className={`${status === 'prepared' && 'text-green-400'} flex items-center -m-4 w-12`} viewBox="0 0 16 16">
                                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                </svg>
                                                <p className={`${status === 'prepared' && 'text-green-400'} font-serif font-bold p-4 `}>Prepared</p>
                                            </div>
                                            <span className={`${status === 'out-for-delivery' ? 'border-green-400 bg-green-400' : 'border-gray-400 bg-gray-200'} left-1.5 top-10 border-2 absolute border-opacity-20 h-20  `} ></span>
                                        </div>
                                    </div>
                                    {status === 'prepared' &&
                                        <div className='text-left'>
                                            <p className='font-mono font-bold '>{time} </p>
                                            <p className='font-mono font-bold '>{date}</p>
                                        </div>
                                    }
                                </li>
                                <li className='flex items-center justify-between py-6'>
                                    <div className='flex items-center'>
                                        <svg fill="currentColor" className={`${status === 'out-for-delivery' && 'text-green-400'} w-12  flex items-center`} viewBox="0 0 16 16">
                                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>
                                        <div className='mx-6 flex flex-col items-center relative'>
                                            <div className='flex items-center'>
                                                <svg fill="currentColor" className={`${status === 'out-for-delivery' && 'text-green-400'} flex items-center -m-4 w-12`} viewBox="0 0 16 16">
                                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                </svg>
                                                <p className={`${status === 'out-for-delivery' && 'text-green-400'} font-serif font-bold p-4 `}>Out For Delivery</p>
                                            </div>
                                            <span className={`${status === 'delivered' ? 'border-green-400 bg-green-400' : 'border-gray-400 bg-gray-200'} left-1.5 top-10 border-2 absolute border-opacity-20 h-20  `} ></span>
                                        </div>
                                    </div>
                                    {status === 'out-for-delivery' &&
                                        <div className='text-left'>
                                            <p className='font-mono font-bold '>{time} </p>
                                            <p className='font-mono font-bold '>{date}</p>
                                        </div>
                                    }
                                </li>
                                <li className='flex items-center justify-between py-6'>
                                    <div className='flex items-center'>
                                        <svg fill="currentColor" className={`${status === 'delivered' && 'text-green-400'} w-12  flex items-center`} viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                                        </svg>
                                        <div className='mx-6 flex items-center'>
                                            <svg fill="currentColor" className={`${status === 'delivered' && 'text-green-400'} flex items-center -m-4 w-12`} viewBox="0 0 16 16">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                            </svg>
                                            <p className={`${status === 'delivered' && 'text-green-400'} font-serif font-bold p-4 `}>Delivered</p>
                                        </div>
                                    </div>
                                    {status === 'delivered' &&
                                        <div className='text-left'>
                                            <p className='font-mono font-bold '>{time} </p>
                                            <p className='font-mono font-bold '>{date}</p>
                                        </div>
                                    }
                                </li>
                            </ul>

                            <ul className='pt-4 xl:w-1/2 mx-auto '>
                                <div className="bg-gray-100 border-b-2 rounded-lg shadow-lg ">
                                    <p className='text-sm font-serif border-b-2 rounded-lg p-2'>Items Details</p>
                                    <div className='text-left pt-4 px-4 '>
                                        {products.map((product) =>
                                            <li key={product._id} className='flex flex-row bg-gray-200 justify-between items-center m-2 p-4 rounded-md shadow-md' >
                                                <div className="flex justify-center box-content h-16 w-32 items-center">
                                                    {/* <img className='h-16' src={'images/piza.png'} alt="products" /> */}
                                                    <img className='h-16' src={product.image} alt="products" />
                                                </div>
                                                <div className='flex items-center w-full'>
                                                    <p className='font-sans font-medium px-4 w-1/3'>{product.name}</p>
                                                    <p className='font-sans font-medium px-2 text-right w-1/3'>Quantity : {order.items[product._id]}</p>
                                                    <p className='font-sans font-medium px-2 text-left w-1/3'>Price : <i className="fa fa-rupee text-sm p-1"></i>{(product.price * order.items[product._id])}</p>
                                                </div>
                                            </li>
                                        )}
                                        <div className='inline-flex m-2 font-sans'>
                                            <h1 className='font-bold text-sm text-center'><i className="fa fa-rupee text-sm p-1"></i>{order.totalgrand}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-100 rounded-lg border-b-2 mt-4 shadow-lg">
                                    <p className='text-sm font-serif border-b-2 rounded-lg p-2'>Shipping Details</p>
                                    <div className='text-left p-2 px-4'>
                                        <p className=' font-bold'>{order.name}</p>
                                        <p className=' body-font'>{order.address}</p>

                                        <div className='inline-flex py-2 font-sans'>
                                            <h1 className='font-bold text-sm'>Phone number :</h1>
                                            <h1 className='text-sm px-2'>{order.phone}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-100 relative border-b-2 rounded-lg mt-4 shadow-lg">
                                    <p className='text-sm font-serif border-b-2 rounded-lg p-2'>Price Details</p>
                                    <div className='text-left p-2 px-4'>
                                        <li className='flex flex-wrap py-2 font-sans justify-between'>
                                            <h1 className='text-sm'>Subtotal</h1>
                                            <h1 className='text-sm px-2'><i className="fa fa-rupee text-sm p-1"></i>{subtotal}</h1>
                                        </li>
                                        <li className='flex flex-wrap py-2 font-sans justify-between'>
                                            <h1 className='text-sm'>Taxes(%18)</h1>
                                            <h1 className='text-sm px-2'><i className="fa fa-rupee text-sm p-1"></i>{(subtotal * 0.18).toFixed(2)}</h1>
                                        </li>
                                        <li className='flex flex-wrap py-2 font-sans justify-between'>
                                            <h1 className='text-sm'>Shippiing fee </h1>
                                            <h1 className='text-sm px-2'><i className="fa fa-rupee text-sm p-1"></i>25</h1>
                                        </li>
                                        <li className='flex flex-wrap py-2 font-sans justify-between'>
                                            <h1 className='font-bold text-sm'>Total Grand</h1>
                                            <h1 className='text-sm px-2 font-bold'><i className="fa fa-rupee text-sm p-1"></i>{order.totalgrand}</h1>
                                        </li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className='flex flex-row justify-center items-center p-4 pb-10'>
                            {processing ?
                                <button className="inline-flex items-center justify-center bg-gray-800 px-4 py-2 text-white shadow-lg rounded-lg cursor-not-allowed" disabled>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                                :
                                <button onClick={this.handleBack} className='bg-gray-600 hover:bg-gray-800 px-4 py-2 text-white shadow-md hover:shadow-lg rounded-lg'>Go Back</button>
                            }
                        </div>
                    </div>
                }

                {(open && (window.screen.width <= 640)) &&
                    <div id='mobileMenu' className='relative'>
                        <div className="bg-gray-100 border-b-2 rounded-lg shadow-lg mt-4">
                            <p className='text-sm font-serif border-b-2 rounded-lg p-2'>Items Details</p>
                            <div className='text-left pt-4 px-4 '>
                                {/* <span className="bg-indigo-500 text-white px-3 py-1 mb-2 tracking-widest text-xs absolute left-0 top-0 rounded-bl">OrderID : OD{order._id}</span> */}
                                {products.map((product) =>
                                    <li key={product._id} className='flex flex-row pt-2 bg-gray-200 py-4 px-2 m-2 shadow-md border-b-2 rounded-lg py-4 justify-between items-center'>
                                        <div className="flex justify-center box-content h-16 w-32 items-center">
                                            <img className='h-16' src={product.image} alt="products" />
                                        </div>
                                        <div className='flex flex-col justify-start p-2 text-left w-2/3'>
                                            <p className='inline-flex px-2 items-center font-sans font-medium'>{product.name}</p>
                                            <p className='font-sans font-medium px-2 text-left'>Quantity : {order.items[product._id]}</p>
                                            <p className='font-sans font-medium px-2'>Price: <i className="fa fa-rupee text-sm p-1"></i>{(product.price * order.items[product._id])}</p>
                                        </div>
                                    </li>
                                )}
                                <div className='inline-flex py-2 font-sans'>
                                    <h1 className='font-bold text-sm'><i className="fa fa-rupee text-sm p-1"></i>{order.totalgrand}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-lg border-b-2 mt-4 shadow-lg">
                            <p className='text-sm font-serif border-b-2 rounded-lg p-2'>Shipping Details</p>
                            <div className='text-left p-2 px-4'>
                                <p className=' font-bold'>{order.name}</p>
                                <p className=' body-font'>{order.address}</p>
                                <div className='inline-flex py-2 font-sans'>
                                    <h1 className='font-bold text-sm'>Phone number :</h1>
                                    <h1 className='text-sm px-2'>{order.phone}</h1>
                                </div>

                            </div>
                        </div>
                        <div className="bg-gray-100 relative border-b-2 rounded-lg my-4 shadow-lg">
                            <p className='text-sm font-serif border-b-2 rounded-lg p-2'>Price Details</p>
                            <div className='text-left p-2 px-4'>
                                <li className='flex flex-wrap py-2 font-sans justify-between'>
                                    <h1 className='text-sm'>Subtotal</h1>
                                    <h1 className='text-sm px-2'><i className="fa fa-rupee text-sm p-1"></i>{subtotal}</h1>
                                </li>
                                <li className='flex flex-wrap py-2 font-sans justify-between'>
                                    <h1 className='text-sm'>Taxes(%18)</h1>
                                    <h1 className='text-sm px-2'><i className="fa fa-rupee text-sm p-1"></i>{(subtotal * 0.18).toFixed(2)}</h1>
                                </li>
                                <li className='flex flex-wrap py-2 font-sans justify-between'>
                                    <h1 className='text-sm'>Shippiing fee </h1>
                                    <h1 className='text-sm px-2'><i className="fa fa-rupee text-sm p-1"></i>25</h1>
                                </li>
                                <li className='flex flex-wrap py-2 font-sans justify-between'>
                                    <h1 className='font-bold text-sm'>Total Grand</h1>
                                    <h1 className='text-sm px-2 font-bold'><i className="fa fa-rupee text-sm p-1"></i>{order.totalgrand}</h1>
                                </li>
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center p-4 pb-10'>
                            {processing ?
                                <button className="inline-flex items-center justify-center bg-gray-800 px-4 py-2 text-white shadow-lg rounded-lg cursor-not-allowed" disabled>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                                :
                                <button onClick={this.handleBack} className='bg-gray-600 hover:bg-gray-800 px-4 py-2 text-white shadow-md hover:shadow-lg rounded-lg'>Go Back</button>
                            }
                        </div>
                    </div>
                }
            </section>
        )
    }
}

export default Order;
