import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Top from "../components/Top/Top";
import ChannelList from "../components/ChannelList/ChannelList";
import Channel from "../components/Channel/Channel";
import "./Chat.scss";

function Chat({ match }) {
  return (
    <Router>
      <div className="chat-page">
        <Switch>
          <Route path={match.path} exact render={() => <ChannelList />} />

          <Route
            path={match.path + "/:channel"}
            render={() => (
              <>
                <Top />
                <Channel />
              </>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Chat;
