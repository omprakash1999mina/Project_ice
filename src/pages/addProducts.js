import React, { Component } from 'react';
import axios from "axios";


let error_message ;
let res_error;
let url = null; 
let formdata;
let role;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4YTdmODRjMThiMjE0YTRlMjBiN2MiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MjYyNDMxNjEsImV4cCI6MTY1NzgwMDc2MX0.dfkr1CTsIAh-X1yWN-puO5nXyYUJuzvWR3137Lr1p-s';

function userMessage(){
    error_message = `*  ${res_error} please try again with correct details !!`;
    return error_message;
}


class addProducts extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props.location.state.id)
        if(this.props.location.state.id !== "adminAddNewProducts" && role !=='admin'){
            this.props.history.push({
                pathname: '/notAuthorized',
            })
        }
        this.state = {
            name: '',
            price: '',
            size: '',
            currency: '',
            image: null,
            imgsrc: null,
            error_image: false,

        }
    }

    handleValidation(){
        // console.log(typeof(this.state.image))
        if(typeof(this.state.image) === "undefined" || this.state.image===null){
            this.setState({error_image: true});
            return false;
         }
         return true;

    }

      submitHandler = (e) =>{
        const API_URL = "https://apis.opdevelopers.live/api/";
        e.preventDefault();
        // console.log(this.state);
        // console.log(this.handleValidation())
        if(this.handleValidation() === true){
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }
        if(this.state.image_file !== null){
             formdata = new FormData();
            formdata.append('name', this.state.name);
            formdata.append('price', this.state.price);
            formdata.append('size', this.state.size);
            formdata.append('currency', this.state.currency);
            formdata.append('image', this.state.image);
        }

        // console the all filled deatils in formdata

            // for (var key of formdata.entries()) {
            //     console.log(key[0] + ', ' + key[1]);
            // }
        // console.log(formdata);
        // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
        axios.post(API_URL+"product", formdata, config)
        .then(response => {
            error_message = false;
            // console.log("in response block")
            this.setState({name: '', price: '', size: '', currency: '',image: null,imgsrc: null,error_image: false,})


            // console.log(response.data);
            const resdata = {
                atoken:  response.data.access_token,
                rtoken: response.data.refresh_token,

            }
            const userSetting = JSON.stringify(resdata);
            // console.log(userSetting)
            window.localStorage.setItem('userSetting',userSetting);
            
            // console.log(window.localStorage.getItem('userSetting'));
            this.props.history.push({
                pathname: '/admin/products',
                state: {id: "addProductsPageReturn"}
            }) 
            // <Dashboard id = {resdata.id}/>
        //     this.props.history.push( {pathname: "/welcome",
        //     state: { employee:"Steven" }});
        })
        .catch(error =>{
            // console.log("in error block ")
            this.setState({name: '', price: '', size: '',  currency: '',image: null,imgsrc: null,error_image: false,})
            if(error.response){
                console.log(error.response);
                // const error_message = error.response.data.message;
                const obj2 =  {}
                error_message=true;
                setTimeout(() => {
                          this.setState(obj2);
                }, 10);
                res_error = error.response.data.message
                // console.log(error.response.headers);
                
            }
           
        })

        }
       
    }
    handleImagePreview = (e) =>{
                // Assuming only image
        try{

            var file = this.refs.file.files[0];
            var reader = new FileReader();
            url = reader.readAsDataURL(file);
            
            reader.onloadend = function (e) {
                this.setState({
                    imgsrc: [reader.result],
                })
            }.bind(this);
            // console.log(url) // Would see a path?   // TODO: concat files
        }catch(err){
            // console.log(err);
            console.log("image field is Empty , Please select a image ");
        }
            
            let image_as_files = e.target.files[0]
            // this.setState({error_image: false});
            this.setState({
                image: image_as_files,
        })
        // console.log(image_as_files)
        // console.log(this.state)
    }

    backhandler = ()=>{
            this.props.history.push({
                pathname: '/admin/products',
                state: {id: "addProductsPageReturn"}
            })

    }


    changeHandler = (e) =>{
            // console.log(this.state)
            if(e.target.name === 'size'){
                 const name = e.target.name;
                const value =
                e.target.type === "checkbox" ? e.target.checked : e.target.value;
                this.setState({
                ...this.state,
                [name]: value
                })


                // if(typeof(this.state.size) === "undefined"){
                // console.log(e.target.value +"  is checked")
                // this.setState({size: e.target.checked});
                // // e.target.type === "checkbox" ? e.target.checked : e.target.value;
                // return;

                // }
                // this.setState({size: this.state.size + e.target.value});
                // console.log(e.target.checked +"  is checked")

                    
            }
            if(e.target.name !=='size'){

                this.setState( {[e.target.name]: e.target.value} );
            }

               
      }
    
    
