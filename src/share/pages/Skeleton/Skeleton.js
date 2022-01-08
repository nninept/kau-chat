import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Home from "../../../home/pages/Home";
import Lms from "../../../lms/pages/Lms/Lms";
import Chat from "../../../chat/pages/Chat";
import Wiki from "../../../wiki/pages/Wiki";
import "./Skeleton.css";

const Skeleton = ({ match }) => {
  return (
    <div className="Skeleton">
      <Nav className="Links" />
      <Switch>
        <Route exact path={match.path} component={Home} />
        <Route path={match.path + "/lms"} component={Lms} />
        <Route path={match.path + "/chat"} component={Chat} />
        <Route path={match.path + "/wiki"} component={Wiki} />
      </Switch>
    </div>
  );
};

export default Skeleton;
