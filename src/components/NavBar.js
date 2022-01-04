import { Link , NavLink } from 'react-router-dom';
import axios from "axios";
import { useHistory } from 'react-router';
import { CartContext } from '../CartContext';
import { AdminContext } from '../AdminContext';
import React, { useState, useRef,useEffect , useContext } from 'react';
const  API_URL = process.env.REACT_APP_API_URL;

const NavBar = props => {
    // const { history } = props;
  
    // console.log(props)
    const history = useHistory();
    const ref = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    // const ref = createRef();
    
    const [isLogin, setIsLogin] = useState(false);
    // console.log(isLogin);
    const [dropdownActivent, setDropdownActivent] = useState(false);
    const [dropdownActivest, setDropdownActivest] = useState(false);
    const [dropdownActivemb, setDropdownActivemb] = useState(false);
    const { role, setRole} = useContext(AdminContext);
    const { cart } = useContext(CartContext);

    // console.log(role);

    let _role = role; // { items: {}}
    let _id ='errorinid';

    try{
        const { id } = JSON.parse(window.localStorage.getItem('userSetting'));
        _id = id;
        // console.log(_id)
    }catch(err){
        // console.log("currently not logged in")

    }


    const dropdownhandler = (event,btn) =>{
        // console.log(e)
        if(btn === 'nt') { setDropdownActivent( !dropdownActivent ) }
        if(btn === 'mb') { setDropdownActivemb( !dropdownActivemb ) }
        if(btn === 'st') {  setDropdownActivest (!dropdownActivest ) }
        
        try{
            const { atoken } = JSON.parse(window.localStorage.getItem('userSetting'));
            if(atoken){ setIsLogin(true) };

        }catch(e){
            // console.log('not login')
            setIsLogin(false)
        }

    }

const shareHandler = () => {
    const url = window.location.href;
    // document.execCommand('copy');
    // window.Clipboard.setCopy();
    // window.clipboardData.setData("Text",url);
    // navigator.clipboard.writeText(url);
    setDropdownActivest (false)
    window.navigator.share({url: url, text: "Royal_IITian's Project "})
    // console.log(url);
    // setCopy(true);

}
    const handlelogout = (e)=> {
        e.preventDefault();

        const { rtoken } = JSON.parse(window.localStorage.getItem('userSetting'));
        // console.log(rtoken)

        axios.post(API_URL+'logout',{ refresh_token: rtoken  },{  headers: {  'Content-Type': 'application/json' }  })
        .then(response => {
            // console.log(response);
            try {
               history.push({
                        pathname: '/', 
                 })
                
            } catch (error) {
                console.log(error)
            }
            
            _role='customer';
            window.localStorage.clear();
            // console.log("under the histroy push")
            
            setRole(_role);
            setIsLogin(false);
            setDropdownActivest (false)
            // console.log('under the last')
            try {
                history.replace();
                
            } catch (error) {
                console.log(error)
            }

        })
        .catch(error =>{
            if(error.response){
                // res_error = true;
                setIsLogin(true);
                setDropdownActivest (!dropdownActivest )
                // console.log(error.response.status);
                console.log("error response : " + error.response);
                // const error_message = error.response.data.message;
                
                // console.log(error.response.headers);
                
            }
        })  

    }
   
        useEffect(() => {
            const checkIfClickedOutside = (e) => {
              // If the menu is open and the clicked target is not within the menu,
              // then close the menu
              if ( ref.current && !ref.current.contains(e.target)) {
                setDropdownActivest (false);
              }
              if ( ref2.current && !ref2.current.contains(e.target)) {
                setDropdownActivemb (false);
              }
              if ( ref3.current && !ref3.current.contains(e.target)) {
                setDropdownActivent (false);
              }
        
            }
            // console.log('nav update')
            // checkIfClickedOutside();
            document.addEventListener("mousedown", checkIfClickedOutside);
            return () => {
              // Cleanup the event listener
              document.removeEventListener("mousedown", checkIfClickedOutside)
            }
        }, [ ref, ref2, ref3])

    return (
        <>

                <nav className=" bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 fixed top-0 left-0 right-0 z-50">
                    <div className="relative flex items-center justify-center sm:justify-between h-16">
                        <div ref={ref2} className='sm:hidden inline-block absolute left-0'>
                            {/* <!-- Mobile menu button--> */}
                            <div className="flex mx-2 items-center sm:hidden">
                                <button type="button" onClick={(e)=> { dropdownhandler( e,'mb') } } className="inline-flex border border-gray-500 items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Menu</span>
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><title>Menu</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                </button>
                            </div>
                            {/* <div class="relative mx-4 inline-block lg:hidden">
                                <button onClick={(e)=> { dropdownhandler( e,'mb') } } class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
                                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                                </button>
                            </div> */}

                            
                        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                            {  dropdownActivemb &&
                                <div className="absolute left-0 top-12 w-screen bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600" >
                                    <div className="sm:hidden py-1" id="mobile-menu">
                                            <div className="px-2 pt-2 pb-3 space-y-1">
                                            <NavLink activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium" exact to={"/"} onClick={()=>setDropdownActivemb(false) } className="text-gray-300 active:bg-blue-700 hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-base font-medium">Home</NavLink>
                                            <NavLink activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium" to={"/login"} onClick={()=> setDropdownActivemb(false) } className="text-gray-300 active:bg-blue-700 hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-base font-medium">Login</NavLink>
                                            <NavLink activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium" to={"/register"} onClick={()=> setDropdownActivemb(false) } className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-base font-medium">SignUP</NavLink>
                                            {
                                                
                                                _role === 'admin' ?  <NavLink  to={'/admin'} onClick={() => setDropdownActivemb(false) } activeClassName ="bg-gray-900 text-white px-3 py-2 block rounded-lg text-sm font-medium"  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-base font-medium">Admin</NavLink>
                                                : <NavLink onClick={(e)=> e.preventDefault() }  to='#'  className=" opacity-50 cursor-not-allowed  text-gray-300  px-3 py-2 block rounded-md text-base font-medium">Admin</NavLink>
                                                
                                            }
                                            </div>
                                        </div>
                                </div>
                            }
                        </div>

                            
                            
                            <div className="flex items-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center  mr-2 sm:items-stretch sm:justify-start ">
                                            <Link to= "/">
                                                <img className='h-16 block w-auto' src="/images/logo3.ico" alt="logo" />
                                            </Link>
                                        </div>
                                        <NavLink activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium" exact to="/" className="text-gray-300 active:bg-blue-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            
                                        <NavLink activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium" to="/login" className="text-gray-300 active:bg-blue-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
                            
                                        <NavLink activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium" to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">SignUP</NavLink>
                                        {
                                            
                                            _role === 'admin' ?  <NavLink  to={'/admin'} activeClassName ="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium"  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin</NavLink>
                                            : <NavLink onClick={(e)=> e.preventDefault() }  to='#'  className=" opacity-50 cursor-not-allowed  text-gray-300  px-3 py-2 rounded-md text-sm font-medium">Admin</NavLink>
                                            
                                        }
                                    </div>
                                </div>     
                            </div>
                            
                            <div className="flex items-center sm:hidden  mr-2 sm:items-stretch sm:justify-start ">
                                <Link to= "/">
                                    <img className='h-16 block w-auto' src="/images/logo3.ico" alt="logo" />
                                </Link>
                                {/* <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                                <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/> */}
                            </div>


                            <div className=" flex items-center justify-between sm:items-stretch sm:justify-end">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:ml-6 sm:pr-0">
                                <div ref={ref3} className="relative hidden sm:block  text-left">
                                
                                    <button onClick={(e)=> { dropdownhandler(e,'nt') } } className="bg-gray-800 p-1 mx-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">View notifications</span>
                                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-300" ></div>
                                        <div className="absolute animate-ping top-0 right-0 w-2 h-2 rounded-full bg-green-300" ></div>
                                        <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </button>

                                    { dropdownActivent  &&  
                                    
                                    <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            <span className="sr-only">View notifications</span>
                                            <span  className="text-gray-700 block px-4 border-b-2 border-bg-gray-200 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">New Offer for you </span>
                                            <span  className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">On buying 3 products you got a additional product free under Rs.500</span>

                                        </div>
                                    </div>
                                    
                                    }

                                </div>

                                    <div className="relative inline-block text-left">
                                            <Link to="/cart">
                                                <div className='flex bg-gray-800 p-1 mx-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                                    <span className='mx-2'>{ cart.totalItems ? cart.totalItems : 0 }</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                                    </svg>
                                                    {/* <img className="ml-2" src="/images/cart.png" alt="cart-icon" /> */}
                                                </div>
                                            </Link>
                                    </div>
                                    
                                <div ref={ref} className="relative inline-block text-left mr-4">
                                        <button onClick={(e)=> { dropdownhandler( e,'st') } } className="bg-gray-800 p-1 mx-2 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="hover:animate-spin" viewBox="0 0 16 16">
                                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                            </svg>
                                        </button>

                                    { dropdownActivest &&   
                                     
                                    <div className="origin-top-right absolute right-0 ml-4 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                            {  _role === 'admin' &&  <span className="text-center text-green-700 block border-b-2 border-bg-gray-300 px-4 py-2 text-sm" >Admin*</span> }
                                            {  _role !== 'admin' && <span className="text-center text-green-700 block border-b-2 border-bg-gray-300 px-4 py-2 text-sm" >Controls</span> }
                                            {/* <br/> */}
                                            { isLogin === true && <Link to={ { pathname: '/dashboard', state: {id: _id}  } } onClick={ ()=> setDropdownActivest(false) } className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Profile</Link> }
                                            <Link to="/support" onClick={()=> setDropdownActivest(false) } className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Support</Link>
                                            <Link to="#"  className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">License</Link>
                                            <Link to="#" onClick={shareHandler} className=" text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Share </Link>
                                            { isLogin === false &&<Link to={'/login'} onClick={()=> setDropdownActivest(false) } className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-4">Login</Link> }
                                            <Link to="#"  className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-5">Download App</Link>
                                            { isLogin === true && 
                                                <button   onClick={(e)=> handlelogout(e) } className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                                                Sign out
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    
                                    }
                                    
                                </div>
                            </div>
                            </div>
                            </div>
                        
                            
                            
                            


                        </nav>


        </>
    )
    }

// } 
export default NavBar;

