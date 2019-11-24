import React from 'react';
import Feed from '../components/Feed/Feed'

export default class FeedScreen extends React.Component{

  render (){
    return (
      <Feed
        category={this.props.match.params.category ? this.props.match.params.category : ""}
        query={this.props.location.search}
      />
    )
  }
}