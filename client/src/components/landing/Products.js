import React, { Component } from 'react';
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsAction";
import Product from "../general/Product";




class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.products.products) {
            const products = nextProps.products.products;
            this.setState({ products });
        }
    }

    productDetail = (product) => {
        return (
            <ul>
                <li>Price: ${product.price}</li>
                <li>Quantity:{product.quantity}</li>
            </ul>
        );
    };
    render() {
        const { products } = this.state;
        return (
            <div className="container-fluid" >
                < div className="row"  >
                    {products.map((product, index) => (
                        <Product
                            key={index}
                            link={`products/${product._id}`}
                            product={product}
                            description={this.productDetail(product)}
                        />
                    ))}
                </div>

            </div>
        )
    }
}

const mapStateToProp = (state) => ({
    products: state.products,
});

export default connect(mapStateToProp, { getProducts })(Products);

