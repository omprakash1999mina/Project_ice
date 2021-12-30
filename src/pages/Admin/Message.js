import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Messages from '../../components/Messages';


export class Message extends Component {

constructor(props) {
    super(props)
    const role  = window.localStorage.getItem('Role');
    // console.log(role + 'this is role')

    try {
        if( this.props.location.state.id !=="adminMessages" || role !=='admin' ){
            this.props.history.push({
                pathname: '/notAuthorized',
            }) 
        }
        
    } catch (error) {
        this.props.history.push({
            pathname: '/notAuthorized',
        })
    }
    
}


    render() {
        return (
            <>
        
            <div className="flex bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">

            <div className=" shadow-xl md:relative z-10 w-full md:w-48">

                    <div className="md:w-48  md:fixed md:left-0  content-center md:content-start text-left justify-between">
                        <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                            <li className="mr-3 flex-1">
                                <Link to={{pathname: '/admin/products',
                                            state: {id: "adminProducts"}}} 
                                        className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                    <i className="fas fa-tasks pr-0 md:pr-3"></i><span  className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Products</span>
                                </Link>
                            </li>
                            <li className="mr-3 flex-1">
                                <Link  to={{ pathname: '/admin/messages',
                                                state: {id: "adminMessages"}  }} className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 hover:border-purple-700 border-purple-500">
                                    <i className="fa fa-envelope pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
                                </Link>
                            </li>
                            <li className="mr-3 flex-1">
                                <Link to={{pathname: '/admin/payments',
                                            state: {id: "adminPaymentsDeatils"}}} className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                    <i className="fa fa-wallet pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Payments</span>
                                </Link>
                            </li>
                            <li className="mr-3 felx-1">
                                <Link to={{pathname: '/admin/analytics',
                                            state: {id: "adminAnalytics"}}} className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-600">
                                    <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                </Link>
                            </li>
                        </ul>
                    </div>


                    </div>

                <div id="adminpanel" className="main-content flex-1">

                <div>
                        <div className=" pt-3">
                            <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                                <h3 className="font-bold pl-2">Message</h3>
                            </div>
                        </div>
    
                        <div className="flex bg-gray-100 flex-wrap">
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Total Messages</h5>
                                            <h3 className="font-bold text-3xl">125 <span className="text-green-500"><i class="fa-solid fa-message"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-pink-600"><i className="fas fa-users fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Service Ralated</h5>
                                            <h3 className="font-bold text-3xl">249 <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Products Realted</h5>
                                            <h3 className="font-bold text-3xl">2 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-blue-600"><i className="fas fa-server fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">WebSite Realted</h5>
                                            <h3 className="font-bold text-3xl">24</h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Delivery Ralted</h5>
                                            <h3 className="font-bold text-3xl">2 </h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-red-600"><i className="fas fa-inbox fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Others</h5>
                                            <h3 className="font-bold text-3xl">4 <span className="text-red-500"><i className="fas fa-caret-up"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                        </div>
    
                        {/* <Message/> */}
                        <Messages/>
                       
            </div>

                </div>
                </div>

        </>




            
        )
    }
}

export default Message;
