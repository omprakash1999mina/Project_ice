import React, { Component } from 'react';
import Products from '../../components/Products';
import Menubar from './Menubar';

class ProductsList extends Component {
  constructor(props) {
      super(props)
      window.scrollTo(0,0);
      console.log(this.props)
      try{
        const role = window.localStorage.getItem('Role');
          if( ( role !=='admin' || this.props.location.state.id !=="adminProducts" ) && this.props.location.state.id !=="addProductsPageReturn" ){
              this.props.history.push({
            pathname: '/notAuthorized',
            }) 
        }
    }catch(err){
        this.props.history.push({ pathname: '/notAuthorized', })
    }
    

  }
   
    render() {
        return (
                <div className="flex pt-16 bg-gradient-to-r from-gray-700 via-gray-900 to-gray-600 flex-col md:flex-row">
                    <Menubar/>

                    <div id="adminpanel" className="main-content flex-1 ">
                        
                        <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 pt-4 px-4 shadow text-2xl text-white">
                            <h3 className="font-bold pl-2">Products</h3>
                        </div>
                        <div className=" bg-gradient-to-r from-blue-900 to-gray-800 text-center pb-4 shadow text-2xl text-green">
                               <button onClick={(e)=> this.props.history.push({ pathname: '/admin/addproducts', state: {id: "adminAddNewProducts"} })} className="transform motion-safe motion-reduce:transform-none hover:scale-110 rounded-full  hover:text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white inline-flex items-center justify-center p-2 bg-green-300  font-bold px-4 ">Add New Product</button>
                        </div>
    
                       
    
                            {/* <!--Table Card--> */}


                            <div className="flex bg-white flex-wrap">
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Total Products</h5>
                                            <h3 className="font-bold text-3xl">1208 <span className="text-green-500"><i className="fas fa-caret-up"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-pink-600"><i className="fas fa-users fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Best selled</h5>
                                            <h3 className="font-bold text-3xl">Vadilal <span className="text-pink-500"><i class="fa-solid fa-burger-glass"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                {/* <!--Metric Card--> */}
                                <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-5">
                                    <div className="flex flex-row items-center">
                                        <div className="flex-shrink pr-4">
                                            <div className="rounded-full p-5 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-inverse"></i></div>
                                        </div>
                                        <div className="flex-1 text-right md:text-center">
                                            <h5 className="font-bold uppercase text-gray-600">Least selled</h5>
                                            <h3 className="font-bold text-3xl">Creambell <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/Metric Card--> */}
                            </div>
                           
                        </div>
                        <div className="bg-white pb-24">
                            <Products />
                        </div>
    
                    </div>
        </div>

        )
    }
    
}
export default ProductsList;
