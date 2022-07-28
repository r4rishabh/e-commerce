const express = require("express");
const router = express.Router();
const { isEmpty } = require("lodash");
const auth = require("../middleware/authorization");
const Product = require("../models/Products");
const Cart = require("../models/Cart");
const Payment = require("../models/Payment");
const stripe = require("stripe")("sk_test_51LNV4PSG82Qx60s1kkRelMnQFnzEcZCIuhW154QP2ijh2ysEkiW3IXWHJS6lRXeTzFwF7eME5gLvkky4tiR9VGpn00st3ANyjS");

router.post("/", auth, async (req, res) => {

    const total = req.body.total;
    console.log("Payment Request recieved for this ruppess", total);

    const payment = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "inr",
    });

    res.status(201).send({
        clientSecret: payment.client_secret,
    });
});


module.exports = router;