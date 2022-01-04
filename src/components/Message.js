import React, { Component } from 'react';
import axios from "axios";
const  API_URL = process.env.REACT_APP_API_URL;

let modal = false;
let token;
class Message extends Component {
constructor(props) {
    super(props)
    const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
    token = atoken;
    // console.log(atoken)
    this.state = {
         data: ""
    }
}
handleCancel=()=>{
    modal = false;
    this.setState({data: ""});
}
confirmModal= () =>{
    modal = true;
    this.setState({data: ""});

}

// const Message = (props) => {

    // console.log('this is message destructuring page ' + message)
    // console.log(token);
    deleteHandler= (id,e) =>{

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                
            }
        }

        console.log(id)

        axios.delete(API_URL+'message/'+id,config)
        .then(response => {
            // console.log(response.data);
            modal = false;
            // this.setState({data: ''});
            window.location.reload();

            
        })
        
        .catch(error =>{
            if(error.response){
                // console.log(error.response.status);
                let error_message = error.response.data.message;
                
                console.log(error_message);
                // console.log(error.response.headers);
                
            }
        });
    }

    formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    render() {
        const {message} = this.props;
        // console.log(message._id)
    return (
        <div>
            <div className="pb-10 mx-2">
            <div className="shadow-xl mx-2 ">
                <section className="block rounded-lg bg-white py-3 border-t pb-4">
                    <div className="px-4 py-2 flex flex-col sm:flex-row justify-center items-center sm:justify-between">
                        <span className="text-sm font-semibold text-gray-900">{message.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{message.email}</span>
                            <span className="px-4 text-sm font-semibold text-gray-600">{this.formatDate(message.createdAt)}</span>
                    </div>
                    <p className="px-4 py-2 text-sm font-semibold text-gray-700">{message.message}</p>
                    <div className="px-4 py-2 flex  justify-between">
                        <button className="text-sm font-semibold text-gray-900 bg-gray-400 px-4 border-0 focus:outline-none hover:bg-gray-500 rounded ">Reply</button>
                        <button onClick={this.confirmModal} data-toggle="modal" data-target="#myModal" className="text-white px-4 bg-red-300 border-0 focus:outline-none hover:bg-red-500 rounded text-lg">Delete</button>
                    </div>
                </section>
            </div>
            </div>
            {
                modal === true && 
                <div className="">
                
                
                <div  className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"   id="modal-id">
	            <div className="absolute shadow-2xl rounded-2xl ">

                <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">
                
                <div className="">
                
                    <div className="text-center p-5 flex-auto justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                            <p className="text-sm text-gray-500 px-8">Do you really want to delete {message.name}'s (  {message.email}  )  message ? This process cannot be undone</p>    
                    </div>

                    <div className="p-3 justify-end  mt-2 text-center space-x-4 md:block">
                        <button onClick={this.handleCancel} className="mb-2 m-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>
                        <button onClick={this.deleteHandler.bind("complimentry", message._id)} className="mb-2 m-4 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Delete</button>
                    </div>
                </div>
                </div>
                </div>

                </div>

            </div>

            }



        </div>



    )
  }
}

export default Message;
