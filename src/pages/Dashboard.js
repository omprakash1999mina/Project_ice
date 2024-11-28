import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from '../AdminContext';
import { useLocation } from 'react-router-dom';
import Loader from "../components/Loader";
import NotAuthorized from "../components/NotAuthorized";
import axios from "axios";
import utils from "../utils";
import { useSnackbar } from 'notistack';
const API_URL = process.env.REACT_APP_API_URL;

let id;
let img_error = true;

const Dashboard = props => {
    const { role, setRole } = useContext(AdminContext);
    let _role = { ...role };
    const { history } = props;
    const [data, setdata] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        window.scrollTo(0, 0);
        getalldata();
    }, []);

    try {
        const location = useLocation();
        // console.log(location.state);
        if (location.state.id) {
            id = location.state.id;
        }
    } catch (error) {
        console.log(error)
        id = 'error';
        props.history.push({ pathname: '/notauthorized', error: error });
    }

    const getalldata = () => {
        try {
            const userData = JSON.parse(window.localStorage.getItem('userSetting'));
            let access_token = userData.atoken;
            const config = {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            }

            axios.get(API_URL + 'users/' + id, config)
                .then(response => {
                    if (response.data.role === 'admin') {
                        _role = 'admin';
                        setRole(_role);
                    }
                    const data = response.data;
                    setdata(data);
                })
                .catch(async (error) => {
                    // console.log(error);
                    if (error.response && error.response.status === 401) {
                        access_token = await utils.getNewAccessToken(userData.rtoken)
                        const resdata = {
                            atoken: access_token
                        }
                        const userSetting = JSON.stringify(resdata);
                        window.localStorage.setItem('userSetting', userSetting);

                        if (!access_token) {
                            enqueueSnackbar("Session expire please login again !", {
                                variant: 'error',
                            });
                        }
                        getalldata();
                    }
                    else {
                        enqueueSnackbar("Error accured server under Maintenance !", {
                            variant: 'error',
                        });
                        props.history.push({ pathname: '/maintenance', error: error });
                    }
                });
        } catch (error) {
            console.log(error)
            props.history.push({ pathname: '/notauthorized', error: error });
        }
    }

    function handlelogout(e) {
        e.preventDefault();
        try {
            let res_error;
            const { rtoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            axios.post(API_URL + 'logout', { refresh_token: rtoken }, { headers: { 'Content-Type': 'application/json' } })
                .then(response => {
                    res_error = false;
                    _role = 'customer';
                    setRole(_role);
                    setdata(false);
                    history.replace();
                    id = 'error';
                    if (res_error === false) {
                        props.history.push({
                            pathname: '/',
                        })
                        window.localStorage.clear();
                    }
                })
                .catch(error => {
                    if (error.response) {
                        res_error = true;
                        console.log(error.response);
                        window.localStorage.clear();
                    }
                    props.history.push({ pathname: '/notauthorized', error: error });
                })
        } catch (error) {
            console.log(error)
            props.history.push({ pathname: '/notauthorized', error: error });
        }
    }
    if (data.image) {
        img_error = false;
    }


    return (
        <>
            {!data && <Loader />}
            {!id ? <NotAuthorized />
                : <div>
                    <div className="flex flex-wrap justify-center pt-20 ">
                        <div className="mt-1 flex items-center">
                            <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                                {img_error === false ?
                                    <img className="rounded-full border border-gray-100" src={data.image} alt="Profile pic" />
                                    :
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                }
                            </span>
                        </div>
                    </div>

                    <form >
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-2 mx-auto">
                                <div className="flex flex-col text-center w-full mb-20">
                                    <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">Profile Details</h2>
                                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome {data.name} this is your profile</h1>
                                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Apparently, ice cream contains vitamin K, which prevents blood clotting. Let's not forget that ice cream also contains niacin, thiamine, and riboflavin. Not only does ice cream have nutritional value, but it also is an incredible source of energy.</p>
                                </div>
                                <div className="flex lg:flex-row flex-col">
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-b-2 border-t-2 lg:border-t-0 lg:border-b-0 lg:border-l-2 border-gray-200 border-opacity-60">
                                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Name </h2>
                                        <p className="leading-relaxed text-base mb-4">{data.name}</p>
                                    </div>
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-b-2 lg:border-l-2 lg:border-b-0 border-gray-200 border-opacity-60">
                                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Gender</h2>
                                        <p className="leading-relaxed text-base mb-4">{data.gender}</p>
                                    </div>
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-b-2 lg:border-l-2 lg:border-b-0 border-gray-200 border-opacity-60">
                                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Age</h2>
                                        <p className="leading-relaxed text-base mb-4">{data.age}</p>
                                    </div>
                                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-b-2 lg:border-l-2 lg:border-b-0 border-gray-200 border-opacity-60">
                                        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Email -Id</h2>
                                        <p className="leading-relaxed text-base mb-4">{data.email}</p>
                                    </div>
                                </div>
                                <section className='flex flex-wrap justify-center md:px-4  mt-10 md:mt-16' >
                                    <button onClick={handlelogout} className="md:m-8 m-4 text-white bg-green-500 border-0 py-2 md:px-8 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"> Logout </button>
                                    <button onClick={() => props.history.push({ pathname: '/updateprofile', state: { id: id } })} className="md:m-8 m-4 text-white bg-green-500 border-0 py-2 md:px-8 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Edit</button>
                                    {role === 'admin' && <button onClick={() => props.history.push('/admin')} className="md:m-8 m-4 text-white bg-green-500 border-0 py-2 md:px-8 px-4 focus:outline-none hover:bg-green-600 rounded text-lg"> Admin-Panel </button>}

                                </section>
                            </div>
                        </section>


                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
                                <div className="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                                    <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">Footprints</h2>
                                    <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900">Explore other options for you here</h1>
                                </div>
                                <div className="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                                    <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                                            <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                                        </svg>
                                        <span className="ml-4 flex items-start flex-col leading-none">
                                            <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
                                            <span className="title-font font-medium">Google Play</span>
                                        </span>
                                    </button>
                                    <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                                            <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                                            <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                                        </svg>
                                        <span className="ml-4 flex items-start flex-col leading-none">
                                            <span className="text-xs text-gray-600 mb-1">Download on the</span>
                                            <span className="title-font font-medium">App Store</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </section>

                    </form>
                </div>

            }
        </>


    )



}

export default Dashboard;
