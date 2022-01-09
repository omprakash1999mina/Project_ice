import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Loader from '../components/Loader';
const  API_URL = process.env.REACT_APP_API_URL;

let error_message ;
let alreadyLogin = false;
let res_error;
function userMessage(){
    error_message=`* ${res_error} please try again with correct details and if forgot then  reset your email or password  !!`;
    return error_message;
}

let _id ='errorinid';

class Login extends Component {
    constructor(props) {
        super(props)
        window.scrollTo(0,0);
        this.state = { email: '', password: '', loading: false }
        
        try{
            const { id } = JSON.parse(window.localStorage.getItem('userSetting'));
            _id = id;
            alreadyLogin = true;
            // console.log(_id)
        }catch(err){
            // console.log("currently not logged in")
            alreadyLogin = false;
            
        }
    }

    submitHandler = (e) =>{
        e.preventDefault();
        // console.log(this.state);
        // this.setState({loading: true})
        const config = {
            headers: {
                'Content-Type': 'application/json'
                
            }
        }
        
        try{
            const data = {
                email: this.state.email,
                password: this.state.password,
            }

        axios.post(API_URL+"login", data, config)
        .then(response => {
            error_message = 0;
            
            // console.log(response.data);
            const resdata = {
                atoken:  response.data.access_token,
                rtoken: response.data.refresh_token,
                id    :    response.data.id
            }
            const userSetting = JSON.stringify(resdata);
            // console.log(userSetting)
            window.localStorage.setItem('userSetting',userSetting);
           
            this.props.history.push({
                pathname: '/dashboard',
                state: {id: resdata.id} 
                
            }) 
     
        })
        .catch(error =>{
            console.log(error)
            if(!error.response){
                this.props.history.push({
                    pathname: '/error',
                })
            }
            
            if(error.response){
                console.log(error.response);
                // const error_message = error.response.data.message;
                // console.log("in error response block")
                const obj2 =  {}
                error_message=1;
                setTimeout(() => {
                    this.setState(obj2);

                }, 10);
                res_error = error.response.data.message;
                console.log(error.response.data.message);
                // console.log(error.response.headers);
                
            }
           
        })
    }catch(err){ 
        console.log("failed to login")    
    }

       
    }
      changeHandler = (e) =>{
        this.setState( {[e.target.name]: e.target.value} );  
      }
   

