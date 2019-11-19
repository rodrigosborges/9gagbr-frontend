import React from 'react';
import Form from '../components/Post/Form'

export default class CreatePostScreen extends React.Component{
  
  render (){    
    return (
      <Form 
        id={this.props.match.params.id ? this.props.match.params.id : null}
      />
    )
  }
}