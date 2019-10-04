import React from 'react';
import Layout from '../components/Layout/Layout'
import FullPost from '../components/Post/FullPost'

export default class FullPostScreen extends React.Component{
  render (){
    return (
      <div>
        <Layout 
          content={
            <FullPost 
                post_id={this.props.match.params.id}
            />
          } 
        />
      </div>
    )
  }
}