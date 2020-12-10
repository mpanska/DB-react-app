import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import UploadProduct from './views/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';
import AdminPage from './views/AdminPage/AdminPage';
import UsersPanel from './views/AdminPage/UsersPanel';
import ProductsPanel from './views/AdminPage/ProductsPanel';


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProduct, true, null, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, null)} /> 
          <Route exact path="/history" component={Auth(HistoryPage, true)} /> 

          <Route exact path="/admin" component={Auth(AdminPage, true, true)} /> 
          <Route exact path="/admin/userpanel" component={Auth(UsersPanel, true)} /> 
          <Route exact path="/admin/productpanel" component={Auth(ProductsPanel, true)} /> 

        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
