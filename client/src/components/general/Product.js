import React from 'react';
import { Card, Button } from "antd";
import propTypes from "prop-types";
import { Link } from 'react-router-dom';
const { Meta } = Card;

const Product = ({ product, description, buttonName, link }) => {
    return (
        <div style={{ "maxWidth": "300px", "marginRight": "1rem", "marginTop": "2rem" }}>
            <Link to={link}>
                <Card
                    hoverable
                    style={{ "width": "300px", "marginRight": "1%" }}
                    cover={
                        <img
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                >
                    <Meta title={product.name} description={description} />
                    <Button type="primary">{buttonName}</Button>
                </Card>

            </Link>

        </div >


    );
};

Product.propTypes = {
    product: propTypes.object.isRequired,
    //description: propTypes.func.isRequired,
    buttonName: propTypes.string,
}

export default Product;
