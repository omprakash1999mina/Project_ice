import { Link } from 'react-router-dom';
import Analytics from './Admin/Analytics';
import React, { Component } from 'react';


let role = 'customer';

class Admin extends Component {
   constructor(props) {
       super(props)
       try{
        // const data = JSON.parse(window.localStorage.getItem('Role'));
        role = window.localStorage.getItem('Role');
        // console.log("admin page role : " +role)
        // console.log(props)
        if( role !=='admin'  ){
            this.props.history.push({
                pathname: '/notAuthorized',
            }) 
          }
        }catch(err){
            this.props.history.push({
                pathname: '/notAuthorized',
                })
        }

     this.state={
        id: 'adminProducts',
     }
       
   }
//    handleClick=()=>{
//        try{
//         this.props.history.push({
//             pathname: '/admin/addproducts',
//             state: {id: "adminAddNewProducts"} 
    
//         })
//        }catch(e){
//         console.log("error in try block")
//        }
     
// }

handleProductClick=()=>{
           
    this.props.history.push({
        pathname: '/admin/addproducts',
        state: {id: "adminAddNewProducts"}

    })
   
 
}
handleClick=(BtnNo,e)=>{
    // console.log(BtnNo)
           if(BtnNo === '1'){
               this.props.history.push({
                   pathname: '/admin/products',
                   data: {id: "adminProducts"} 
           
               }) 
           }
           if(BtnNo === '4'){

               this.props.history.push({
                   pathname: '/admin/analytics',
                   state: {id: "adminAnalytics"} 
           
               })
           }
           if(BtnNo === '3'){

               this.props.history.push({
                   pathname: '/admin/payments',
                   state: {id: "adminPaymentsDeatils"} 
           
               })
           }
           if(BtnNo === '2'){

               this.props.history.push({
                   pathname: '/admin/messages',
                   state: {id: "adminMessages"} 
           
               })
           }
   
 
}

    render() {
        
//     }
// }



// const Admin = () => {
        // const [key,setKey] = useState('key');
        // useEffect(() => {
        //     return console.log(key);
        // }, [key])
   
            // console.log(key)

            // function change(value) {
            //     setKey(value);  
            //   }

            


    return (
        <>
        
            <div className="flex bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">

                <div className='relative'>
                <div className="bg-gray-800  shadow-xl md:relative z-10 w-full md:w-48">

                    <div className="md:w-48  md:fixed md:left-0  content-center md:content-start text-left justify-between">
                        <ul className="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
                            <li className="mr-3 flex-1">
                                <Link to={{pathname: '/admin/products',
                                            state: {id: "adminProducts"}}} 
                                        className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                    <i className="fas fa-tasks pr-0 md:pr-3"></i><span  className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Products</span>
                                </Link>
                            </li>
                            <li className="mr-3 flex-1">
                                <Link  to={{ pathname: '/admin/messages',
                                                state: {id: "adminMessages"}  }} className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                    <i className="fa fa-envelope pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
                                </Link>
                            </li>
                            <li className="mr-3 flex-1">
                                <Link to={{pathname: '/admin/payments',
                                            state: {id: "adminPaymentsDeatils"}}} className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                    <i className="fa fa-wallet pr-0 md:pr-3"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Payments</span>
                                </Link>
                            </li>
                            <li className="mr-3 felx-1">
                                <Link to={{pathname: '/admin/analytics',
                                            state: {id: "adminAnalytics"}}} className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
                                    <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                </Link>
                            </li>
                        </ul>
                    </div>


                </div>
                 </div>

                <div id="adminpanel" className="main-content flex-1 ">
                    
                    <Analytics/>

                    {/* {(()=> {
                        switch (key) {
                            case 'analytics':
                                console.log(key)
                               return <Analytics/> 
                                
                            case 'payments':
                                console.log(key)
                               return <Payments/> 
                                
                            case 'message':
                                console.log(key)
                               return <Message/> 
                                
                            case 'products':
                                console.log(key)
                               return <Products/> 
                                
                        
                            default:
                            return <Products/>
                                
                        }
                    })()
                        
                    } */}
                 
                    {/* <Analytics/>   */}

                </div>
                </div>

        </>
    )
 }
}

export default Admin;
