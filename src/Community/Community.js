import {useState, useEffect} from 'react'
import {Route} from "react-router-dom";
import PostList from "./pages/PostList/PostList"
import PostContents from "./pages/PostContents/PostContents"
import "./Community.css"

function Community({match}) {

    return (
        <div className="community">
        <Route exact path={match.path} render={()=><PostList />}/>
        <Route path={match.path + "/article"} component={PostContents}/>
    </div>
    );
}

export default Community;

