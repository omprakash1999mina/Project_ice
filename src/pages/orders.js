import React, { Component } from 'react';
import Loader from '../components/Loader';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
let dataFetched = {};

export class Orders extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        try {
            const orders = props.location.state;
            this.state = { data: orders, products: {}, ready: false, }

        } catch (error) {
            console.log(error);
            this.props.history.push('/notauthorized')
        }
    }

    componentDidMount() {
        this.getItems(this.state.data)
    }

    getItems = async (orders) => {
        try {
            const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            const config = {
                headers: {
                    'Authorization': `Bearer ${atoken}`,
                    'Content-Type': 'application/json'
                }
            }
            let promises = [];
            orders.forEach(order => {
                const data = JSON.stringify({ ids: Object.keys(order.items) })
                promises.push(axios.post(API_URL + 'products/cart-items', data, config)
                    .then(response => {
                        dataFetched[`${order._id}`] = response.data;
                    }).catch(error => {
                        if (error.response) {
                            window.alert("Opp's there is some problem, so please login again !!");
                            console.log(error.response.data.message);
                        }
                    }))
            })
            await Promise.all(promises).then(() => this.setState({ products: dataFetched, ready: true }))
            // console.log(dataFetched);
        } catch (error) {
            // window.alert("Opp's there is some problem, So please contact to the teachnical team or leave a message through contact-us section !!");
            this.props.history.push('/notauthorized')
            console.log(error);
        }
        return;
    }

    totalItems = (res) => {
        let items = 0;
        const array = Object.values(res)
        array.forEach(element => {
            items += element;
        });
        return items;
    }
    formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString([], options);
    }
    producthandler = (order, items) => {
        this.props.history.push({
            pathname: '/order',
            state: { order: order, items: items }
        })
    }
    render() {
        const { data, ready, products } = this.state;
        return (
            <section className='px-2 my-24'>
                <p className='font-serif border-b-2 font-medium py-2 md:p-4 px-2'>Order Summary</p>
                {!ready && <Loader />}
                {ready &&
                    data.map(order => {
                        return (
                            <div key={order._id}>
                                <section onClick={() => this.producthandler(order, products[order._id])} id='desktopmenu' className='hidden sm:flex relative bg-gray-100 flex-row justify-between m-4 p-4 rounded-lg shadow-lg hover:shadow-xl'>
                                    <span className="bg-gray-500 rounded text-white px-3 py-1 tracking-widest text-xs absolute left-0 top-0 rounded-bl">OrderID : OD{order._id}</span>
                                    <div className="flex flex-row justify-center p-4 items-center">
                                        <div className="flex flex-row justify-center box-content w-28 items-center">
                                            <img className='object-scale-down object-center' src={products[order._id][0].image} alt="products" />
                                        </div>
                                        <div className='flex flex-col justify-center w-36'>
                                            <p className='font-sans truncate font-bold px-4 py-2'>{products[order._id][0].name} ...</p>
                                            <p className='font-sans font-bold px-4 '>items : {this.totalItems(order.items)}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <h1 className='font-bold text-sm'>${order.totalgrand}</h1>
                                    </div>
                                    <div className='flex flex-col items-start m-4'>
                                        <div className='flex items-center'>
                                            <svg fill="currentColor" className="flex items-center text-green-400 -m-4 w-12" viewBox="0 0 16 16">
                                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                            </svg>
                                            <h1 className='font-bold text-left text-sm uppercase px-2 '>Order {order.status}</h1>
                                        </div>
                                        <h1 className='text-left pl-4 pt-2 font-bold text-sm'>At : {this.formatTime(order.createdAt)}</h1>
                                        <h1 className='text-left pl-4 font-bold text-sm'>On : {this.formatDate(order.createdAt)}</h1>
                                    </div>
                                </section>
                                <section id='mobilemenu' onClick={() => this.producthandler(order, products[order._id])} className='visible sm:hidden relative bg-gray-100 m-2 p-2 rounded-lg shadow-lg hover:shadow-xl'>
                                    <span className="bg-gray-500 rounded text-white px-3 py-1 font-mono text-xs absolute left-0 top-0">OrderID : OD{order._id}</span>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex justify-center box-content items-center w-1/3">
                                            <img className='w-28 object-scale-down object-center' src={products[order._id][0].image} alt="products" />
                                        </div>
                                        <div className='flex flex-col justify-center w-2/3 pl-4'>
                                            <div className='flex items-center'>
                                                <div className="w-2 h-2 rounded-full bg-green-300" ></div>
                                                <h1 className='font-bold text-left text-xs pl-1'>Order {order.status} on : {this.formatDate(order.createdAt)}</h1>
                                            </div>
                                            <div className='pl-3'>
                                                <p className='text-xs truncate font-bold w-2/3'>{products[order._id][0].name}</p>
                                                <p className='text-xs font-bold  '>items : {this.totalItems(order.items)}</p>
                                                <p className='font-bold text-xs'> Price : ${order.totalgrand}</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    })
                }
            </section>
        )
    }
}

export default Orders;
