const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const config = require("../config/keys");


router.get("/", (req, res) => res.send("Users Route"));

router.post("/",
    [
        check("name", "name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please password should have atleast 5 characters").isLength({ min: 5 }),
    ],


    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const { name, email, password, role } = req.body;
            let user = await User.findOne({ email: email });
            if (user) {
                console.log(user);
                return res.status(400).json({ errors: [{ msg: "User Already Created" }] });
            }

            user = new User({
                name,
                email,
                password,
                role
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.jwtSecret,
                { expiresIn: 3600 * 24 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token });
                }
            );


            //res.send("Users Created");
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }


    });



module.exports = router;