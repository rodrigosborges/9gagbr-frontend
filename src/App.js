import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Feed from './screens/Feed'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Feed} />
    </Router>
  );
}

export default App;
