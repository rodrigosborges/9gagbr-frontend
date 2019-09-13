import React from 'react';
import Post from './Post';
import '../../starsnight.css'
import axios from 'axios'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
        this._getPosts()
    }

    _getPosts(){
        axios.get('http://localhost:3001/post/')
        .then((res) => {
            var posts = this.state.posts
            res.data.data.map(post => {
                posts.push({
                    title: post.title,
                    url: 'http://localhost:3001/storage/post/'+post.path,
                    category: post.category.name,
                    url_category: 'http://localhost:3001/storage/category/'+post.category.path,
                    time: this._formatDate(post.createdAt)
                })
            })
            this.setState({posts})
        })
    }

    _formatDate(date){
        var datetime = new Date(date);
        var now = new Date();
        var sec_num = (now - datetime) / 1000;
        var months    = Math.floor(sec_num / (3600 * 24* 30));
        var days    = Math.floor(sec_num / (3600 * 24));
        var hours   = Math.floor((sec_num - (days * (3600 * 24)))/3600);
        var minutes = Math.floor((sec_num - (days * (3600 * 24)) - (hours * 3600)) / 60);
        var seconds = Math.floor(sec_num - (days * (3600 * 24)) - (hours * 3600) - (minutes * 60));
    
        // if (hours   < 10) {hours   = "0"+hours;}
        // if (minutes < 10) {minutes = "0"+minutes;}
        // if (seconds < 10) {seconds = "0"+seconds;}

        if(months > 0)
            return months+" meses"
        else if(days > 0)
            return days+" dias"
        else if(hours > 0)
            return hours+" horas"
        else if(minutes > 0)
            return minutes+" minutos"
        else
            return seconds+" segundos"
    
    }

    render(){
        return (
            <div id="div-content" className="div-background">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className="container">
                    {this.state.posts.map((post, key) => 
                        <div className="row" key={key}>
                            <div className="offset-lg-2 col-lg-8">
                                <Post time={post.time} url_category={post.url_category} category={post.category} title={post.title} url={post.url}/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}