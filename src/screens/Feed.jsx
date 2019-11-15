import React from 'react';
import Layout from '../components/Layout/Layout'
import Feed from '../components/Feed/Feed'

export default class FeedScreen extends React.Component{
  render (){
    return (
      <div>
        <Layout 
          content={
            <Feed 
              category={this.props.match.params.category ? this.props.match.params.category : ""}
              query={this.props.location.search}
            />
          } 
        />
      </div>
    )
  }
}