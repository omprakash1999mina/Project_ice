import {React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { getRole, storeRole,getCart, storeCart } from './helpers';
// import SingleProduct from './pages/SingleProduct';
// import Loader from './pages/Loader';
// import DeleteModal from './components/DeleteModal';
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
import { CartContext } from './CartContext';
import { RefundPolicy } from "./pages/RefundPolicy";
import { Terms } from "./pages/Terms";
import Contact from "./components/Contact";
import UpdateProfile from './pages/UpdateProfile';
import Maintenance from './pages/Maintenance';
import Loader from './components/Loader';
import Orders from "./pages/Admin/Orders";
import Cartelement from './pages/Cartelement';
import orders from './pages/orders';

const App = () => { 
    const [ role, setRole ] = useState('customer');
    const [ cart, setCart ] = useState({});
    // console.log('updated')
    // Fetch cart from local storage
    useEffect(() => {
        getCart().then(cart => {
        const temp = JSON.parse(cart);
        setCart(temp);
    
        });
        // setCart(temp);
    
        getRole().then(role => {
            setRole(role);
        });

    }, []);

    useEffect(() => {
        storeRole(role);
    }, [role]);
    
    useEffect(() => {
        storeCart(JSON.stringify(cart));
        // console.log(JSON.stringify(cart))
    }, [cart]);



   return (
        <>

            <Router>
                <AdminContext.Provider value={{ role, setRole }}>
                <CartContext.Provider value={{ cart, setCart }}>

                    <NavBar  />
                    <Switch>
                            <Route path="/" component={Home} exact></Route>
                            <Route path="/admin/orders" component={Orders} exact></Route>
                            <Route path="/admin/addproducts" component={AddProducts} exact></Route>
                            <Route path="/admin/payments" component={Payments} exact></Route>
                            <Route path="/admin/messages" component={Message} exact></Route>
                            <Route path="/admin/analytics" component={Admin} exact></Route>
                            <Route path="/admin/products" component={ProductsList} exact></Route>
                            <Route path="/admin" component={Admin} exact></Route>
                            {/* <Route path="/loader" component={Loader} exact></Route> */}
                            <Route path="/dashboard" component={Dashboard} exact></Route>
                            <Route path="/login" component={Login} exact></Route>
                            <Route path="/register" component={Register} exact></Route>
                            {/* <Route path="/error" component={} exact></Route> */}
                            {/* <Route path="/products/:_id" component={SingleProduct}></Route> */}
                            <Route path="/cart" component={Cart} exact></Route>
                            <Route path="/updateprofile" component={UpdateProfile} exact></Route>
                            <Route path="/terms" component={Terms} exact></Route>
                            <Route path="/maintenance" component={Maintenance} exact></Route>
                            <Route path="/RefundPolicy" component={RefundPolicy} exact></Route>
                            <Route path="/support" component={Contact} exact></Route>
                            <Route path="/loader" component={Loader} exact></Route>
                            {/* <Route path="/products/:_id" component={SingleProduct}></Route> */}
                            <Route path="/placeorders" component={Cartelement} />
                            <Route path="/orders" component={orders} />
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