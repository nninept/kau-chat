import "./App.scss";
import Home from "./home/pages/Home"
import Skeleton from "./share/pages/Skeleton/Skeleton"
import Login from "./login/pages/Login"
import { HashRouter as Router, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Skeleton} /> 
    </Router>
    )
}

export default App;