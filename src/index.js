import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
// import store from './STM/Store';
// import { Provider } from 'react-redux';

ReactDOM.render(
    <div className="h-screen relative flex flex-col justify-between">
        <App />
    </div>,
    document.getElementById('root')
);