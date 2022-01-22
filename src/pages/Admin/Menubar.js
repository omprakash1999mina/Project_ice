import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

let role = 'customer';

class Menubar extends Component {
   constructor(props) {
       super(props)
       window.scrollTo(0,0);
       try{
            role = window.localStorage.getItem('Role');
            if( role !=='admin'  ){
                this.props.history.push({
                    pathname: '/notAuthorized',
                }) 
            }
        }catch(err){
            this.props.history.push({  pathname: '/notAuthorized', })
        }
}

    render() {
        return (
            <div className='relative'>
                <div className="bg-gray-800  shadow-xl md:relative z-10 w-full md:w-48">

                    <div className="md:w-48  md:fixed md:left-0  content-center md:content-start text-left justify-between">
                        <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                            <li className="mr-3 flex-1">
                                <NavLink to={{pathname: '/admin/products',
                                            state: {id: "adminProducts"}}} activeClassName="border-pink-600" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                    <i className="fas fa-tasks pr-0 md:pr-3"></i><span  className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Products</span>
                                </NavLink>
                            </li>
                            <li className="mr-3 flex-1">
                                <NavLink  to={{ pathname: '/admin/messages',
                                                state: {id: "adminMessages"}  }} activeClassName="border-purple-600" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                    <i className="fa fa-envelope pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
                                </NavLink>
                            </li>
                            <li className="mr-3 flex-1">
                                <NavLink to={{pathname: '/admin/payments',
                                            state: {id: "adminPaymentsDeatils"}}} activeClassName="border-red-600" className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                    <i className="fa fa-wallet pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Payments</span>
                                </NavLink>
                            </li>
                            <li className="mr-3 felx-1">
                                <NavLink to={{pathname: '/admin/analytics',
                                            state: {id: "adminAnalytics"}}} activeClassName="border-blue-600" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-600">
                                    <i className="fas fa-chart-area pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                </NavLink>
                            </li>
                            <li className="mr-3 felx-1">
                                <NavLink to={{pathname: '/admin/orders',
                                            state: {id: "adminOrders"}}} activeclassName="border-green-600" className="block py-1 md:py-3 pl-1 align-middle text-white no-underline border-b-2 border-gray-800 hover:border-green-500">
                                    <i className='fa fa-shopping-cart pr-0 md:pr-3 '></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Orders</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
    )
 }
}

export default Menubar;
