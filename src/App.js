import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Feed from './screens/Feed'
import Login from './screens/Login'
import './App.css'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Feed} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
