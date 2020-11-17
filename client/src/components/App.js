import './App.css';
import { Route, Switch } from "react-router-dom";
import  Home  from "./Home";
import Login from "./LoginRegister";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" component={ Home } />
        <Route path="/login" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
