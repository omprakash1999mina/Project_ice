import React, { Component } from "react";
import  '../styles/loader.css';

class Loader extends Component {
    
render() {
        return (
            <div className= "bg-gray-200">
            <div className="fixed bg-gray-100 left-0 z-50 w-screen h-screen flex items-center justify-center " >
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
            </div>
        )
    }
}

export default Loader;