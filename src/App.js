import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Layout from './components/Layout/Layout'
import Feed from './screens/Feed'
import Login from './screens/Login'
import FormPost from './screens/FormPost'
import FullPost from './screens/FullPost'
import NotFound from './screens/NotFound'
import UserPosts from './screens/UserPosts'
import './css/App.css'
import axios from 'axios'

/*eslint-disable */

function RouteWithLayout({layout, component, ...rest}){
  return (
    <Route {...rest} render={(props) =>
      React.createElement( layout, props, React.createElement(component, props))
    }/>
  );
}

export default class App extends React.Component {

  componentDidMount(){
    var data = {
      user_id: localStorage.getItem('user_id'),
      token: localStorage.getItem('token')
    }

    axios.post(('http://34.95.246.158')+'/user/checkauth', data)
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
          <Route path="/login" exact component={localStorage.getItem('user_id') ? Redirect : Login} />
          <RouteWithLayout layout={Layout} path='/404' exact component={NotFound} />
          <RouteWithLayout layout={Layout} path="/" exact component={Feed} />

          <RouteWithLayout layout={Layout} path="/post/create" exact component={!localStorage.getItem('user_id') ? Redirect : FormPost} />

          <RouteWithLayout layout={Layout} path="/post/:id" exact component={FullPost}/>

          <RouteWithLayout layout={Layout} path="/post/:id/edit" exact component={!localStorage.getItem('user_id') ? Redirect : FormPost} />
          <RouteWithLayout layout={Layout} path="/category/:category" exact component={Feed} />
          <RouteWithLayout layout={Layout} path="/user/posts" exact component={!localStorage.getItem('user_id') ? Redirect : UserPosts} />
          <Redirect to='/404' />
        </Switch>
      </Router>
    );
  }
}
