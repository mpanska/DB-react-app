import React,  { useEffect, useState }  from 'react';
import Axios from 'axios';
import { Collapse, Card, Button } from 'antd';

const { Panel } = Collapse

// import ImageSlider from '../../utils/ImageSlider';
// import { categories, price } from '.././LandingPage/Sections/Datas';
// import { set } from 'mongoose';

const { Meta } = Card;



function UsersPanel() {

    const [Users, setUsers] = useState([]);
  
    useEffect(() => {
        Axios.post('/api/users/getUsers')
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                    console.log(response.data.users)
                } else {
                    alert('Nie udało się pobrać dane')
                }
            })
    }, [])

   
   
    const renderUsers = Users.map((user, index) => {
        return(
            <div>
                <ul style={{listStyle:"none"}}>
                    <li>
                        id: {user._id}
                    </li>
                    <li>
                        Imię: {user.name}
                    </li>
                    <li>
                        Nazwisko: {user.lastname}
                    </li>
                    <li>
                        email: {user.email}
                    </li>
                    <li>
                        hasło: {user.password}
                    </li>
                    <li>
                        Poziom dostępu: {user.role}
                    </li>
                    <li>
                        <Button>Usuń</Button>
                    </li>
                </ul>
            </div>
        )
       
    })

   


    return (
        <div>
            <h1>Zarządzanie produktami</h1>
            <br /><br />

            <Collapse>
                <Panel header="Pokaż wszystkie produkty" > 
                
                </Panel>
            </Collapse>  
          
            
            <br /><br />
        </div>
    );
    
}

export default UsersPanel;