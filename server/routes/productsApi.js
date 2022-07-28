const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Products");

router.post("/", [
    auth,
    [
        check("name", "Name is Required").not().isEmpty(),
        check("description", "Description is Required").not().isEmpty(),
        check("category", "Category is Required").not().isEmpty(),
        check("price", "Price is Required").not().isEmpty(),
        check("quantity", "Quantity is Required").not().isEmpty(),
        check("feature", "Feature is Required").not().isEmpty(),
        check("rating", "Rating is Required").not().isEmpty(),

    ],
],
    async (req, res) => {

        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, description, category, price, brand, quantity, feature, rating } = req.body;
            const newProduct = new Product({
                userId: req.user.id,
                name,
                description,
                category,
                price,
                brand,
                quantity,
                feature,
                rating,
            });

            const product = await newProduct.save();
            res.json({ product });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    });

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id });
        //const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ msg: "Product was not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/instructor/:id", auth, async (req, res) => {
    try {
        const product = await Product.find({ userId: req.params.id });
        res.json({ product });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;