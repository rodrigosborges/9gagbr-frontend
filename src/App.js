import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Feed from './screens/Feed'
import Login from './screens/Login'
import FormPost from './screens/FormPost'
import FullPost from './screens/FullPost'
import NotFound from './screens/NotFound'
import './css/App.css'
import axios from 'axios'

export default class App extends React.Component {

  componentDidMount(){
    var data = {
      user_id: localStorage.getItem('user_id'),
      token: localStorage.getItem('token')
    }

    axios.post('http://localhost:3001/user/checkauth', data)
    .then((res) => {
      if(!res.data){
        localStorage.removeItem('user_id')
        localStorage.removeItem('token')
      }
    })
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/login" exact component={Login} />
          <Route path="/post/create" exact component={FormPost} />
          <Route path="/post/:id" exact component={FullPost} />
          <Route path="/post/:id/edit" exact component={FormPost} />
          <Route path="/category/:category" exact component={Feed} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
