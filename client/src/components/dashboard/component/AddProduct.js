import React, { Component } from 'react';
import Input from '../../general/Input';
import { withRouter } from "./withRouter";
import { connect } from "react-redux";
import { addProduct } from "../../../actions/productsAction";
import { message } from 'antd';

class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            price: "",
            brand: "",
            quantity: "",
            feature: "",
            rating: "",
            category: ""
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        const { name, description, price, brand, quantity, feature, rating, category } = this.state;
        const newProduct = {
            name,
            description,
            price,
            brand,
            quantity,
            feature,
            rating,
            category
        }
        if (name.length <= 0) {
            return message.error("name field is required");
        }
        if (description.length <= 0) {
            return message.error("description field is required");
        }
        if (price.length <= 0) {
            return message.error("price field is required");
        }
        if (brand.length <= 0) {
            return message.error("brand field is required");
        }
        if (quantity.length <= 0) {
            return message.error("quantity field is required");
        }
        if (category.length <= 0) {
            return message.error("select category");
        }
        if (feature.length <= 0) {
            return message.error("select feature");
        }
        if (rating.length <= 0) {
            return message.error("select feature");
        }
        this.props.addProduct(newProduct);
    }

    render() {
        const { name, description, price, brand, quantity, feature, rating, category } = this.state;
        return (

            <div style={{ textAlign: "center" }}>
                <h1>AddProduct</h1>
                <Input
                    type="text"
                    placeholder="name a product"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <Input
                    type="text"
                    placeholder="give a brief description of the product"
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <Input
                    type="number"
                    placeholder="enter the price of the product"
                    name="price"
                    value={price}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <Input
                    type="text"
                    placeholder="enter the brand of this product"
                    name="brand"
                    value={brand}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <Input
                    type="number"
                    placeholder="enter the quantity"
                    name="quantity"
                    value={quantity}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <Input
                    type="text"
                    placeholder="enter the features"
                    name="feature"
                    value={feature}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <Input
                    type="number"
                    placeholder="rating"
                    name="rating"
                    value={rating}
                    onChange={this.onChange}
                    style={{ width: "360px", height: "35px" }}
                />
                <div className="from-group">
                    <select style={{ width: "360px", height: "35px" }}
                        name="category"
                        value={category}
                        onChange={this.onChange}
                    >
                        <option value="0">select a category for this product</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Office Supply">Office Supply</option>
                        <option value="Automotive Supply">Automotive Supply</option>
                        <option value="Cosmetics">Cosmetics</option>
                    </select>
                </div>
                <br></br>
                <button className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

export default connect((mapStateToProps), { addProduct })(withRouter(AddProduct));