import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {
        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Cena"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sprzedano">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="Obejrzano"> {Product.views}</Descriptions.Item>
                <Descriptions.Item label="Opis towaru:"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" onClick={addToCarthandler}>
                    Dodaj do koszyka
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
