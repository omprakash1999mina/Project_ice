import React, { Component } from 'react';
import axios from "axios";
const  API_URL = process.env.REACT_APP_API_URL;

// let error_message ;
let res_error = false;
let url = null;
let id;
let formdata;
// function userMessage(){
//     error_message = `*  ${res_error} please try again with correct details !!`;
//     return error_message;
// }

export class UpdateProfile extends Component {
// const UpdateProfile = () => {
    constructor(props) {
        // console.log(props)
        super(props)
        window.scrollTo(0,0);
        this.state = { name: '', age: '', gender: '', email: '', password: '', image: null, imgsrc: null, confirmed: false, error_image: false,   error_name: false, error_email: false, error_age: false, error_gender: false, error_password: false, updated: false, error_message: 'Error in server please contact to our team !' }
        this.intialstate = {...this.state}
        
        try{
            const { location } = this.props;
            if(location.state.id){
                id = location.state.id;
            }

            const localdata = JSON.parse( window.localStorage.getItem('userSetting') );
            // console.log(localdata.atoken);
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localdata.atoken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            axios.get(API_URL+'users/'+id, config)
            .then(response => {
                // console.log(response.data);
                const {name, age, gender,email,image} = response.data;
                // setdata(data);
                // console.log()
                this.setState({name: name, age: age, email: email, gender: gender, imgsrc: image, })
                // e.target.files[0] = image 
                // this.handleImagePreview(image)
                url = 'fake';
                // console.log(this.state)
                // console.log(url)

            })
            .catch(error =>{
                if(error.response){
                    // console.log(error.response.status);
                    let error_message = error.response.data.message;
                    this.props.history.push('/notAuthorized');
                    console.log(error_message);
                    // console.log(error.response.headers);
                    
                }
            });

        }catch(err){
            // console.log(err)
            console.log('sorry you are not authenticate')
            id='error';
            this.props.history.push({
                pathname: '/error',
            })
        }
    
    }

