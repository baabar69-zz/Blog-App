import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/posts/Home";
import Navi from "./components/posts/Navi";
import Blogs from "./components/posts/Blogs";
import CreatePost from "./components/posts/CreatePost";
import UpdatePost from "./components/posts/UpdatePost";
import Login from "./components/auth/Auth";
import Logout from "./components/auth/Logout";
import Protected from "./components/auth/Protected";
function App() {
  return (
    <div className="App">
      <Router>
        <Navi />
        <Route path="/blogs">
        <Protected cmp={Blogs} />
        </Route>
        <Route path="/create">
          <Protected cmp={CreatePost} />
        </Route>
        <Route path="/login" render={(props) => <Login {...props} />}></Route>
        <Route
          path="/update/:id"
          render={(props) =>  <UpdatePost {...props} />}
        ></Route>
        <Route path="/logout">
          <Protected cmp={Logout } />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </div>
  );
}

export default App;
