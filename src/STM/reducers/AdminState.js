let initialState = 'customer';
// import React, { useState, useEffect } from 'react';

const admin = (state= initialState , action) =>{
    // const [initialState , setInitialState] = useState('customer');
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [initialState])
    try{

        const data = JSON.parse(window.localStorage.getItem('adminsettings'));
        // console.log("data is here " + initialState)
        initialState = data.role; 
        // return initialState;
    }catch(err){
        initialState = 'customer';
    }

    return initialState;
    // switch (action.type) {
    //     case "roleType":
    //         const data = JSON.parse(window.localStorage.getItem('adminsettings'));

            
    //         break;
    
    //     default: return ;
            
    // }
}

export default admin;