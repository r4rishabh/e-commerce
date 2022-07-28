import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from "./withRouter";
import Input from '../general/Input';
import { message } from "antd";
import { register } from "../../actions/authActions";
import { decodeUser } from "../../util/index";
import { addToCart } from "../../actions/cartActions";
import NavBar from "../general/NavBar";



class Register extends Component {



    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const search = window.location.search;
        let split = search.split("redirect=");
        const hasRedirect = search.includes("redirect=");
        split = split[split.length - 1];


        if (nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0) {
            nextProps.auth.errors.forEach((error) => {
                message.error(error.msg);
            });
        }
        if (nextProps.auth.isAuthenticated) {
            if (split && hasRedirect) {
                if (split === "/cart" && localStorage.getItem("token") && localStorage.getItem("products")) {
                    const userId = decodeUser().user.id;
                    const cartProducts = JSON.parse(localStorage.getItem("products"));
                    const context = { products: cartProducts, userId };
                    this.props.addToCart(context);
                    localStorage.removeItem("products");
                }
                console.log(split);
                window.location.href = split;
            } else {
                message.success("Thank You For Signing Up");
                setTimeout(() => window.location.href = "/", 3000);
            }
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit() {
        let split = window.location.search.split("?role=");
        split = split[split.length - 1].split("&");
        const role = split[0];
        const { name, email, password } = this.state;
        const newUser = {
            name, email, password, role
        };

        if (password === this.state.password2) {
            this.props.register(newUser);
        } else {
            message.error("Password must be same");
        }
    }




    render() {
        const { name, email, password, password2 } = this.state;
        return (

            <Fragment>
                <NavBar />
                <div className="container">
                    <h1 className="large text-primary">Register</h1>
                    <p className="lead">
                        <i className="fa-solid fa-user"></i>Create Your Account
                    </p>
                    <div className="form">
                        <Input
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form">
                        <Input
                            name="password2"
                            type="password"
                            placeholder="Confirm password"
                            value={password2}
                            onChange={this.onChange}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={this.onSubmit}>Register</button>

                </div>
            </Fragment>




        );
    };
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { register, addToCart })(withRouter(Register));