    render() {
        const {email , password, loading,} = this.state;
    
        return (
        <>
        {loading === true ?  <Loader/>  :
        <div className="lg:flex ">
            {/* <div className="lg:w-1/2 xl:max-w-screen-sm"> */}
            <div className=" pt-32 pb-12 lg:pb-0 lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <h2 className="text-center text-4xl text-gray-900 font-display font-semibold lg:text-center xl:text-5xl xl:text-bold">Log in</h2>
                    <div className="mt-12">
                        <form  onSubmit={this.submitHandler}>
                        <div className="py-2 text-red-600 ">
                            {error_message===1 ? userMessage():""}
                        </div>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" name="email" value={email} onChange={this.changeHandler} placeholder="example@gmail.com"/>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <Link to="/resetpassword" className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                            Forgot Password ?
                                        </Link>
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="password" value={password} onChange={this.changeHandler} placeholder="Enter your password"/>
                            </div>
                            <div className="mt-10">
                                <button  className="bg-gray-700 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-gray-800
                                shadow-lg" type="submit">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-500 text-center">
                            Don't have an account ? <Link to="/register" className="cursor-pointer text-indigo-700 hover:text-gray-800">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            
            
                <div className="hidden pt-32 lg:flex items-center justify-center bg-gray-100 flex-1 h-screen">
                    <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
                        <svg className="w-5/6 mx-auto" xmlns="http://www.w3.org/2000/svg" id="f080dbb7-9b2b-439b-a118-60b91c514f72" data-name="Layer 1" viewBox="0 0 528.71721 699.76785">
                            <title>Login</title>
                            <rect y="17.06342" width="444" height="657" fill="#535461"/>
                            <polygon points="323 691.063 0 674.063 0 17.063 323 0.063 323 691.063" fill="#7f9cf5"/>
                            <circle cx="296" cy="377.06342" r="4" fill="#535461"/>
                            <polygon points="296 377.66 298.773 382.463 301.545 387.265 296 387.265 290.455 387.265 293.227 382.463 296 377.66" fill="#535461"/>
                            <polygon points="337 691.063 317.217 691 318 0.063 337 0.063 337 691.063" fill="#7f9cf5"/>
                            <g opacity="0.1">
                            <polygon points="337.217 691 317.217 691 318.217 0 337.217 0 337.217 691" fill="#fff"/>
                            </g>
                            <circle cx="296" cy="348.06342" r="13" opacity="0.1"/>
                            <circle cx="296" cy="346.06342" r="13" fill="#535461"/>
                            <line x1="52.81943" y1="16.10799" x2="52.81943" y2="677.15616" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" opacity="0.1"/>
                            <line x1="109.81943" y1="12.10799" x2="109.81943" y2="679.15616" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" opacity="0.1"/>
                            <line x1="166.81943" y1="9.10799" x2="166.81943" y2="683" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" opacity="0.1"/>
                            <line x1="223.81943" y1="6.10799" x2="223.81943" y2="687.15616" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" opacity="0.1"/>
                            <line x1="280.81943" y1="3.10799" x2="280.81943" y2="688" fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" opacity="0.1"/>
                            <ellipse cx="463.21721" cy="95.32341" rx="39.5" ry="37" fill="#2f2e41"/>
                            <path d="M683.8586,425.93948l-10,14s-48,10-30,25,44-14,44-14l14-18Z" transform="translate(-335.6414 -100.11607)" fill="#ffb8b8"/>
                            <path d="M735.8586,266.93948s-13,0-16,18-6,78-6,78-42,55-35,62,15,20,20,18,48-61,48-61Z" transform="translate(-335.6414 -100.11607)" fill="#7f9cf5"/>
                            <path d="M735.8586,266.93948s-13,0-16,18-6,78-6,78-42,55-35,62,15,20,20,18,48-61,48-61Z" transform="translate(-335.6414 -100.11607)" opacity="0.1"/>
                            <path d="M775.8586,215.93948s-1,39-13,41-8,15-8,15,39,23,65,0l5-12s-18-13-10-31Z" transform="translate(-335.6414 -100.11607)" fill="#ffb8b8"/>
                            <path d="M708.8586,455.93948s-59,110-37,144,55,104,60,104,33-14,31-23-32-76-40-82-4-22-3-23,34-54,34-54-1,84,3,97-1,106,4,110,28,11,32,5,16-97,8-118l15-144Z" transform="translate(-335.6414 -100.11607)" fill="#2f2e41"/>
                            <path d="M762.8586,722.93948l-25,46s-36,26-11,30,40-6,40-6l22-16v-46Z" transform="translate(-335.6414 -100.11607)" fill="#2f2e41"/>
                            <path d="M728.8586,696.93948l13,31s5,13,0,16-19,21-10,23a29.29979,29.29979,0,0,0,5.49538.5463,55.56592,55.56592,0,0,0,40.39768-16.43936l8.10694-8.10694s-27.77007-63.94827-27.385-63.47414S728.8586,696.93948,728.8586,696.93948Z" transform="translate(-335.6414 -100.11607)" fill="#2f2e41"/>
                            <circle cx="465.21721" cy="105.82341" r="34" fill="#ffb8b8"/>
                            <path d="M820.3586,253.43948l-10.5,10.5s-32,12-47,0c0,0,5.5-11.5,5.5-10.5s-43.5,7.5-47.5,25.5,3,49,3,49-28,132-17,135,114,28,113,9,8-97,8-97l35-67s-5-22-17-29S820.3586,253.43948,820.3586,253.43948Z" transform="translate(-335.6414 -100.11607)" fill="#7f9cf5"/>
                            <path d="M775.8586,448.93948l-13,8s-50,34-24,40,41-24,41-24l10-12Z" transform="translate(-335.6414 -100.11607)" fill="#ffb8b8"/>
                            <path d="M849.8586,301.93948l9,9s6,84-6,101-67,63-70,60-22-18-18-20,57.18287-57.56942,57.18287-57.56942l-4.18287-77.43058Z" transform="translate(-335.6414 -100.11607)" opacity="0.1"/>
                            <path d="M853.8586,298.93948l9,9s6,84-6,101-67,63-70,60-22-18-18-20,57.18287-57.56942,57.18287-57.56942l-4.18287-77.43058Z" transform="translate(-335.6414 -100.11607)" fill="#7f9cf5"/>
                            <path d="M786.797,157.64461s-11.5575-4.20273-27.31774,4.72807l8.40546,2.10136s-12.60819,1.05068-14.18421,17.8616h5.77875s-3.67739,14.70955,0,18.91228l2.364-4.4654,6.82943,13.65887,1.576-6.82944,3.15205,1.05069,2.10137-11.03217s5.25341,7.88012,9.45614,8.40546V195.2065s11.5575,13.13352,15.23489,12.60818l-5.25341-7.35477,7.35477,1.576-3.152-5.25341,18.91228,5.25341-4.20273-5.25341,13.13352,4.20273,6.3041,2.6267s8.9308-20.4883-3.67739-34.67251S798.61712,151.60318,786.797,157.64461Z" transform="translate(-335.6414 -100.11607)" fill="#2f2e41"/>
                        </svg>
                    </div>
                </div>

                {  alreadyLogin &&
                    <div  className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"   id="modal-id">
                        <div className="absolute shadow-2xl rounded-2xl ">
                        <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">
                        
                            <div className="text-center p-5 flex-auto justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-gray-500 mx-auto" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                    <h2 className="text-xl font-bold py-4 ">You are Already Login !!</h2> 
                                    <p className="text-sm text-gray-500 px-8 pb-4">Just want to go to the profile page click here Down-below</p>
                                    <Link to={ { pathname: '/dashboard', state: {id: _id}  } } className="bg-gray-500 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-gray-600">Go Back to Profile</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                }
            </div>

            }
        </>

        )
    }
}

export default Login;


