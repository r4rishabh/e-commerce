import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Space, Spin, Button, Rate, Modal, Alert } from 'antd';
import { getProduct } from "../../actions/productsAction";
import { addToCart } from "../../actions/cartActions";
import NavBar from "../../components/general/NavBar";
import { decodeUser } from "../../util/index";

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            visible: false,
        };
    }
    componentDidMount() {
        let prmlst = (window.location.href).split("products/");
        const id = prmlst[1];
        this.props.getProduct(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.product) {
            const product = nextProps.product;
            this.setState({ product });
        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    registerModal = (product) => {
        return (
            <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                <Alert
                    message={
                        <center>
                            <span >
                                <strong>Added</strong> {product.map(product => product.name)} to Cart
                            </span>
                        </center>
                    }
                    type="success"
                />
                <br />
                <center>
                    <Link to="/cart?redirect=/cart">
                        <Button key="submit" type="primary">
                            Go To Cart
                        </Button>
                    </Link>
                </center>
            </Modal>
        )
    }

    async addProductToCart(product) {
        if (!localStorage.getItem("token")) {
            const productExists = !isEmpty(localStorage.getItem("products"));
            if (productExists) {
                const products = JSON.parse(localStorage.getItem("products"));
                products.push(product.map(product => product._id));
                this.showModal();
                return localStorage.setItem("products", JSON.stringify([product.map(product => product._id)]));
            } else {
                this.showModal();
                return localStorage.setItem("products", JSON.stringify([product.map(product => product._id)]));
            }
        }

        const userId = decodeUser().user.id;
        const context = { products: [product.map(product => product._id)], userId };
        await this.props.addToCart(context);
        this.showModal();
    }

    render() {
        const { product } = this.state;
        // console.log(product);
        return (
            <Fragment>
                <NavBar />

                <div className="container">
                    {product ? (
                        <Fragment>                    <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <img src="/assets/images/eshop.jpg" alt="product" />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <h1 style={{ "margin": "0" }}>{product.map(product => product.name)}</h1>
                                <p className="lead" style={{ "margin": "0" }}>
                                    Description: {product.map(product => product.description)}
                                </p>
                                <p className="lead" style={{ "margin": "0" }}>Features:</p>
                                <ul>
                                    {product.map(product => product.feature).map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={product.map(product => product.rating)}
                                    style={{ "margin": "0" }}
                                />
                                <p className="lead" style={{ "margin": "0" }}>
                                    Quantity: {product.map(product => product.quantity)}
                                </p>
                                <h1 >Rs {product.map(product => product.price)}</h1>
                                <Button type="primary" onClick={(_) => this.addProductToCart(product)}>Add to Cart</Button>
                            </div>
                        </div>
                            <br />
                            <hr />
                            <br />
                            <h1>Product Details</h1>
                            <p className="lead">
                                <b>{product.map(product => product.details)}</b>
                            </p>
                            <p className="lead" style={{ "margin": "0" }}>Main Features Of Product:</p>
                            <ul>
                                {product.map((product => product.feature.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))))}
                            </ul>
                        </Fragment>

                    ) :
                        (<Space size="middle">
                            <Spin size="large" />
                        </Space>)}
                </div>
                {product && this.registerModal(product)}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
})

export default connect(mapStateToProps, { getProduct, addToCart })(ProductDetails);