    submitHandler = (e) =>{
        e.preventDefault();
        // console.log(this.state);
        // console.log(this.handleValidation())
        if(this.handleValidation() ){
            const localdata = JSON.parse(window.localStorage.getItem('userSetting'));
            // console.log(localdata.atoken);
            const config = {
                headers: {

                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localdata.atoken}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
            if(this.state.image_file !== null){
                formdata = new FormData();
                formdata.append('name', this.state.name);
                formdata.append('age', this.state.age);
                formdata.append('gender', this.state.gender);
                formdata.append('email', this.state.email);
                formdata.append('password', this.state.password);
                if(this.state.image !== null){
                    formdata.append('image', this.state.image);
                }
            }

            // console the all filled deatils in formdata

                // for (var key of formdata.entries()) {
                //     console.log(key[0] + ', ' + key[1]);
                // }
            // console.log(formdata);
            // axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
            axios.put(API_URL+"update/"+id, formdata, config)
            .then(response => {
                // console.log(response.data);
                res_error = false;
                this.setState({ updated: true })
                // this.setState(this.intialstate)
                // console.log(window.localStorage.getItem('userSetting'));
            })
            .catch(error =>{
                res_error = true;
                // console.log("in error block ")
                // this.setState(this.intialstate)
                if(error.response){
                    // const error_message = error.response.data.message;
                    // console.log(error.response);
                    let error_message;
                    error_message = error.response.data.message;
                    this.setState({error_message: error_message})
                    // console.log(error.response.headers);
                    console.log(error_message);
                }
            })
        }
    }

    handleValidation =(e) =>{
        // console.log(typeof(this.state.image))
        // if(typeof(this.state.image) === "undefined" || this.state.image===null){
        //     this.setState({error_image: true});
        //     console.log(res_error )
        //     return false;
        //  }
        
         //name
         if(typeof this.state.name === 'undefined' || this.state.name === ''){
            this.setState({error_name: true})
            res_error = 'name is invalid';
            console.log(res_error)
            return false;
         }
         //age
         if(typeof this.state.age === 'undefined' || this.state.age === ''){
            this.setState({error_age: true})
            res_error = 'age is invalid';
            console.log(res_error)
            return false;
         }
         //gender
         if (typeof this.state.gender === 'undefined' || this.state.gender === '') {
            this.setState({error_gender: true})
            res_error = 'gender is invalid';
            console.log(res_error)
            return false;
         }
         //Email
         if(typeof this.state.email === 'undefined' || this.state.email === ''){
            this.setState({error_email: true})
            res_error = 'Email is invalid';
            console.log(res_error)
            return false;
         }
         
        //  console.log(this.state)
         return true;

    }

    passwordValidation = (e) =>{
        //password
        if( typeof this.state.password === 'undefined' || this.state.password === ''){
            this.setState({error_password: true})
            // res_error = true;
            // this.setState( { error_message: 'password is invalid'})
            console.log('password is invalid')
            return false;
         }
        //  return true;
        this.submitHandler(e);
    }

    handleImagePreview = (e) =>{
        // Assuming only image
        try{
            console.log(e)
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

        changeHandler = (e) =>{
                // console.log(this.state)
                res_error = false;
                this.setState( {[e.target.name]: e.target.value, error_name: false, error_age: false, error_gender: false, error_email: false, error_password: false, error_image: false,  } );    
        }
        confirmationHandler = () =>{
            // console.log(this.handleValidation())
            if (this.handleValidation()) {
                // this.setState({confirmed: true, updated: true})
                // console.log(this.state)
                this.setState({confirmed: true})
            } else {
                console.log("please fill all Details !!" )                
            }
        }

        cancleHandler = ()=>{
            this.setState(this.intialstate)
            // console.log(this.intialstate)
            // console.log(this.state)
            this.props.history.push({
                pathname: '/dashboard',
                state: {id: id},
            })
        }

    render() {
        const {name, age, gender , email, error_name , error_age, error_email, error_gender, error_image, error_password, password, confirmed, updated} = this.state;
    return (
        <div className='pt-10'>
    
            <section className="flex sm:mt-16 sm:mb-24 items-center justify-center" >
                <div className="bg-gray-100 rounded-xl p-5">
                <div className="flex flex-row justify-center mx-4 p-4">
                    <div className="flex items-center">
                        <div className="flex items-center text-white relative">
                        { url !== null ?
                            <div className="rounded-full overflow-hidden transition duration-500 ease-in-out h-12 w-12 border border-teal-600">
                                    <img className="object-center object-scale-down" alt="" src={this.state.imgsrc} />
                            </div>
                                    :
                            <div className="rounded-full overflow-hidden transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus ">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="8.5" cy="7" r="4"></circle>
                                    <line x1="20" y1="8" x2="20" y2="14"></line>
                                    <line x1="23" y1="11" x2="17" y2="11"></line>
                                </svg>
                            </div>
                        }
                            <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Account</div>
                        </div>
                
                    </div>
                </div>
                <div className="mt-8 p-4">
                    <div>
                        <div className="pt-4">
                        <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Profile Photo</div>
                                <input className={`${error_image ? 'border-red-500': 'border-gray-200'} appearance-none border bg-white rounded w-full mt-2 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline`} ref="file" type="file" name="user[image]" multiple={true} onChange={this.handleImagePreview}   />
                                {/* <input className={`border-gray-200 appearance-none border bg-white rounded w-full mt-2 py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline`} ref="file" type="file" name="user[image]" multiple={true} onChange={this.handleImagePreview}   /> */}
                                { error_image &&  <p className="text-red-500 text-xs italic">Please choose a profile photo.</p> }
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full flex-1 mx-2 svelte-1l8159u">
                                <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mt-3">Full Name</div>
                                    <div className={ `${ error_name ? 'border-red-500': 'border-gray-200'}  bg-white mt-2 p-1 flex border rounded svelte-1l8159u `}>
                                        <input type="text" required onChange={this.changeHandler} name="name" value={name} placeholder="Full Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> 
                                    </div>
                                    { error_name && <p className="text-red-500 p-1 text-xs italic">Name can not be empty.</p>  }
                            </div>
                            <div className="w-full flex-1 mx-2 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">Age </div>
                                        <div className={`${error_age ? 'border-red-500' : 'border-gray-200'} bg-white mt-2 p-1 flex border rounded svelte-1l8159u`}>
                                            <input required onChange={this.changeHandler} name="age" value={age}  type="number" placeholder="age" className="p-1 px-2 appearance-none  outline-none w-full text-gray-800" /> 
                                        </div>
                                     { error_age &&  <p className="text-red-500 p-1 text-xs italic">Age can not be empty or invalid.</p> }
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">Gender </div>
                                    <div className={`${ error_gender ? 'border-red-500' : 'border-gray-200'} bg-white mt-2 p-1 flex border rounded svelte-1l8159u`}>
                                        <p>
                                            <select required name="gender" value={gender} onChange={this.changeHandler} className="p-1 px-2 appearance-none outline-none w-full " >
                                                <option value="">------Select Your Gender Type-----</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                                <option value="other">other</option>
                                            </select>
                                        </p>
                                    </div>
                                    { error_gender &&  <p className="text-red-500 p-1 text-xs italic">Please choose correct gender.</p> }
                            </div>
                            <div className="w-full mx-2 flex-1 svelte-1l8159u">
                                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Your Email</div>
                                    <div className={`${error_email ? 'border-red-500': 'border-gray-200'} bg-white mt-2 p-1 flex border rounded svelte-1l8159u`}>
                                        <input required onChange={this.changeHandler} name="email" value={email} type="email" placeholder="abc@gmail.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                                    </div>
                                    { error_email &&  <p className="text-red-500 p-1 text-xs italic">Email can not be empty.</p> }
                            </div>
                        </div>
                    </div>
                    <div className="flex p-2 mt-4 mb-10">
                        {/* <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-gray-200  
                    bg-gray-100 
                    text-gray-700 
                    border duration-200 ease-in-out 
                    border-gray-600 transition">Previous</button> */}
                        <div className="flex-auto flex justify-center">
                            {/* <button  onClick={(e)=>{ if(this.handleValidation() ){   } }} className="text-base mx-4  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer  */}
                            <button  onClick={this.confirmationHandler} className="text-base mx-4  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-teal-700  
                    bg-teal-600 
                    text-teal-100 
                    border duration-200 ease-in-out 
                    border-teal-600 transition">Edit</button>
                            <button onClick={this.cancleHandler} className="text-base mx-4 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                    hover:bg-teal-200  
                    bg-teal-100 
                    text-teal-700 
                    border duration-200 ease-in-out 
                    border-teal-600 transition">Cancle</button>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        
        { confirmed &&
        
            <div  className="min-w-screen bg-gray-100 bg-opacity-50 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"   id="modal-id">
            <div className="absolute shadow-2xl rounded-2xl ">

            <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-2xl shadow-2xl bg-white ">
            
                <div className="text-center p-5 flex-auto justify-center">
                    {   updated === false ?

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-gray-500 mx-auto"  viewBox="0 0 16 16">
                            <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
                        </svg>
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-16 h-16 flex items-center text-green-400 mx-auto" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                    }
                        { updated === false && <h2 className="text-xl font-bold py-4 ">Are you sure?</h2> }
                        { updated && <h2 className="text-xl text-green-400 pt-4 ">Successfully Updated !!</h2> }
                        {/* { updated && <h2 className="text-xl text-gray-400 py-4 ">Now you can go back </h2> } */}
                        { updated === false && <p className="text-sm text-gray-500 px-8"> {name} Do you really want to change your details ? This process cannot be undone</p>   }
                        { res_error && <p className="text-sm text-red-600 pt-8"> {this.state.error_message} </p>   }

                </div>
                { updated === false &&
                    <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">confim with password</div>
                        <div className={`${error_password ? 'border-red-500': 'border-gray-200'} bg-white mt-2 p-1 flex border rounded svelte-1l8159u`}>
                            <input required onChange={this.changeHandler} name="password" value={password} type="number" placeholder="Password" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
                        </div>
                        { error_password &&  <p className="text-red-500 p-1 text-xs italic">password can not be empty.</p> }
                    </div>
                }
                
                <div className="p-3 justify-end mt-2 text-center space-x-4 md:block">
                    { updated === false && <button onClick={()=>{ this.setState({confirmed: false})}} className="mb-2 m-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>}
                    { updated === false && <button onClick={this.passwordValidation} className="mb-2 m-4 md:mb-0 bg-green-400 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Confim</button>}
                    { updated && <button onClick={this.cancleHandler} className="mb-2  bg-green-400 border border-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Go Back to Profile</button>}
                </div>
            </div>
            </div>

            </div>
        }
        </div>
    )
}
}

export default UpdateProfile;
