import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Dashboard } from "./../dashboard";


const NavBar = ({ auth: { isAuthenticated }, logout }) => {
    const user = (
        <ul>
            <li>
                <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
                <Link to="/register?role=merchant">Become A Merchants</Link>
            </li>
            <li>
                <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i>Cart</Link>
            </li>
            <li>
                <Link onClick={logout} to="#!"><i className="fa-solid fa-arrow-right-from-bracket"></i><span className="hide-on-mobile">Logout</span></Link>
            </li>
        </ul>
    );
    const guest = (
        <ul>
            <li>
                <Link to="/register?role=merchant">Merchants</Link>
            </li>
            <li>
                <Link to="/register?role=customer">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className="main-navbar bg-main">
            <h1>
                <Link to="/">
                    <i className="fas fa-store"></i> e-Shop
                </Link>
            </h1>
            {isAuthenticated ? user : guest}
        </nav>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(NavBar);
