import React, { Component } from "react";
import axios from "axios";
import env from "react-dotenv";
const API_URL = env.API_URL;

const login = {

 
    constructor(props) {
        super(props)
        
        this.state = {
            email: '',
            password: ''
        }
    },
    submitHandler = (e) =>{
        e.preventDefault();
        // console.log(this.state);

        const config = {
            headers: {
            'Content-Type': 'application/json',
            
        }
    }

        axios.post(API_URL + "login", this.state, config)
        .then(response => {
            console.log(response.message)
        })
        .catch(error =>{
            console.log(error);
        })
      },

      changeHandler = (e) =>{
        this.setState( {[e.target.name]: e.target.value} );    
      }

    }
      export default login;