import React from 'react';
import Post from './Post';
import Comment from './Comment';
import '../../css/Stars.css'
import '../../css/Post.css'
import axios from 'axios'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post : {
                title: "Teste",
                url: 'http://localhost:3001/storage/post/12312312341.gif',
                category: "Animais",
                url_category: 'http://localhost:3001/storage/category/animais.jpg',
                points: 10,
                comments: 5,
                time: "10 dias"
            },
            comments: [
                {
                    name: 'Rodrigo',
                    date: '5 horas',
                    message: "Comentário 1"
                },
                {
                    name: 'Gabi',
                    date: '1 dia',
                    message: "Comentário 2"
                }
            ]
        }
    }
    
    // componentDidMount(){
    //     this._getPost()
    // }

    _getPosts(){
        // axios.get('http://localhost:3001/post/'+this.props.post_id)
        // .then((res) => {
        //     var post = res.data

        //     this.setState({
        //         title: post.title,
        //         url: 'http://localhost:3001/storage/post/'+post.path,
        //         category: post.category.name,
        //         url_category: 'http://localhost:3001/storage/category/'+post.category.path,
        //         points: post.positives.length - post.negatives.length,
        //         comments: post.comments.length,
        //         time: this._formatDate(post.createdAt)
        //     })

        //     this.setState({post})
        // })
    }

    _formatDate(date){
        var datetime = new Date(date);
        var now = new Date();
        var sec_num = (now - datetime) / 1000;
        var years    = Math.floor(sec_num / (3600 * 24* 30* 12));
        var months    = Math.floor(sec_num / (3600 * 24* 30));
        var days    = Math.floor(sec_num / (3600 * 24));
        var hours   = Math.floor((sec_num - (days * (3600 * 24)))/3600);
        var minutes = Math.floor((sec_num - (days * (3600 * 24)) - (hours * 3600)) / 60);
        var seconds = Math.floor(sec_num - (days * (3600 * 24)) - (hours * 3600) - (minutes * 60));

        if(years > 0)
            return years+" ano"+(years > 1 ? "s" : "")
        else if(months > 0)
            return months+" mes"+(months > 1 ? "es" : "")
        else if(days > 0)
            return days+" dia"+(days > 1 ? "s" : "")
        else if(hours > 0)
            return hours+" hora"+(hours > 1 ? "s" : "")
        else if(minutes > 0)
            return minutes+" minuto"+(minutes > 1 ? "s" : "")
        else
            return seconds+" segundo"+(seconds > 1 ? "s" : "")
    }

    render(){
        return (
            <div id="div-content" className="div-background">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className="container h-100">
                    <div className="row" key={1}>
                        <div className="col-lg-8">
                            <Post 
                                time={this.state.post.time} 
                                url_category={this.state.post.url_category} 
                                points={this.state.post.points}
                                comments={this.state.post.comments} 
                                category={this.state.post.category} 
                                title={this.state.post.title} 
                                url={this.state.post.url}
                            />
                        </div>
                        <div className="col-lg-4">
                            <div className="postContainer">
                                {this.state.comments.map((comment, key) => (
                                    <div key={key}>    
                                        <Comment
                                            name={comment.name}
                                            date={"5 dias"}
                                            message={"Comentário teste"}
                                        />
                                        <hr/>
                                    </div>    
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}