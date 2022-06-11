import React from 'react';
import axios from "axios";
import { useSnackbar } from 'notistack';
import { getUser } from '../states/User/UserSlice';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

const NewPassword = ({ state }) => {

    const { setShowPass, setShowOTP } = state;
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar(); 
    const [password, setPassword] = React.useState(false);
    const [error_password, setError_Password] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const userData = useSelector(getUser);

    const resetPassword = (e) => {
        e.preventDefault()
        setProcessing(true);
        if (password && (password === confirmPassword)) {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const data = {
                email: userData.userEmail,
                password: password,
                otp: userData.userOTP,
            }
            axios.post(API_URL + 'forgot/password', data, config)
                .then(response => {
                    setProcessing(false);
                    enqueueSnackbar("Password updated successfully", {
                        variant: 'success',
                    });
                    history.push("/login");
                })
                .catch(error => {
                    // console.log(error);
                    setProcessing(false);
                    enqueueSnackbar("Invalid OTP ", {
                        variant: 'error',
                    });
                    setShowOTP(true);
                    setShowPass(false);
                    // props.history.push({ pathname: '/maintenance', error: error });
                });
        }
        else {
            setProcessing(false);
            setError_Password(true);
        }
    }
    // render() {
    return (
        <div className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="m-3 sm:my-2 sm:mx-4 absolute shadow-2xl rounded-2xl ">
                <div className="w-full max-w-lg p-2 sm:p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">

                    <form className="text-center py-2 sm:p-5 flex-auto justify-center">
                        <img className="w-12 h-12 sm:w-16 sm:h-16 flex items-center text-gray-500 mx-auto" src={"/Forgot Password.svg"} fill="currentColor" alt='icon'></img>
                        <h2 className="text-lg sm:text-xl font-bold py-4 ">Forgot Password</h2>
                        <p className="text-xs sm:text-sm text-gray-500 px-8 pb-2">Your identity has been verified Set your New password</p>
                        <div class="w-full mb-2 flex-auto justify-center text-center ">
                            <input required onChange={(e) => { setPassword(e.target.value); setError_Password(false) }} className="w-4/5 mt-2 tex-sm sm:text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg" type="password" name="password" placeholder="New password" />
                            <input required onChange={(e) => { setConfirmPassword(e.target.value); setError_Password(false) }} className="w-4/5 mt-2 tex-sm sm:text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 rounded-lg" type="password" name="confirmPassword" placeholder="Confirm password" />
                            {error_password && <span className="w-4/5 inline-flex p-2 text-left text-red-500 text-xs sm:text-xs italic">Password mismatch</span>}
                        </div>
                        {processing ?
                            <div className="flex items-center justify-center">
                                <button type="button" className="inline-flex items-center justify-center mt-4 px2 py-2 w-4/5 bg-gray-500 border border-white text-sm sm:text-base shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-600 cursor-not-allowed" disabled="">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                            </div>
                            :
                            <button type='submit' onClick={(e) => resetPassword(e)} className="mt-4 px2 py-2 w-4/5 bg-gray-600 border border-white text-sm sm:text-base shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Create New Password</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default NewPassword