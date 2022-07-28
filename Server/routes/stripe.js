const stripe = require('stripe')('sk_test_51LNV4PSG82Qx60s1kkRelMnQFnzEcZCIuhW154QP2ijh2ysEkiW3IXWHJS6lRXeTzFwF7eME5gLvkky4tiR9VGpn00st3ANyjS');
const express = require('express');
const Payment = require("../models/Payment");
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;
    const customer = await stripe.customers.create({
        metadata: {
            userId: cart.userId,
            cart: JSON.stringify(toString(cart)),
        },
    });
    const line_items = cart.products.map((item) => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    // images: [item.image],
                    description: `Payment for the purchase of 1 items form eShop`,
                    metadata: {
                        id: item._id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: 1,
        };
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'IN'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'inr',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    }
                }
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 1500,
                        currency: 'inr',
                    },
                    display_name: 'Next day air',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 1,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 1,
                        },
                    }
                }
            },
        ],

        phone_number_collection: {
            enabled: true,
        },

        line_items,
        mode: 'payment',
        customer: customer.id,
        success_url: `${YOUR_DOMAIN}/checkout-success`,
        cancel_url: `${YOUR_DOMAIN}/cart`,
    });

    res.send({ url: session.url });
});


const createOrder = async (customer, data) => {

    // const Items = customer.metadata.cart;
    // const products = Items.map((item) => {
    //     return {
    //         productId: item.id,
    //         quantity: item.cartQuantity,
    //     };
    // });

    const newOrder = new Payment({
        userId: customer.metadata.userId,
        customerId: data.customer,
        paymentIntentId: data.payment_intent,
        subtotal: (data.amount_subtotal) / 100,
        total: (data.amount_total) / 100,
        shipping: data.customer_details,
        payment_status: data.payment_status,
    });

    try {
        const savedOrder = await newOrder.save();
        console.log("Processed Order:", savedOrder);
    } catch (err) {
        console.log(err);
    }
}



app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {

    const payload = req.body;

    const payloadString = JSON.stringify(payload, null, 2);
    const secret = 'whsec_d16df2302b21d642f8aa0c91f2675757c83a8b5d6163b74a798df0e276b1f89d';

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
    });

    let data;
    let eventType;
    let event;
    try {
        event = stripe.webhooks.constructEvent(payloadString, header, secret);
        console.log("Webhook Verified");
        // console.log(event);
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    data = event.data.object;
    eventType = event.type;

    // Handle the event
    if (eventType === "checkout.session.completed") {
        console.log(eventType);
        stripe.customers
            .retrieve(data.customer)
            .then((customer) => {
                createOrder(customer, data);
            })
            .catch((err) => console.log(err.message));
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();

});


module.exports = app