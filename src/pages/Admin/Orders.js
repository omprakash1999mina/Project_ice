import Menubar from './Menubar';
import React, { Component } from 'react';

let role = 'customer';

class Orders extends Component {
   constructor(props) {
       super(props)
       window.scrollTo(0,0);
       window.onfocus = function() { console.log('active')}
       try{
        role = window.localStorage.getItem('Role');
        // console.log("admin page role : " +role)
        console.log("state : " +this.props.location.state.id)
        if( this.props.location.state.id !== "adminOrders" || role !=='admin'){
            this.props.history.push({
                pathname: '/notAuthorized',
            }) 
          }
        }catch(err){  this.props.history.push({ pathname: '/notAuthorized', }) }
       
   }


    render() {
return (
            <div className="flex pt-16 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">
                    <Menubar/>

                <div id="adminpanel" className="main-content flex-1">
                    <div >
                        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                            <h3 className="font-bold pl-2">Orders</h3>
                        </div>
                    <div className='bg-gray-100 text-center h-screen'>
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

export default Orders;

