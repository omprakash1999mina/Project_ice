import React, { Component } from "react";
import '../styles/loader.css';

class Loader extends Component {

    render() {
        return (
            <div className="min-w-screen bg-gray-200 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
                    <div className="loader-dots block relative w-20 h-5 mt-2">
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-gray-500 text-xs font-light mt-2 text-center">Please wait...</div>
                </div>
            </div>
        )
    }
}

export default Loader;