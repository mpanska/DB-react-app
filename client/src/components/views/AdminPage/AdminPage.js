import React from 'react';
import { Button } from 'antd';


function AdminPage() {

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