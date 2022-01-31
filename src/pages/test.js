import React, { Component } from 'react';

export class test extends Component {
    render() {
        return (
            <div>
                <section className='px-2 my-24'>
                    <p className='font-serif border-b-2 font-medium py-2 md:p-4 px-2'>Order Summary</p>
                    <div id='desktopmenu' className='relative bg-gray-100 flex flex-row justify-between m-2 p-2 rounded-lg shadow-lg hover:shadow-xl'>
                        <span className="bg-gray-500 rounded text-white px-3 py-1 tracking-widest text-xs absolute left-0 top-0 rounded-bl">OrderID : OD23jl5l4jll62j34h236k23b6b23</span>
                        {/* <div className="flex justify-center items-center"> */}
                            <div className="flex justify-center box-content w-4/6 items-center">
                                <img className='h' src='images/pizza.png' alt="products" />
                                {/* <img className='h' src={res[0].image } alt="products" /> */}

                            </div>
                            {/* <div className='flex flex-col '>
                                <p className='font-sans font-bold px-4 py-2'>Vanilla ...</p>
                                <p className='font-sans font-bold px-4 '>items : 4</p>
                            </div> */}
                        {/* </div> */}
                        {/* <div className='flex flex-col justify-center'>
                            <h1 className='font-bold text-sm'>$89</h1>
                        </div> */}
                        <div className='flex flex-col items-start mt-4'>
                            <div className='flex items-center'>
                                {/* <svg fill="currentColor" className="flex items-center text-green-400 -m-4 w-12" viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg> */}
                                <h1 className='font-bold text-left text-sm uppercase px-2 '>Order placed</h1>
                            </div>
                            <h1 className='text-left pl-4 pt-2 font-bold text-sm'>At : 12:30 AM</h1>
                            <h1 className='text-left pl-4 font-bold text-sm'>On : Jan 12, 2020</h1>
                        </div>
                    </div>
                </section >
            </div>
        )
    }
}

export default test;