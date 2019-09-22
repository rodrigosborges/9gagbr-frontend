import React from 'react';
import Layout from '../components/Layout/Layout'
import CreatePost from '../components/Post/CreatePost'

export default class CreatePostScreen extends React.Component{
  render (){
    return (
      <div>
        <Layout 
          content={<CreatePost />} 
        />
      </div>
    )
  }
}