import axios from 'axios';
import React, { Component } from 'react';
const  API_URL = process.env.REACT_APP_API_URL;

let error_message ;
let res_error;
function userMessage(){
    switch (error_message) {
        case 'mid':
        error_message= res_error;
        return <div className="py-2 text-center text-yellow-500 ">{error_message}</div>
        
        case false:
            error_message= res_error;
            return <div className="py-2 text-center text-green-500 ">{error_message}</div> 
            
        case true:
            error_message= res_error;
            return <div className="py-2 text-center text-red-500 ">{`${error_message} ,please try again with correct details !!`}</div>
        default :
        break;
    }
        
}

export default class Contact extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0,0);
        this.state = { name: '', email: '', message: '',processing: false}
        this.initialstate = {...this.state}
    }
     
    handleClick=()=>{
            error_message = 'mid';
            res_error='Sending the message.....';
            this.setState({processing: true}) 
                    // console.log(this.state);
            const config = {
                headers: {
                    'Content-Type': 'application/json',

                }
            }

            const data = {
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            }
    
            axios.post(API_URL+"message", data, config)
            .then(response => {
                // console.log(response.data);
                setTimeout(()=>{
                    error_message=false;
                    res_error="Thank's for making contact with us, your message successfully sent to our team ,necessary action/response will be taken in two days ";
                    this.setState({processing: true})

                },100)
            })
            .catch(error =>{
                if(error.response){
                    error_message=true;
                    res_error = error.response.data.message
                    this.setState({processing: true})
                    
                }
               
            })
    
           
        }

        changeHandler = (e) =>{
            this.setState({[e.target.name]: e.target.value})
        }


    render() {
        const {name, message, email, processing} = this.state;
        return (
            <div>
                <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-5">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">If you have any issue regarding products or service feel free to Contact us.</p>
                    </div>
                    <div className="container m-2 text-center flex flex-col">
                    
                    { processing &&
                        <div  className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"   id="modal-id">
                            <div className="absolute shadow-2xl rounded-2xl ">
                            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">
                            
                                <div className="text-center p-5 flex-auto justify-center">
                                    <svg  width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-gray-500 mx-auto" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"/>
                                    </svg>
                                    <div className="py-6 text-xl"> {userMessage()} </div> 
                                    <button onClick={()=> this.setState(this.initialstate) } className="bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm font-medium text-white rounded-lg hover:shadow-lg hover:bg-gray-600">Close</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        
                    }
                    </div>

                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" name="name" value={name} onChange={this.changeHandler} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        </div>
                        <div className="p-2 w-1/2">
                        <div className="relative">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={this.changeHandler} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        </div>
                        <div className="p-2 w-full">
                        <div className="relative">
                            <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                            <textarea id="message" name="message" value={message} onChange={this.changeHandler} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                        </div>
                        </div>
                        <div className="p-2 w-full">
                            { processing ?
                                <div className="flex items-center justify-center">
                                    <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-700 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                    </button>
                                </div>
                                :
                                <button onClick={this.handleClick} className="flex mx-auto text-white bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-gray-900 rounded text-lg">Send</button>
                            }
                            
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                        <a href='/' className="text-indigo-500">omprakash.bairwa.iitbhu20@gmail.com</a>
                        <p className="leading-normal my-5">49 A Meenawala St.
                            <br/>Jhotwara Jaipur ,india
                        </p>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
        )
    }
}
