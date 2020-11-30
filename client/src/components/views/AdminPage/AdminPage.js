import React,  { useEffect, useState }  from 'react';
import Axios from 'axios';
import { Collapse, Card, Button } from 'antd';


const { Panel } = Collapse

// import ImageSlider from '../../utils/ImageSlider';
// import { categories, price } from '.././LandingPage/Sections/Datas';
// import { set } from 'mongoose';

const { Meta } = Card;



function AdminPage() {

    const [Users, setUsers] = useState([]);
    const [Products, setProducts] = useState([]);


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Panel administratora</h1>
            <br />
           
            <a href="/admin/userpanel"><Button size="large"> Użytkownicy </Button></a>
            <br />
            <br />
            <a href="/admin/productpanel"><Button size="large"> Produkty </Button></a>
        </div>
    );
    
}

export default AdminPage;