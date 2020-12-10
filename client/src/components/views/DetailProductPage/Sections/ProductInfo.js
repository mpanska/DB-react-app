import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Button, Descriptions } from 'antd';


function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    let user = useSelector(state => state.user);


    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }

    if(user.userData && user.userData.isAuth == false){
        return (
            <div >
                <Descriptions>
                    <Descriptions.Item label="Cena"> {Product.price} zł</Descriptions.Item>
                    <Descriptions.Item label="Sprzedano">{Product.sold}</Descriptions.Item>
                </Descriptions>
                <Descriptions>
                    <Descriptions.Item label="Opis towaru"> {Product.description}</Descriptions.Item>
                </Descriptions>
                <br />
              
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{fontSize: '14px' }}>Żeby dokonywać zakupów i korzyskać z koszyka wymagane jest logowanie/rejestracja. Dokonać logowania
                  bądź rejestracji można wybierając odpowiednią opcję z menu nawigacji. </p>
                </div>
            </div>
        )
    }else{
        return (
        <div>
            <Descriptions>
                <Descriptions.Item label="Cena"> {Product.price} zł</Descriptions.Item>
                <Descriptions.Item label="Sprzedano">{Product.sold}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
                <Descriptions.Item label="Opis towaru"> {Product.description}</Descriptions.Item>
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

   
}

export default ProductInfo
