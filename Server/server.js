const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

server.use(cors());
server.use(morgan("dev"));

connectDB();


server.use(express.json({ extended: false }));
server.use("/api/users", require("./routes/userApi"));
server.use("/api/products", require("./routes/productsApi"));
server.use("/api/auth", require("./routes/authApi"));
server.use("/api/profile", require("./routes/profileApi"));
server.use("/api/cart", require("./routes/cartApi"));
// server.use("/api/payment", require("./routes/paymentApi"));
server.use("/api/stripe", require("./routes/stripe"));

server.get("/", (req, res) => {
    res.send("My app is up");
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});