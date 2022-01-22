import Menubar from './Menubar';
import React, { Component } from 'react';

let role = 'customer';

class Orders extends Component {
   constructor(props) {
       super(props)
       window.scrollTo(0,0);
       try{
        role = window.localStorage.getItem('Role');
        if( this.props.location.state.id !== "adminOrders" || role !=='admin'){
            this.props.history.push({ pathname: '/notAuthorized', }) 
          }
        }catch(err){  this.props.history.push({ pathname: '/notAuthorized', }) }
       
   }


    render() {
return (
            <div className="flex pt-16 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">
                    <Menubar/>

                <div id="adminpanel" className="main-content flex-1">
                        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                            <h3 className="font-bold pl-2">Orders</h3>
                        </div>
                    <div className='bg-gray-100 h-screen'>
                        <p className='pt-8 font-bold pl-6'>All orders</p>
                            <section className="m-4 body-font">
                                {/* <div className="container px-5 pt-24 mx-auto flex flex-wrap">
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
                                </div> */}
                                <div >
                                        {/* <thead> */}
                                            <tr className='flex flex-row justify-between px-4'>
                                                <th className='px-6 py-2 text-left'>Orders</th>
                                                <th className='px-6 py-2 text-left'>Customer</th>
                                                <th className='px-6 py-2 text-left'>Address</th>
                                                <th className='px-6 py-2 text-left'>status</th>
                                                <th className='px-6 py-2 text-left'>Placed at</th>
                                            </tr>
                                        {/* </thead> */}

                                            <tbody className='flex flex-row justify-between px-4'>
                                                    <td className='px-6 py-2 text-left'>Placed at</td>
                                                    <td className='px-6 py-2 text-left'>Placed at</td>
                                            </tbody>

                                </div>
                                
                            </section>
                    </div>
                </div>
            </div>

    )
 }
}

export default Orders;

