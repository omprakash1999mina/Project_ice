import {React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { getRole, storeRole,getCart, storeCart } from './helpers';
// import SingleProduct from './pages/SingleProduct';
// import Loader from './pages/Loader';
import Home from './pages/Home';
import AddProducts from './pages/AddProducts';
import Payments from './pages/Admin/Payments';
import ProductsList from './pages/Admin/ProductsList';
import Message from './pages/Admin/Message';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Footer from './components/Footer';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import { CartContext } from './CartContext';
import Contact from "./components/Contact";
import UpdateProfile from './pages/UpdateProfile';
import Maintenance from './components/Maintenance';
import Loader from './components/Loader';
import Ordersadmin from "./pages/Admin/Ordersadmin";
import NotAuthorized from './components/NotAuthorized';
import Cartelement from './pages/Cartelement';
import Orders from './pages/Orders';
import Order from './pages/Order';
import test from './pages/test';

const App = () => { 
    const [ role, setRole ] = useState('customer');
    const [ cart, setCart ] = useState({ items: {}, totalItems: 0 });

    // Fetch cart from local storage
    useEffect(() => {
        getCart().then(cart => {
        const temp = JSON.parse(cart);
        setCart(temp);
        });
        getRole().then(role => {
            setRole(role);
        });

    }, []);

    useEffect(() => {
        storeRole(role);
    }, [role]);
    
    useEffect(() => {
        storeCart(JSON.stringify(cart));
    }, [cart]);



   return (
        <>

            <Router>
                <AdminContext.Provider value={{ role, setRole }}>
                <CartContext.Provider value={{ cart, setCart }}>

                    <NavBar  />
                    <Switch>
                            <Route path="/" component={Home} exact></Route>
                            <Route path="/admin/orders" component={Ordersadmin} exact></Route>
                            <Route path="/admin/addproducts" component={AddProducts} exact></Route>
                            <Route path="/admin/payments" component={Payments} exact></Route>
                            <Route path="/admin/messages" component={Message} exact></Route>
                            <Route path="/admin/analytics" component={Admin} exact></Route>
                            <Route path="/admin/products" component={ProductsList} exact></Route>
                            <Route path="/admin" component={Admin} exact></Route>
                            {/* <Route path="/loader" component={Loader} exact></Route> */}
                            {/* <Route path="/products/:_id" component={SingleProduct}></Route> */}
                            <Route path="/dashboard" component={Dashboard} exact></Route>
                            <Route path="/login" component={Login} exact></Route>
                            <Route path="/register" component={Register} exact></Route>
                            <Route path="/cart" component={Cart} exact></Route>
                            <Route path="/updateprofile" component={UpdateProfile} exact></Route>
                            <Route path="/terms" component={Terms} exact></Route>
                            <Route path="/error" component={Maintenance} exact></Route>
                            <Route path="/RefundPolicy" component={RefundPolicy} exact></Route>
                            <Route path="/support" component={Contact} exact></Route>
                            <Route path="/loader" component={Loader} exact></Route>
                            <Route path="/placeorders" component={Cartelement} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/order" component={Order} />
                            <Route path="/test" component={test} />
                            <Route path="/notauthorized" component={NotAuthorized} />
                            <Route path="*" component={NotFound} />
                    </Switch>
                </CartContext.Provider>
                </AdminContext.Provider>

                    <Footer/>
            
            </Router>
        </>
    )
}

export default App;