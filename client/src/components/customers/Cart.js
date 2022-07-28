import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Empty, Button, List, Skeleton, Avatar } from "antd";
import { getCart, removeFromCart } from "../../actions/cartActions";
import NavBar from "../general/NavBar";
import Payment from "./Payment";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cart: {},
        }
    }

    componentDidMount() {
        this.props.getCart();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.cart && nextProps.cart.cart) {
            this.setState({ cart: nextProps.cart.cart });
        }
    }

    removeProduct = (product) => {
        const id = this.props.cart.cart._id;
        const context = { id, product };
        this.props.removeFromCart(context).then((_) => {
            this.props.getCart();
            window.location.reload();
        })
    }

    calculateTotal = () => {
        let total = 0;
        const cartProducts = this.state.cart.products;
        if (cartProducts && cartProducts.length > 0) {
            cartProducts.forEach((product) => {
                total += product.price;
            })
        }
        return total;
    }

    render() {
        const { cart } = this.state;
        return (
            <Fragment>
                <NavBar />
                <div className="container" style={{ "textAlign": "center" }}>
                    {isEmpty(cart.products) ? (
                        <div className="empty-cart-border">
                            <Empty image="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
                                description="Cart is Empty Keep Shopping"
                                imageStyle={{ "maxWidth": "60px", "display": "inline-block" }}
                            >
                                <Link to="/" className="btn btn-primary">
                                    Keep Shopping
                                </Link>
                            </Empty>
                        </div>) :
                        <div className="row">
                            <div className="col-sm-8 col-md-8 col-lg-8">
                                <List
                                    className="demo-loadmore-list"
                                    itemLayout="horizontal"
                                    dataSource={cart.products || []}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[
                                                <Link
                                                    to="#"
                                                    key="list-loadmore-edit"
                                                    onClick={(_) => this.removeProduct(item)}
                                                >
                                                    Remove from cart
                                                </Link>,
                                            ]}
                                        >
                                            <Skeleton
                                                avatar
                                                title={false}
                                                loading={item.loading}
                                                active
                                            >
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar
                                                            shape="square"
                                                            size={100}
                                                            src="/assets/images/eshop.jpg"
                                                        />
                                                    }
                                                    title={item.name}
                                                    description={item.description}
                                                />
                                                <div>
                                                    <b>{`Rs ${item.price}`}</b>
                                                </div>
                                            </Skeleton>
                                        </List.Item>

                                    )}


                                />
                            </div>
                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <br />
                                <br />
                                <h4>{`Total:  Rs ${this.calculateTotal()}`}</h4>
                                <Payment cart={cart} total={this.calculateTotal()} />
                            </div>
                        </div>
                    }
                    {cart.products && <Link to="/"><Button type="primary">Keep Shopping</Button></Link>}

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
})
export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);
