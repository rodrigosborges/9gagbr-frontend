import React from 'react';
import Post from '../Post/Post';
import axios from 'axios'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts : []
        }
    }
    
    componentDidMount(){
        this._getPosts(0)
        this.setState({
            user_id: localStorage.getItem('user_id')
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this._getPosts(0)
        }
      }

    _getPosts(page){
        const params = new URLSearchParams(this.props.query)

        var url = 'http://localhost:3001/post/'

        url += this.props.category ? this.props.category : ( params.get('search') ? "search/" : "" )

        var request = this.props.category ? axios.get(url) : ( params.get('search') ? axios.post(url, {search: params.get('search')}) : axios.get(url))

        request
        .then((res) => {
            var posts = page === 0 ? [] : this.state.posts
            if(res.data.data){
                res.data.data.map(post => {
                    posts.push({
                        title: post.title,
                        url: 'http://localhost:3001/storage/post/'+post.path,
                        category: post.category.name,
                        url_category: 'http://localhost:3001/storage/category/'+post.category.path,
                        comments: post.comments.length,
                        time: this._formatDate(post.createdAt),
                        id: post.id,
                        positives: post.positives,
                        negatives: post.negatives
                    })
                })
                this.setState({posts})
            }
        })
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
            <div>
                {this.state.posts.map((post, key) => 
                    <div className="row" key={key}>
                        <div className="offset-lg-2 col-lg-8">
                            <Post 
                                time={post.time} 
                                url_category={post.url_category} 
                                positives={post.positives}
                                negatives={post.negatives}
                                comments={post.comments} 
                                category={post.category} 
                                title={post.title} 
                                url={post.url}
                                id={post.id}
                                link={true}
                                user_id={this.state.user_id}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}