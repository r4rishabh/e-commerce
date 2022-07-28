import React, { Component } from 'react';
import { connect } from "react-redux";
import { getProducts } from "../../../actions/productsAction";
import Product from "../../general/Product";
import { decodeUser } from "../../../util";



class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            merchantProduct: [],
        };
    }

    componentDidMount() {
        this.props.getProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.products.products && nextProps.products.products.length > 0) {
            const userId = decodeUser().user.id;
            let merchantProduct = [];
            merchantProduct = nextProps.products.products.filter((product) => product.userId === userId);
            this.setState({ merchantProduct });
        }
    }

    productDetail = (product) => {
        return (
            <ul>
                <li>Price: Rs {product.price}</li>
                <li>Quantity:{product.quantity}</li>
            </ul>
        );
    }


    render() {
        const { merchantProduct } = this.state;
        return (
            <div className="container-fluid"  >
                <div className="row">
                    {merchantProduct.map((product, index) => (
                        <Product
                            key={index}
                            link={`${product._id}`}
                            product={product}
                            description={this.productDetail(product)}
                            buttonName="Add To Cart"
                        />
                    ))}
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => ({
    products: state.products,
})

export default connect(mapStateToProps, { getProducts })(Products);
