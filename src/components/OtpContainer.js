import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, userOTP } from '../states/User/UserSlice';
import { useHistory } from "react-router-dom";

const OtpContainer = ({ state }) => {
    const history = useHistory();
    const { setShowPass, setShowOTP } = state;
    const [counter, setCounter] = React.useState(59);
    const [processing, setProcessing] = React.useState(false);
    const userData = useSelector(getUser);
    const dispatch = useDispatch();
    const allInputs = ["first", "second", "third", "fourth", "fifth", "sixth"]

    const handleResend = (e) => {
        e.preventDefault()
        if (!counter) {
            history.push("/resetpassword");
            setShowOTP(false);
        }
    }

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        setProcessing(true);
        let otp = null;
        allInputs.forEach((key, index) => {
            if (index === 0) {
                otp = document.getElementById(key).value;
            }
            else {
                otp = otp + document.getElementById(key).value;
            }
        });
        if (otp > 99999) {
            dispatch(userOTP(otp));
            setShowPass(true);
            setShowOTP(false);
        }
        setProcessing(false);
    }

    React.useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter])
    const handleChange = (key) => {
        const child = document.getElementById(key)
        child.focus()
    }
    // render() {
    return (
        <div className="pt-32 w-full sm:min-w-screen bg-gray-100 bg-opacity-0 sm:bg-opacity-50 sm:h-screen animated fadeIn faster  sm:fixed  sm:left-0 sm:top-0 flex justify-center items-center sm:inset-0 sm:z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            < div className="my-2 mx-4 w-full absolute sm:shadow-2xl sm:rounded-2xl " >
                <div className="w-full max-w-lg p-5 relative mx-auto my-auto sm:rounded-2xl sm:shadow-2xl bg-white ">

                    {/* <div className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id"> */}
                    {/* <div className="m-3 sm:my-2 sm:mx-4 absolute shadow-2xl rounded-2xl ">
                <div className="w-full max-w-lg p-2 sm:p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white "> */}

                    <form className="text-center py-2 sm:p-5 flex-auto justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-12 h-12 sm:w-16 sm:h-16 flex items-center text-gray-500 mx-auto" viewBox="0 0 16 16">
                            <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z" />
                        </svg>
                        <h2 className="text-xl font-bold py-4 ">OTP Verification</h2>
                        <p className="text-sm sm:text-sm text-gray-500 px-8 pb-2">We've sent the OTP to your Email({userData.userEmail})</p>
                        <div className="flex flex-row justify-center text-center px-2 py-2">
                            <input required type='tel' onChange={() => handleChange("second")} className="m-2 border-2 border-gray-300 h-8 w-8 sm:h-10 sm:w-10 text-center form-control rounded" id="first" maxLength="1" />
                            <input required type='tel' onChange={() => handleChange("third")} className="m-2 border-2 border-gray-300  h-8 w-8 sm:h-10 sm:w-10 text-center form-control rounded" id="second" maxLength="1" />
                            <input required type='tel' onChange={() => handleChange("fourth")} className="m-2 border-2 border-gray-300 h-8 w-8 sm:h-10 sm:w-10 text-center form-control rounded" id="third" maxLength="1" />
                            <input required type='tel' onChange={() => handleChange("fifth")} className="m-2 border-2 border-gray-300  h-8 w-8 sm:h-10 sm:w-10 text-center form-control rounded" id="fourth" maxLength="1" />
                            <input required type='tel' onChange={() => handleChange("sixth")} className="m-2 border-2 border-gray-300  h-8 w-8 sm:h-10 sm:w-10 text-center form-control rounded" id="fifth" maxLength="1" />
                            <input required type='tel' onChange={() => handleChange("sixth")} className="m-2 border-2 border-gray-300  h-8 w-8 sm:h-10 sm:w-10 text-center form-control rounded" id="sixth" maxLength="1" />
                        </div>
                        {processing ?
                            <div className="flex items-center justify-center">
                                <button type="button" className="inline-flex items-center justify-center mt-4 px2 py-2 w-11/12 sm:w-4/5 bg-gray-500 border border-white text-sm sm:text-base shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-600 cursor-not-allowed" disabled="">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </button>
                            </div>
                            :
                            <button type='submit' onClick={(e) => handleVerifyOtp(e)} className="mt-4 px2 py-2 w-11/12 sm:w-4/5 bg-gray-600 border border-white text-sm sm:text-base shadow-md font-medium tracking-wider text-white rounded-lg hover:shadow-lg hover:bg-gray-700">Next</button>
                        }
                        <p className="text-xs sm:text-sm text-gray-500 px-8 py-2">If you did'nt get the email, ask to <span onClick={(e) => handleResend(e)} className={`${counter ? 'cursor-not-allowed' : 'cursor-pointer'} outline-none outline-0 text-indigo-400`} >Resend</span> OTP <div className="inline-flex text-indigo-400"> {counter > 0 && (counter >= 10 ? `After 00:${counter}s` : `After 00:0${counter}s`)} </div></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OtpContainer;