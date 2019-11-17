import React from 'react';
import Layout from '../components/Layout/Layout'
import NotFound from '../components/NotFound'

export default class NotFoundScreen extends React.Component{
  render (){
    return (
      <div>
        <Layout 
          content={<NotFound/>} 
        />
      </div>
    )
  }
}