// export const addProducts = () => {
  render() {
    const {name, price, size , currency} = this.state;
    return (

        <div className="main-content flex-1  pb-24 md:pb-5">
          
                <section className="text-gray-600  body-font">
                    <div className="container px-5 pb-24 pt-10 mx-auto flex flex-wrap items-center">
                    <div className='container w-1/2' ><h1 className="text-3xl md:text-4xl font-bold text-black mx-6"> Want to Launch new Product !</h1> 
                    {/* <h6 className="text-lg"><em>Are you hungry?</em></h6> */}
                    </div>
                    
                    {/* <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"> */}
                    {/* <div className="md:w-96 xl:w-96 p-6 "> */}
                   
                    <div className="flex flex-wrap  ">
                    

                    <div className="m-4 p-6 bg-gray-100 w-56 rounded-lg ">
                                {/* <label className="block py-4 text-sm font-bold text-gray-700"> */}
                                   <h2 className="block pb-4  font-bold text-gray-900" > Preview of Product </h2> 
                                {/* </label> */}
                                <div className="container bg-gray-100 items-center rounded-tl-3xl ">
                                <span className="inline-block h-44 w-44 rounded-lg overflow-hidden ">
                                    
                                    
                                    {   url!==null ? 
                                        <img className="object-scale-down object-center" alt="" src={this.state.imgsrc} /> 
                                        // <img alt="" src={this.state.imgsrc} /> 
                                     
                                    :
                                    // <img alt="" src="/images/images2.png" />
                                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                    </svg>
                                    // <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    //     <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    // </svg>

                                    }
                                    
                                    </span>
                                    {/* <img src={product.image} alt="pizza" /> */}
                                </div>
                            <div className="text-center">
                                <h2 className="text-lg font-bold py-2">{this.state.name !== '' ?this.state.name : "Ice-Cream" }</h2>
                                    <label className="block text-sm font-medium text-gray-700">
                                        {/* Awailable in : <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{op ? op : "type"}</span> */}
                                        Awailable in : <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{this.state.size}</span>
                                        {/* {this.state.size.forEach(element => {
                                            // console.log(element)
                                        op = element;
                                        return ele();
                                        
                                            
                                        })   
                                        
                                        }  */}
                                        
                                    </label>
                                
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span>{this.state.currency !== '' ? this.state.currency : '$' } { this.state.price !== '' ? this.state.price : '000' }</span>
                                {/* <button  onClick={(e) => { addToCart(e, product) }} className={`${   'bg-green-500': 'bg-yellow-500' } py-1 px-4 rounded-full font-bold`}>ADD{isAdding ? 'ED': ''}</button> */}
                            </div>
                            {/* <div className="flex justify-between items-center mt-4">
                                <button disabled={isAdding} onClick={(e) => { addToCart(e, product) }} className={`${ isAdding ? 'bg-green-500': 'bg-red-600' } py-1 px-4 rounded-full font-bold`}>Delete{isAdding ? 'ED': ''}</button>
                            </div> */}
                    
                </div>
                        
                        <points className="container w-1/2 py-2 pl-10">
                            <h2 className="block py-4  font-bold text-black">Important Points *</h2>
                            <ul className="list-disc">

                                <li>Image should be in png format for batter viewBox</li>
                                <li>You can select multiple sizes for product (which are Awailable)</li>
                                <li>Currency can be changed into Doller to Rupee</li>
                            </ul>
                        </points>

                </div>

                    {/* <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
                        <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
                    </div> */}


                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium text-center title-font mb-2">Add Product</h2>
                        
                        <div className="py-2 text-red-600 ">
                                {error_message===true ? userMessage():""}
                        </div>

                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Photo
                        </label>
                        <div className="mt-1 flex items-center">
                            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-300">
                            {   url!==null ? 
                                <img alt="" src={this.state.imgsrc} /> 
                            
                            :
                            
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi m-2 bi-file-earmark-image" viewBox="0 0 16 16">
                            <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                            <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"/>
                            </svg>

                            }
                            
                            </span>
                            {/* <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Change
                            </button> */}
                        </div>
                        <div className="pt-4">
                            {
                                this.state.error_image === false ?
                                
                                <input className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" ref="file" type="file" name="user[image]" multiple={true} onChange={this.handleImagePreview}   />
                                :
                            <> <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" ref="file" type="file" name="user[image]" multiple={true} onChange={this.handleImagePreview}   />
                                <p className="text-red-500 text-xs italic">Please choose a profile photo.</p> </>

                            }
                        </div>

                        </div>

                        <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                        <input type="text" value={name}  name="name" onChange={this.changeHandler}  placeholder="Name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>

                        <p>Size : 

                            {/* <div class="flex">
                                <div class="mt-2">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox" name="size" value="Cone" checked={this.state.active} onClick={this.changeHandler} />
                                        <span class="ml-2 text-sm">Cone</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" class="form-checkbox" name="size" value="Cup" onChange={this.changeHandler} />
                                        <span class="ml-2 text-sm">Cup</span>
                                    </label>
                                    <label class="flex items-center ">
                                        <input type="checkbox" class="form-checkbox"name="size" value="Family-pack" onChange={this.changeHandler} />
                                        <span class="ml-2 text-sm">Family-pack</span>
                                    </label>
                                </div>
                            </div> */}

                            <select name="size" value={size} onChange={this.changeHandler} className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                <option value="">----Select Type of Ice-cream-----</option>
                                <option value="Cone">Cone</option>
                                <option value="Cup">Cup</option>
                                <option value="bar">Ice-cream bar</option>
                                <option value="Family-pack">Family-pack</option>
                                <option value="others">Others</option>
                            </select>
                        </p>
                            {
                                this.state.size === 'others' &&
                                <div className="relative mb-4">
                                <input type="text" value={size} name="size" onChange={this.changeHandler}  placeholder="Size" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                </div>
                        }

                        <p> Currency 

                        <select name="currency" value={currency} onChange={this.changeHandler} className="w-full mb-4 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                <option value="">----Select A Currency Type-----</option>
                                <option value="$">USD($)</option>
                                <option value=" <i className='fa fa-rupee'></i> ">INR( <i className="fa fa-rupee"></i> )</option>
                                <option value="¥">JPY(¥)</option>
                                <option value="€">EUR(€)</option>
                        </select>
                        
                        </p>

                        <div className="relative mb-4">
                        <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
                        <input type="number" value={price} name="price" onChange={this.changeHandler}  placeholder="Price" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div>
  
                        
                        {/* <div className="relative mb-4">
                        <label htmlFor="currency" className="leading-7 text-sm text-gray-600">currency</label>
                        <input type="currency" value={currency} name="currency" onChange={this.changeHandler}  placeholder="Enter your currency" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div> */}
                        
                        {/* <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" value={email} name="email" onChange={this.changeHandler}  placeholder="Email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                        </div> */}
                        <div className='flex flex-wrap px-4 justify-between'>
                            <div className=''>
                                <button onClick={this.submitHandler} className="text-white bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Add</button>
                            </div>

                            <div className=''>
                                <button onClick={this.backhandler} className="text-white bg-gray-700 border-0 py-2 px-8 focus:outline-none hover:bg-gray-800 rounded text-lg">Back</button>
                            </div>
                        </div>
                        <p  className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                    </div>
                    </div>
                </section>

        </div>
    )
  }
}

export default addProducts;
