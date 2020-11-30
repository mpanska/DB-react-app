import React from 'react';
import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/"> <Icon type="home" style={{ fontSize: 30, marginBottom: 3 }} /></a>
    </Menu.Item>
    {/* <SubMenu title={<span>Blogs</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu> */}
  </Menu>
  )
}

export default LeftMenu