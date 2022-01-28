import Menubar from './Menubar';
import React, { Component } from 'react';
import Order from './Order';
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

let role = 'customer';

class Orders extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        try {
            role = window.localStorage.getItem('Role');
            if (this.props.location.state.id !== "adminOrders" || role !== 'admin') {
                this.props.history.push({ pathname: '/notAuthorized', })
            }
        } catch (err) { this.props.history.push({ pathname: '/notAuthorized', }) }

        this.state = { orders: {} }
    }
    componentDidMount() {
        const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
        const config = {
            headers: {
                'Authorization': `Bearer ${atoken}`,

            }
        }
        axios.get(API_URL + '/orders', config)
            .then(response => {
                // console.log(response.data);
                this.setState({orders:response.data});

            }).catch(error => {
                if (error.response) {
                    // console.log(error.response.status);
                    console.log(error.response.data.message);

                }
            })
    }

    render() {
        // const { orders } = this.state;
        return (
            <div className="flex pt-16 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">
                <Menubar />

                <div id="adminpanel" className="main-content flex-1">
                    <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                        <h3 className="font-bold pl-2">Orders</h3>
                    </div>
                    <div className='bg-gray-100 h-screen'>
                        <p className='pt-8 font-bold pl-6'>All orders</p>
                        <section className="m-4 body-font">
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50 ">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Orders</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Customer</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Address</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">status</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Placed at</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-100">
                                            <Order />
                                            <Order />
                                            <Order />
                                          {/* {
                                              orders.map(order => <Order key={order._id} order={order} />)
                                          }   */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        )
    }
}

export default Orders;

