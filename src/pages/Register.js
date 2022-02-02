import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;

let error_message;
let res_error;
let url = null;
let formdata;
function userMessage() {
    error_message = `*  ${res_error} please try again with correct details !!`;
    return error_message;
}

class Register extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0, 0);
        this.state = {resdata: {} ,  name: '', age: '', gender: '', email: '', password: '', repeat_password: '', image: null, imgsrc: null, error_image: false, error_name: false, error_email: false, error_age: false, error_gender: false, error_password: false, error_repassword: false, confirm: false, submited: false, processing: false }
        this.intialstate = { ...this.state }
    }

    handleValidation() {
        // console.log(typeof(this.state.image))
        if (typeof (this.state.image) === "undefined" || this.state.image === null) {
            this.setState({ error_image: true });
            return false;
        }
        //name
        if (typeof this.state.name === 'undefined' || this.state.name === '') {
            this.setState({ error_name: true })
            res_error = 'name is invalid';
            console.log(res_error)
            return false;
        }
        //gender
        if (typeof this.state.gender === 'undefined' || this.state.gender === '') {
            this.setState({ error_gender: true })
            res_error = 'gender is invalid';
            console.log(res_error)
            return false;
        }
        //age
        if (typeof this.state.age === 'undefined' || this.state.age === '') {
            this.setState({ error_age: true })
            res_error = 'age is invalid';
            console.log(res_error)
            return false;
        }
        //password
        if (typeof this.state.password === 'undefined' || this.state.password === '') {
            this.setState({ error_password: true })
            res_error = 'password is invalid';
            console.log('password is invalid')
            return false;
        }
        //repassword
        if (this.state.repeat_password === '' || this.state.password !== this.state.repeat_password) {
            this.setState({ error_repassword: true })
            res_error = 'password is invalid';
            console.log('password did not match')
            return false;
        }
        //Email
        if (typeof this.state.email === 'undefined' || this.state.email === '') {
            this.setState({ error_email: true })
            res_error = 'Email is invalid';
            console.log(res_error)
            return false;
        }
        return true;
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.setState({ processing: true })
        if (this.handleValidation() === true) {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
            if (this.state.image_file !== null) {
                formdata = new FormData();
                formdata.append('name', this.state.name);
                formdata.append('age', this.state.age);
                formdata.append('gender', this.state.gender);
                formdata.append('email', this.state.email);
                formdata.append('password', this.state.password);
                formdata.append('repeat_password', this.state.repeat_password);
                formdata.append('image', this.state.image);
            }
            axios.post(API_URL + "register", formdata, config)
                .then(response => {
                    error_message = false;
                    const resdata = {
                        id: response.data._id,
                        atoken: response.data.access_token,
                        rtoken: response.data.refresh_token
                    }
                    const userSetting = JSON.stringify(resdata);
                    window.localStorage.setItem('userSetting', userSetting);
                    // console.log(userSetting)
                    this.setState({ submited: true, confirm: true, processing: false, resdata: resdata });
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response);
                        error_message = true;
                        res_error = error.response.data.message
                    }
                    this.setState({ confirm: true, processing: false })
                })
        }
        else {
            this.setState({ processing: false })
        }


    }
    handleImagePreview = (e) => {
        // Assuming only image
        try {
            var file = this.refs.file.files[0];
            var reader = new FileReader();
            url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
                this.setState({
                    imgsrc: [reader.result],
                })
            }.bind(this);
        } catch (err) {
            console.log("image field is Empty , Please select a image ");
        }

        let image_as_files = e.target.files[0]
        this.setState({
            image: image_as_files,
        })
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value, error_name: false, error_age: false, error_gender: false, error_email: false, error_password: false, error_repassword: false, error_image: false, });
    }


    render() {
        const {resdata ,processing, name, age, gender, repeat_password, email, password, confirm, error_image, error_age, error_gender, error_email, error_name, error_password, error_repassword, submited, } = this.state;
        return (
            <div>
                <section className=" pt-32 text-gray-600 body-font">
                    <div className="container px-5 pb-24 mx-auto flex flex-wrap items-center">
                        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">Be a Member of our Royal_IITian's club and make orders fluently with exciting offers !!</h1>
                            <p className="leading-relaxed mt-4">Don’t let your ice cream melt and drip without getting the chance to eat it. Life is the same, you have to enjoy it before you lose it.</p>
                        </div>
                        <div className="text- lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 className="text-gray-900 text-lg font-medium text-center title-font mb-2">Sign Up</h2>
                            <div>
                                <label className="text-xs font-bold uppercase">
                                    Photo
                                </label>
                                <div className="mt-1 flex items-center">
                                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                        {url !== null ?
                                            <img alt="" src={this.state.imgsrc} />
                                            :
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        }
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <input className={`${error_image ? 'border-red-500' : 'border-gray-300'} shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} ref="file" type="file" name="user[image]" multiple={true} onChange={this.handleImagePreview} />
                                    {error_image && <p className="text-red-500 text-xs italic">Please choose a profile photo.</p>}
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="full-name" className="leading-7 text-xs font-bold uppercase">Full Name</label>
                                {<input type="text" value={name} name="name" onChange={this.changeHandler} placeholder="Name" className={`${error_name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'} w-full bg-white rounded border  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />}
                                {error_name && <p className="text-red-500  text-xs italic">Name can not be empty.</p>}
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="gender" className="leading-7 text-xs font-bold uppercase">Gender : * </label>
                                <select name="gender" value={gender} onChange={this.changeHandler} className={` ${error_gender ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'} w-full bg-white rounded border  text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out`}>
                                    <option value="">-----Select Your Gender Type-----</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Transgender">Transgender</option>
                                </select>
                                {error_gender && <p className="text-red-500  text-xs italic">Please choose correct gender.</p>}
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="age" className="leading-7 text-xs font-bold uppercase">Age</label>
                                {<input type="number" value={age} name="age" onChange={this.changeHandler} placeholder="Age" className={`${error_age ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'} w-full bg-white rounded border  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />}
                                {error_age && <p className="text-red-500  text-xs italic">Age can not be empty or invalid.</p>}
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-xs font-bold uppercase">Password</label>
                                {<input type="password" value={password} name="password" onChange={this.changeHandler} placeholder="Enter your password" className={` ${error_password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'} w-full bg-white rounded border text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />}
                                {error_password && <p className="text-red-500  text-xs italic">Password can not be empty.</p>}
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-xs font-bold uppercase">Re-enter password</label>
                                {<input type="password" value={repeat_password} onChange={this.changeHandler} name="repeat_password" placeholder="Again enter your password" className={` ${error_repassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'} w-full bg-white rounded border  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />}
                                {error_repassword && <p className="text-red-500  text-xs italic">Password did not match !.</p>}
                            </div>

                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-xs font-bold uppercase">Email</label>
                                {<input type="email" value={email} name="email" onChange={this.changeHandler} placeholder="Email" className={` ${error_email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'} w-full bg-white rounded border  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`} />}
                                {error_email && <p className="text-red-500  text-xs italic">Email can not be empty.</p>}
                            </div>
                            {processing ?
                                <button type="button" className="inline-flex items-center justify-center border border-white text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 text-lg rounded-lg cursor-not-allowed" disabled>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                                :
                                <button onClick={this.submitHandler} className="text-white bg-gray-600 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded text-lg">Register Now</button>
                            }
                            <p className="text-xs text-gray-500 mt-3">if you already have an account <Link className="text-blue-800 ml-2" to="/login"> Sign_in </Link> .</p>
                        </div>
                    </div>
                </section>


                {confirm &&
                    <div className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                        <div className="absolute shadow-2xl rounded-2xl ">
                            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">
                                <div className="text-center p-5 flex-auto justify-center">
                                    {submited === false ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-red-400 mx-auto " viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-green-400 mx-auto" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                        </svg>
                                    }
                                    {!submited && <h2 className="text-xl text-red-400 pt-4 ">Error in Registeration !</h2>}
                                    {submited && <h2 className="text-xl text-green-400 pt-4 ">Successfully Registered !!</h2>}
                                    {submited && <h2 className="text-sm text-gray-500 ">Thanks for registering yourself, now go back and login for ordering products, Have a nice day !</h2>}
                                    {!submited && <p className="text-sm text-gray-500 px-8"> {error_message && userMessage()} </p>}
                                </div>
                                <div className="pb-3 px-3 justify-end mt-2 text-center space-x-4 md:block">
                                    {submited && <button onClick={()=> this.props.history.push({pathname: '/dashboard', state: {id: resdata.id} })} className="mb-2 bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Dashboard</button>}
                                    {!submited && <button onClick={(e) => { this.setState({ confirm: false }) || this.submitHandler(e) }} className="mb-2  bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Retry</button>}
                                    {!submited && <button onClick={() => { this.setState(this.intialstate) }} className="mb-2  bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Cancle</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Register;
