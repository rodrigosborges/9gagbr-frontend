import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Feed from './screens/Feed'
import Login from './screens/Login'
import CreatePost from './screens/CreatePost'
import FullPost from './screens/FullPost'
import './css/App.css'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Feed} />
      <Route path="/login" exact component={Login} />
      <Route path="/post/create" exact component={CreatePost} />
      <Route path="/category/:category" exact component={Feed} />
      <Route path="/post/:id" exact component={FullPost} />
    </Router>
  );
}

export default App;
