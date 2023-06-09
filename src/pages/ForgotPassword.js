import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NewPassword from '../components/NewPassword';
import OtpContainer from '../components/OtpContainer';
import { userEmail } from '../states/User/UserSlice';
import axios from "axios";
import { useSnackbar } from 'notistack';
const API_URL = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [processing, setProcessing] = React.useState(false);
    const [showOTP, setShowOTP] = React.useState(false);
    const [showPass, setShowPass] = React.useState(false);
    const [email, setEmail] = React.useState(false);
    const dispatch = useDispatch();

    const SendOtp = (e) => {
        e.preventDefault()
        setProcessing(true);
        if (!email) {
            setProcessing(false);
        }
        else {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = {
                email: email,
            }
            axios.post(API_URL + 'email/verify', data, config)
                .then(response => {
                    setProcessing(false);
                    setShowOTP(true);
                    dispatch(userEmail(email));
                    enqueueSnackbar("OTP sent successfully", {
                        variant: 'success',
                    });
                })
                .catch(error => {
                    // console.log(error);
                    enqueueSnackbar("Invalid Email address", {
                        variant: 'error',
                    });
                    setProcessing(false);
                    // props.history.push({ pathname: '/maintenance', error: error });
                });
        }
    }
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    // render() {
    return (
        <div className=" pt-32 w-full">
            {
                (!showOTP && !showPass) &&
                <div className="pt-32 w-full sm:min-w-screen bg-gray-100 bg-opacity-0 sm:bg-opacity-50 sm:h-screen animated fadeIn faster  sm:fixed  sm:left-0 sm:top-0 flex justify-center items-center sm:inset-0 sm:z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                    < div className="my-2 mx-4 w-full absolute  sm:rounded-2xl" >
                    {/* < div className="my-2 mx-4 w-full absolute sm:shadow-2xl sm:rounded-2xl " > */}
                        <div className="w-full sm:max-w-lg p-5 relative mx-auto my-auto sm:rounded-2xl sm:shadow-2xl bg-white ">

                            <form className="w-full text-center p-5 flex-auto justify-center">
                                <img className="w-16 h-16 flex items-center text-gray-500 mx-auto" src={"/Forgot Password.svg"} fill="currentColor" alt='password icon'></img>
                                <h2 className="text-xl font-bold py-4 ">Forgot Password</h2>
                                {/* <p className="text-sm text-gray-500 px-8 pb-2">Please enter the email address you'd like your password reset information sent to</p> */}
                                <p className="text-xs sm:text-sm  text-gray-500 px-8 pb-4 sm:pb-2">Please enter the email address associated with your Royal_IITians account </p>
                                <div className="flex flex-row justify-center text-center">
                                    <input required className="w-11/12 sm:w-4/5 text-sm sm:text-base p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg" type="email" name="email" onChange={(e) => handleChange(e)} placeholder="example@gmail.com" />
                                </div>
                                {processing ?
                                    <div className="flex items-center justify-center">
                                        <button type="button" className="inline-flex items-center justify-center mt-4 px2 py-2 w-11/12 sm:w-4/5 bg-gray-500 border border-white text-base shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-600 cursor-not-allowed" disabled="">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </button>
                                    </div>
                                    :
                                    <button type='submit' onClick={(e) => SendOtp(e)} className="mt-4 px2 py-2 w-11/12 sm:w-4/5 bg-gray-600 border border-white text-base shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Verify Email</button>
                                }
                                <Link to="/login" className="inline-flex px-8 py-2 text-base text-indigo-400">Back To Login</Link>
                                {/* <p className="text-sm text-gray-500 ">If you did'nt get the email, ask to <button className={`${counter && 'cursor-not-allowed'} text-indigo-400`} >Resend</button> OTP {counter > 0 && (counter >= 10 ? `After 00:${counter}s` : `After 00:0${counter}s`)}</p> */}
                            </form>
                        </div>
                    </div >
                </div >
            }
            {showOTP && <OtpContainer state={{ setShowPass, setShowOTP }} />}
            {showPass && <NewPassword state={{ setShowPass, setShowOTP }} />}
        </div>
    )
}

export default ForgotPassword;



