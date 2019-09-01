import React from 'react';
import Post from './Post';

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts : [
                {
                    title: 'Primeiro post',
                    url: 'https://img-9gag-fun.9cache.com/photo/awobDdB_460s.jpg'
                },
                {
                    title: 'Segundo post',
                    url: 'https://img-9gag-fun.9cache.com/photo/aKdgXE3_460s.jpg'
                }
            ]
        }
    }

    render(){
        return (
            <div className="container">
                {this.state.posts.map((post, key) => 
                    <div className="row" key={key}>
                        <div className="col-md-6 offset-md-3">
                            <Post title={post.title} url={post.url}/>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}