const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        subtotal: { type: Number, required: true },
        total: { type: Number, required: true },
        shipping: { type: Object, required: true },
        payment_status: { type: String, required: true },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment