import React, { Component } from 'react';
import { CartContext } from '../CartContext';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export class Cartelement extends Component {
    static contextType = CartContext;
    constructor(props) {
        super(props)
        try {
            const { totalgrand, items } = props.location.state;
            this.state = { error: false, shipping: true, placed: false, payment: false, processing: false, totalgrand: totalgrand, items: items, name: '', address: '', state: '', city: '', postalcode: '', phone: '', taxes: Number((totalgrand * 0.18).toFixed(2)) }
        } catch (error) {
            this.props.history.push('/error')
        }
    }
    ordreNow = () => {
        this.setState({ processing: true })
        try {
            const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            const config = {
                headers: {
                    'Authorization': `Bearer ${atoken}`,
                }
            }
            const data = {
                name: this.state.name,
                items: this.state.items,
                phone: this.state.phone,
                totalgrand: (this.state.totalgrand + 25 + this.state.taxes).toFixed(2),
                address: `${this.state.address}, ${this.state.city}, ${this.state.state}, ${this.state.postalcode}`
            }
            // console.log(data.address);
            axios.post(API_URL + '/orders', data, config)
                .then(response => {
                    // console.log(response.data);
                    this.setState({ placed: true, payment: false , processing: false});

                }).catch(error => {
                    if (error.response) {
                        this.setState({ placed: true, payment: false, error: error.response.data.message, processing: false });
                        console.log(error.response.data.message);
                    }
                });
        } catch (error) {
            this.props.history.push('/error')
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleBack = () => {
        if (this.state.error) {
            this.props.history.push('/cart')
        }
        else {
            try {
                this.setState({ processing: true })
                const temp = { items: {}, totalItems: 0 }
                const { cart, setCart } = this.context;
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
                            if (!this.state.error) {
                                setCart(temp);
                            }
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
            }
        }

    }
    render() {
        const { taxes, error, payment, processing, totalgrand, name, phone, city, postalcode, state, address, placed, shipping } = this.state
        return (
            <div className="my-24 mx-4 bg-opacity-50 h-screen flex justify-center items-center ">
                <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-gray-100 ">
                    {shipping && <p className="font-bold mt-3 text-center text-gray-700 ">Shipping Information</p>}
                    {
                        payment &&
                        <div className="text-center p-5 flex-auto justify-center">
                            <svg width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-gray-500 mx-auto" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z" />
                            </svg>

                            <p className="font-bold mt-3 text-center text-gray-700 ">Payment Mode</p>
                            <section className="text-gray-600 body-font overflow-hidden">
                                <div className="p-4 w-full">
                                    <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                                        <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">Default COD</span>
                                        <div className='flex flex-wrap py-4 justify-between'>
                                            <h2>Subtotal</h2>
                                            <h2><i className="fa fa-rupee text-sm p-1"></i>{totalgrand}</h2>
                                        </div>
                                        <div className='flex flex-wrap py-4 justify-between'>
                                            <h2>Taxes</h2>
                                            <h2><i className="fa fa-rupee text-sm p-1"></i>{taxes}</h2>
                                        </div>
                                        <div className='flex flex-wrap border-b-2 py-4 justify-between'>
                                            <h2>Shipping Fee</h2>
                                            <h2><i className="fa fa-rupee text-sm p-1"></i>25</h2>
                                        </div>
                                        <div className='flex flex-wrap border-b-2 font-bold py-4 justify-between'>
                                            <h2>Total grand</h2>
                                            <h2><i className="fa fa-rupee text-sm p-1"></i>{(25 + taxes + totalgrand).toFixed(2)}</h2>
                                        </div>
                                        {processing ?
                                            <button type="button" className="inline-flex items-center justify-center mb-2 m-4 md:mb-0 p-2 text-sm shadow-sm font-medium border text-white bg-gray-700 rounded-full cursor-not-allowed" disabled>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </button>
                                            :
                                            <button onClick={this.ordreNow} className="mb-2 m-4 md:mb-0 p-2 text-sm shadow-sm font-medium border text-white rounded-full hover:shadow-lg bg-gray-600 hover:bg-gray-800">Confirm</button>
                                        }
                                        <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them ice-cream's.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    }

                    {shipping &&
                        <div className="w-full mx-2 flex-1 ">
                            <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">full name</p>
                            <input name='name' value={name} onChange={this.changeHandler} className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" placeholder="name" />

                            <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">address</p>
                            <textarea name='address' value={address} onChange={this.changeHandler} className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" placeholder="address" />
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <div className='mx-1'>
                                    <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">city</p>
                                    <input name='city' value={city} onChange={this.changeHandler} className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" placeholder="city" />
                                </div>
                                <div className='mx-1'>
                                    <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">State</p>
                                    <input name='state' value={state} onChange={this.changeHandler} className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" placeholder="state" />
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <div className='mx-1'>
                                    <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">postal Code</p>
                                    <input name='postalcode' value={postalcode} onChange={this.changeHandler} className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="number" placeholder="postal code" />
                                </div>
                                <div className='mx-1'>
                                    <p className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">phone</p>
                                    <input name='phone' value={phone} onChange={this.changeHandler} className="w-full py-2 px-3 border border-gray-200 focus:outline-none focus:border-indigo-500 rounded-lg" type="text" placeholder="phone" />
                                </div>
                            </div>

                            <div className="p-3 justify-end mt-2 text-center space-x-4 md:block">
                                {<button onClick={() => this.props.history.push('/cart')} className="mb-2 m-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>}
                                {<button onClick={() => this.setState({ shipping: false, payment: true })} className="mb-2 m-4 md:mb-0 bg-green-400 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Proceed</button>}
                            </div>
                        </div>}
                    {placed &&
                        <div className="text-center py-5 flex-auto justify-center">
                            {error ?
                                <svg fill="currentColor" className="w-16 h-16 flex items-center text-red-400 mx-auto" viewBox="0 0 16 16">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                :
                                <svg fill="currentColor" className="w-16 h-16 flex items-center text-green-400 mx-auto" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                </svg>
                            }
                            {error && <h2 className="text-xl text-red-400 pt-4 ">{error}</h2>}
                            {error && <p className="text-sm text-gray-500 px-8 p-2">Sorry for Inconvenience please go back and try again .</p>}
                            {!error && <h2 className="text-xl text-green-400 pt-4 ">Order Placed Successfully !!</h2>}
                            {!error && <p className="text-sm text-gray-500 px-8 p-2">go back to the cart page and check the order status or click here bellow .</p>}
                            {processing ?
                                <button type="button" className="inline-flex items-center justify-center m-2 border border-white px-5 py-2 text-sm tracking-wider text-white shadow-lg bg-gray-700 rounded-full cursor-not-allowed" disabled>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                                :
                                <button onClick={this.handleBack} className="m-2 bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">{error ? 'Go Back' : 'Order Summary'}</button>
                            }
                        </div>
                    }
                </div>
            </div>

        )
    }
}

export default Cartelement;
