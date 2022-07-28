import axios from "axios";
import jwt_decode from "jwt-decode";

const isDevelopment = window.location.hostname.includes("localhost");

const getServer = () => {
    return isDevelopment ? "http://localhost:5000" : "";
}

const decodeUser = () => {
    const token = localStorage.getItem("token");
    return jwt_decode(token);
}

export { getServer, decodeUser };