import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Layout from './components/Layout/Layout'
import Feed from './screens/Feed'
import Login from './screens/Login'
import FormPost from './screens/FormPost'
import FullPost from './screens/FullPost'
import NotFound from './screens/NotFound'
import './css/App.css'
import axios from 'axios'
import './css/Stars.css'
import './css/CreatePost.css'

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
        {window.location.pathname != '/login' && (
          <Layout>
            <div id="div-content" className="div-background div-background-ext">
              <div id='stars'></div>
              <div id='stars2'></div>
              <div id='stars3'></div>
              <div className="container my-3">
                <div className="col-md-10 offset-md-1">
                  <Switch>
                    <Route path="/" exact component={Feed} />

                    <Route path="/post/create" exact render={(props) => (
                      localStorage.getItem('token') 
                      && (<FormPost {...props}/>)
                      || (<NotFound />)
                    )} />

                    <Route path="/post/:id" exact component={FullPost}/>

                    <Route path="/post/:id/edit" exact component={FormPost} />
                    <Route path="/category/:category" exact component={Feed} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </div>
          </Layout>
        ) || (
          <Route path="/login" exact component={Login} />
        )}
      </Router>
    );
  }
}
