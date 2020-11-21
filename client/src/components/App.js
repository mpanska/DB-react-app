import './App.css';
import { Route, Switch } from "react-router-dom";
import  Home  from "./Home";
import Login from "./LoginRegister";
import Register from "./LoginRegister/register";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={ Home } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
      </Switch>
    </div>
  );
}

export default App;
