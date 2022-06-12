import React, { Component } from 'react'
import Messages from '../../components/Messages';
import Menubar from './Menubar';


export class Message extends Component {

constructor(props) {
    super(props)
    window.scrollTo(0,0);
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
        
            <div className="flex pt-16 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">
                <Menubar/>

                <div id="adminpanel" className="main-content flex-1">

                        <div>
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
    
                        <Messages/>
                       

                </div>
            </div>

        )
    }
}

export default Message;
