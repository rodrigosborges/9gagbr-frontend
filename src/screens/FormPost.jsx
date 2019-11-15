import React from 'react';
import Layout from '../components/Layout/Layout'
import Form from '../components/Post/Form'
import '../css/Stars.css'
import '../css/CreatePost.css'

export default class CreatePostScreen extends React.Component{
  
  render (){
    const content = (
      <div id="div-content" className="div-background div-background-ext">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div className="container my-3">
          <div className="col-md-10 offset-md-1">
            <Form 
              id={this.props.match.params.id ? this.props.match.params.id : null}
            />
          </div>
        </div>
      </div>
    )
    
    return (
      <div>
        <Layout 
          content={content} 
        />
      </div>
    )
    
  }
}