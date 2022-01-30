import React, { Component } from 'react';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;


export class Orders extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        try {
            const orders = props.location.state;
            this.state = { data: orders, open: false, products: [], }
        } catch (error) {
            console.log(error);
        }
    }

    getItems = (order) => {
        try {
            const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            const config = {
                headers: {
                    'Authorization': `Bearer ${atoken}`,
                    'Content-Type': 'application/json'
                }
            }
            console.log(order);
            // this.state.data.map(product => {
            const data = JSON.stringify({ ids: Object.keys(order.items) })
            axios.post(API_URL + 'products/cart-items', data, config)
                .then(response => {
                    // console.log(response.data);
                    // if(response.data.lenght > 0){
                    this.props.history.push({
                        pathname: '/order',
                        state: { order: order, items: response.data }
                    })
                    // }
                }).catch(error => {
                    if (error.response) {
                        // console.log(error.response.status);
                        window.alert("Opp's there is some problem, so please login again !!");
                        console.log(error.response.data.message);
                    }
                });
            // })
            // const tem = await fetch(API_URL+ 'products/cart-items', {method: 'POST',headers: {
            //     'Authorization': `Bearer ${atoken}`,
            //     'Content-Type': 'application/json'
            // }, body:data})
            //     .then(response => response.json())
            //     .then(data =>  cartitems =  data
            //     );
        } catch (error) {
            window.alert("Opp's there is some problem, So please contact to the teachnical team or leave a message through contact-us section !!");
            // this.props.history.push('/error')
            console.log(error);
        }
        // console.log(cartitems);
        // return cartitems

    }

    totalItems = (res) => {
        let items = 0;
        // const res = this.props.data;
        const array = Object.values(res)
        array.forEach(element => {
            items += element;
        });
        // console.log(array)
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

    render() {
        const { data, open } = this.state;
        // console.log(data);
        return (
            <section className='px-2 pt-24'>
                <p className='font-serif border-b-2 font-medium py-2 md:p-4 px-2'>Order Summary</p>
                {/* <Order state={data[1]} /> */}
                {
                    data.map(order => {
                        // const res = this.get();
                        // console.log(res);
                        return (
                            <div key={order._id}>
                                {/* {!open && */}
                                {/* // <Order order={order} items={res}/>
                                    // this.getItems(order)
                                    // :
                                    // <div onClick={() => this.setState({ open: true })} id='desktopmenu' className='relative bg-gray-100 flex flex-row justify-between m-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl'> */}
                                <div onClick={() => this.getItems(order)} id='desktopmenu' className='relative bg-gray-100 flex flex-row justify-between m-4 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl'>
                                    <span className="bg-gray-500 rounded text-white px-3 py-1 tracking-widest text-xs absolute left-0 top-0 rounded-bl">OrderID : OD{order._id}</span>
                                    <div className="flex justify-center p-4 items-center">
                                        <div className="flex justify-center box-content h-16 w-32 items-center">
                                            <img className='h' src='images/pizza.png' alt="products" />
                                            {/* <img className='h' src={res[0].image } alt="products" /> */}

                                        </div>
                                        <div className='flex flex-col '>
                                            <p className='font-sans font-bold px-4 py-2'>Vanilla </p>
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
                                </div>
                            </div>)
                    })
                }
            </section>
        )
    }
}

export default Orders;
