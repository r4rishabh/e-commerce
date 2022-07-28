import React, { Component, useEffect, useState } from 'react';
import StripeCheckout from "react-stripe-checkout";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { getServer } from "../../util";
import { useNavigate } from "react-router-dom";
import { message, Button } from "antd";
import { url } from "./api";









const Payment = ({ cart }) => {

    // console.log(cart);

    const calculateTotal = () => {
        let total = 0;
        const cartProducts = cart.products;
        if (cartProducts && cartProducts.length > 0) {
            cartProducts.forEach((product) => {
                total += product.price;
            })
        }
        return total;
    }

    // const [clientSecret, setClientSecret] = useState("");
    // const elements = useElements();
    // const stripe = useStripe();

    // const navigate = useNavigate();
    // useEffect(() => {
    //     const fetchClientSecret = async (token) => {
    //         const config = {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         };

    //         const context = { token, cart: cart, total: calculateTotal() };
    //         const data = await axios.post(`${getServer()}/api/payment`, context, config);

    //         setClientSecret(data.data.clientSecret);
    //     };

    //     fetchClientSecret();
    //     console.log("clientSecret is >>>>", clientSecret);
    // }, []);

    // const options = {
    //     clientSecret: '{{CLIENT_SECRET}}',
    // };

    // const confirmPayment = async (e) => {
    //     e.preventDefault();

    //     await stripe
    //         .confirmCardPayment(clientSecret, {
    //             payment_method: {
    //                 card: elements.getElement(CardElement),
    //             },
    //         })
    //     navigate("/cart")
    // }

    const handleCheckout = () => {
        const total = calculateTotal();
        axios
            .post(`${url}/stripe/create-checkout-session`, {
                cart, total
            })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <div>

            {/* <Button type="primary" onClick={confirmPayment}>Pay With Card</Button> */}
            {/* <StripeCheckout
                stripeKey="pk_test_51H8FIqKQHKlGO0KXSAJvY2HARHD5jOVevVTxSPvZt2p2YYRsncr3KSbaXX4orz7yhAccHrIZw0CHlcvYP6FpMpnX00PvzRfeXX"
                //  token={thishandleToken}
                // shippingAddress
                // billingAddress
                amount={calculateTotal * 100}
                name="Complete Transaction"
                onClick={confirmPayment}
            ></StripeCheckout>
             */}

            <>
                <Button type="primary" onClick={() => handleCheckout()}>Check out</Button>
            </>


        </div>
    )
}

export default Payment


