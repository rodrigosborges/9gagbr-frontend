import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Feed from './screens/Feed'
import Login from './screens/Login'
import CreatePost from './screens/CreatePost'
import './css/App.css'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Feed} />
      <Route path="/login" exact component={Login} />
      <Route path="/post/create" exact component={CreatePost} />
    </Router>
  );
}

export default App;
