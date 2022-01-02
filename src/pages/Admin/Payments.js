import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
export class Payments extends Component {
    constructor(props) {
        const role = window.localStorage.getItem('Role');
        super(props)
        window.scrollTo(0,0);
        try{
            console.log("payment page : " + role + "  " + this.props.location.state.id)

            if(this.props.location.state.id !== "adminPaymentsDeatils" || role !=='admin'){
                this.props.history.push({
                    pathname: '/notAuthorized',
                })
            }
        }catch(err){
            this.props.history.push({
                pathname: '/notAuthorized',
            })
        }
            
    }


    render() {
        return (
            <div className="flex pt-16 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">
                
            <div className="shadow-xl md:relative z-10 w-full md:w-48">

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
                                                state: {id: "adminMessages"}  }} className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                    <i className="fa fa-envelope pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
                                </Link>
                            </li>
                            <li className="mr-3 flex-1">
                                <Link to={{pathname: '/admin/payments',
                                            state: {id: "adminPaymentsDeatils"}}} className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white hover:border-red-700 border-b-2 border-red-500">
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
                    <div >
                        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                            <h3 className="font-bold pl-2">Payments</h3>
                        </div>
                    <div className='bg-gray-100 text-center h-screen'>
                            {/* <h1 className='aligin center'>This page under maintance </h1> */}
                            <section className="text-black-600 body-font">
                                <div className="container px-5 pt-24 mx-auto flex flex-wrap">
                                <div className="lg:w-2/3 mx-auto">
                                    <div className="flex flex-wrap w-full py-32 px-10 ">
                                    <div className="text-center w-full">
                                        <h2 className="text-7xl text-gray-900 font-black title-font mb-2">
                                        403
                                        </h2>
                                        <p className="leading-relaxed">You are not Authorized to access this .</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </section>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payments
