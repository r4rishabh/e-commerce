import React from "react";
import NavBar from "../general/NavBar";
import Background from "./background";
import Products from "./Products";

const index = () => {
    return (
        <div>
            <NavBar />
            <Background />
            <Products />
        </div>
    );
}

export default index;