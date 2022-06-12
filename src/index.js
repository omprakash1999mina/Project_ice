import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { store } from './store/store'

ReactDOM.render(
    <div className="h-screen relative flex flex-col justify-between">
        <Provider store={store}>
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <App />
            </SnackbarProvider>
        </Provider>
    </div>,
    document.getElementById('root')
);