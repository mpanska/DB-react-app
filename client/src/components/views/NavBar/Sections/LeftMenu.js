import React from 'react';
import { Menu, Icon } from 'antd';
import { useSelector } from "react-redux";


function LeftMenu(props) {
  const user = useSelector(state => state.user)
  if(user.userData && user.userData.isAdmin){
    return (
      <Menu mode={props.mode}>
        <Menu.Item>
          <a href="/"> <Icon type="home" style={{ fontSize: 30, marginBottom: 3 }} /></a>
        </Menu.Item>

        <Menu.Item>
              <a href="/admin">Panel Administratora</a>
        </Menu.Item>
      </Menu>
    )
  }
  else{
    return (
      <Menu mode={props.mode}>
        <Menu.Item >
          <a href="/"> <Icon type="home" style={{ fontSize: 30, marginBottom: 3 }} /></a>
        </Menu.Item>
      </Menu>
    )
  }

  
}

export default LeftMenu