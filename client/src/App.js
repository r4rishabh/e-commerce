import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import store from "./store";
import { setCurrentUser } from "./actions/authActions";
import { decodeUser } from "./util/index";
import setAuthToken from "./util/setAuthToken";
import Landing from "./components/landing";
import { addToCart } from "./actions/cartActions";
import ProductDetails from "./components/landing/ProductDetails";
import ProtectedRoutes from "./components/general/ProtectedRoutes";
import Home from "./components/dashboard/component/Home";
import AddProduct from "./components/dashboard/component/AddProduct";
import Products from "./components/dashboard/component/Products";
import AddProfile from "./components/dashboard/component/AddProfile";
import Profile from "./components/dashboard/component/Profile";
import Cart from "./components/customers/Cart";
import CheckoutSuccess from "./components/customers/CheckoutSuccess"
import Dashboard from "./components/dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import './App.css';
import "antd/dist/antd.min.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51LNV4PSG82Qx60s1UQkS4L1gZzIfsS40QbF9jaFnXyVJDr6cGUwJdHYs5jV7sRaDLxX8g9gyx0t88H4V9o0s22pX00sGCACVJ5');



if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App(props) {
  useEffect(() => {
    store.dispatch(setCurrentUser());
  }, [])

  const grabProductsFromStorage = () => {
    const userId = decodeUser().user.id;
    const cartProducts = JSON.parse(localStorage.getItem("products"));
    const context = { products: cartProducts, userId };
    store.dispatch(addToCart(context));
    localStorage.removeItem("products");
  };

  if (localStorage.getItem("token") && localStorage.getItem("products")) {
    grabProductsFromStorage();
  }





  return (
    <Provider store={store}>
      <Router>
        <div className="App">

          <Routes>

            <Route path="/" element={<Landing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={
                <Dashboard {...props} nestedRoute={Home} />}
              />
              <Route path="/dashboard/addProduct" element={
                <Dashboard {...props} nestedRoute={AddProduct} />}
              />
              <Route path="/dashboard/products" element={
                <Dashboard {...props} nestedRoute={Products} />}
              />
              <Route path="/dashboard/profile" element={
                <Dashboard {...props} nestedRoute={Profile} />}
              />
              <Route path="/dashboard/addprofile" element={
                <Dashboard {...props} nestedRoute={AddProfile} />}
              />
              <Route path="/cart" element={<Elements stripe={stripePromise}><Cart /></Elements>} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />

            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
