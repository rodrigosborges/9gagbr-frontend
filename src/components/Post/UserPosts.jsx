import React from 'react';
import Post from './Post';
import axios from 'axios'
import {formatDate} from '../../utils/format'

export default class UserPosts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts : [],
            end: false,
        }
        this._removePost = this._removePost.bind(this)
    }
    
    componentDidMount(){
        this.setState({
            user_id: localStorage.getItem('user_id')
        }, () => {
            this._getPosts(0)
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this._getPosts(0)
        }
    }

    _getPosts(page){
        const params = new URLSearchParams(this.props.query)

        var url = ('http://34.95.246.158')+'/post/user/'+this.state.user_id

        var request = axios.get(url)

        request
        .then((res) => {
            var posts = page === 0 ? [] : this.state.posts
            if(res.data.data){
                res.data.data.map(post => {
                    posts.push({
                        title: post.title,
                        url: ('http://34.95.246.158')+'/storage/post/'+post.path,
                        category: post.category.name,
                        url_category: ('http://34.95.246.158')+'/storage/category/'+post.category.path,
                        comments: post.comments.length,
                        time: formatDate(post.createdAt),
                        id: post.id,
                        positives: post.positives,
                        negatives: post.negatives
                    })
                })
                this.setState({
                    posts,
                    end: (res.data.data.length == 0 ? true : false),
                })
            }
        })
    }

    _removePost(key){
        var posts = this.state.posts
        posts.splice(key,1)
        this.setState({
            posts,
            end: posts.length == 0 ? true : false
        })
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
                                key={key}
                                _removePost={this._removePost}
                            />
                        </div>
                    </div>
                )}
                {this.state.end && (
                    <div className="end-message mt-3 mb-3 text-center">Não há outras publicações no momento</div>
                )}
            </div>
        )
    }
}