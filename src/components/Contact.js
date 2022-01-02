import axios from 'axios';
import React, { Component } from 'react';
const  API_URL = process.env.REACT_APP_API_URL;

let error_message ;
let res_error;
function userMessage(){
    error_message=`* ${res_error} `;
    return error_message;
}

export default class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             email: '',
             message: '',
        }
    }
     
    handleClick=(e)=>{
            e.preventDefault();
            // console.log(this.state);
            const config = {
                headers: {
                    'Content-Type': 'application/json',

                }
            }
            
    
            // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
            axios.post(API_URL+"message", this.state, config)
            .then(response => {
                error_message = 'mid';
                // console.log("in response block")

                // console.log(response.data);
                res_error='Sending the message.....';
                setTimeout(()=>{
                    this.setState({name: '', message: '', email: ''})
                    error_message=false;
                    res_error='Successfully sent to our team , action/response will be in two days ';

                },100)
                setTimeout(()=>{
                    this.setState({name: '', message: '', email: ''})
                    res_error='';
                },1000)
            //     this.props.history.push( {pathname: "/welcome",
            })
            .catch(error =>{
                // console.log("in error block ")
                if(error.response){
                    console.log(error.response);
                    // const error_message = error.response.data.message;
                    error_message=true;
                    setTimeout(() => {

                            this.setState({name: '', message: '', email: ''})
                    }, 10);
                    res_error = error.response.data.message
                    // console.log(error.response.headers);
                    
                }
               
            })
    
           
        }

        changeHandler = (e) =>{
            this.setState({[e.target.name]: e.target.value})
        }
    

    render() {
        const {name, message, email} = this.state;
        return (
            <div>
                <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-5">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">If you have any issue regarding products or service feel free to Contact us.</p>
                    </div>
                    <div className="container m-2 text-center flex flex-col">

                    {(()=> {
                        switch (error_message) {
                            case 'mid':
                                // console.log(key)
                               return <div className="py-2 text-center text-yellow-500 ">{userMessage()}</div>
                                
                            case false:
                                // console.log(key)
                               return <div className="py-2 text-center text-green-500 ">{userMessage()}</div> 
                                
                            case true:
                                // console.log(key)
                               return <div className="py-2 text-center text-red-500 ">{userMessage()}</div>
                            default :
                            break;
                        }
    
                    })()
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
                        <button onClick={this.handleClick} className="flex mx-auto text-white bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-gray-900 rounded text-lg">Send</button>
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                        <a href='/' className="text-indigo-500">op1999mina@gmail.com</a>
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
