import React from 'react';
import FullPost from '../components/Post/FullPost'

export default class FullPostScreen extends React.Component{
  render (){
    return (
      <FullPost 
          post_id={this.props.match.params.id}
      />
    )
  }
}