import React, { Component } from 'react';

export class NotAuthorized extends Component {
    constructor(props) {
        super(props)
        this.state = { error: false }
    }
    componentDidMount(){
        if(this.props.location.state){
            this.setState({error: this.props.location.state.error})
        }
    }

    render() {
        const { error } = this.state;
        return (
                <div className="my-24 mx-4 bg-opacity-50 h-screen flex justify-center items-center ">
                    <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-gray-100 ">
                        <div className="text-center py-5 flex-auto justify-center">
                            <svg fill="currentColor" className="w-16 h-16 flex items-center text-red-400 mx-auto" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <h2 className="text-xl text-red-400 pt-4 ">{error ? error : "You're Not Authorized"}</h2>
                            <p className="text-sm text-gray-500 px-8 p-2">Sorry for Inconvenience please go back and try again .</p>
                            <p className="text-sm text-gray-500 px-8 pb-2 px-2">go back to the cart page and check the order status or click here bellow .</p>
                            <button onClick={() => this.props.history.push('/')} className="m-2 bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Go Back</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default NotAuthorized;
