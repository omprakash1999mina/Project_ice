import React, { Component } from 'react';

export class Order extends Component {
    constructor(props) {
      super(props)
    
      this.state = { message: ''}
    }
    
    render() {
        return (
            <tr>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex flex-col font-medium  text-green-500">
                        {/* <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img class="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov"/></div> */}
                        <div>34jksdjflj3jkjlasd3 </div>
                        <div>Vanila jam - 1 pcs</div>
                        <div>Chocolate-nut's-3 pcs</div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">Raju Meena</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-clip overflow-hidden">6 ,kanak vihar near kanakpura railway station meenawala panchyawala jaipur 302034</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <select className='w-full mb-4 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'>
                        <option value="#">Placed</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Prepared">Prepared</option>
                        <option value="Out-For-Delivery">Out-For-Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                    </select>
                </td>
                <td className="p-2 whitespace-nowrap text-center">
                    <div>11:32 PM</div>
                </td>
            </tr>
        )
    }
}

export default Order;
