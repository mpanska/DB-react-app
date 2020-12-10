import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Błąd wylogowania')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        
        <Menu.Item>
          <a href="/login">Logowanie</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Rejestracja</a>
        </Menu.Item>

      </Menu>
    )
  } else if(user.userData && user.userData.isProductOwner || user.userData && user.userData.isAdmin){
    return(
      <Menu mode={props.mode}>
         <Menu.Item key="history">
          <a href="/history">Historia</a>
        </Menu.Item>

        <Menu.Item key="upload">
          <a href="/product/upload">Dodaj produkt</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Wyloguj</a>
        </Menu.Item>
      </Menu>
    )
  }
  else{
    return (
      <Menu mode={props.mode}>

        <Menu.Item key="history">
          <a href="/history">Historia</a>
        </Menu.Item>

        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22 , color:'#667777'}}>
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
          </Badge>
        </Menu.Item>


        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Wyloguj</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

