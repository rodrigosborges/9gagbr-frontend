import React from 'react';
import '../App.css'

class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div className="postContainer">
                <img src={this.props.url} className="image"/><br/>
                <span>{this.props.title}</span>
            </div>
        )
    }
}

export default Post;
