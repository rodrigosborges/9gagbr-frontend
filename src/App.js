import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Feed from './screens/Feed'
import Login from './screens/Login'
import FormPost from './screens/FormPost'
import FullPost from './screens/FullPost'
import './css/App.css'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Feed} />
      <Route path="/login" exact component={Login} />
      <Route path="/post/:id" component={FullPost} />
      <Route path="/post/:id/edit" exact component={FormPost} />
      <Route path="/post/create" exact component={FormPost} />
      <Route path="/category/:category" exact component={Feed} />
    </Router>
  );
}

export default App;
