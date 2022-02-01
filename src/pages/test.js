import React, { Component } from 'react';

export class test extends Component {
    render() {
        return (
                <section className='px-2 my-24 w-full'>
                    <p className='font-serif border-b-2 font-medium py-2 md:p-4 px-2'>Order Summary</p>
                    <div id='desktopmenu' className='w-full relative bg-gray-100 m-2 p-2 rounded-lg shadow-lg hover:shadow-xl'>
                        <span className="bg-gray-500 rounded text-white px-3 py-1 font-mono text-xs absolute left-0 top-0">OrderID : OD23jl5l4jll62j34h236k23b6b23</span>
                        <div className="flex justify-between items-center mt-6">
                            <div className="flex justify-center box-content items-center w-1/3">
                                <img className='object-scale-down object-center' src='images/pizza.png' alt="products" />
                            </div>
                            <div className='flex flex-col justify-center w-2/3 pl-4'>
                                <div className='flex items-center'>
                                    <div className="w-2 h-2 rounded-full bg-green-300" ></div>
                                    <h1 className='font-bold text-left text-xs pl-1'>Order placed on : Jan 12, 2020</h1>
                                </div>
                                <div className='pl-3'>
                                    <p className='text-xs truncate font-bold w-2/3'>Vanilla nut cracker stoberry</p>
                                    <p className='text-xs font-bold  '>items : 4</p>
                                    <p className='font-bold text-xs'> Price : $89</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
        )
    }
}

export default test;