import React from 'react';
import Post from '../Post/Post';
import axios from 'axios'
import {formatDate} from '../../utils/format'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts : [], 
            page: 1,
            end: false,
        }
        this.handleScroll = this.handleScroll.bind(this)
    }
    
    componentDidMount(){
        this._getPosts(0)
        this.setState({
            user_id: localStorage.getItem('user_id')
        })
        document.getElementById('layout').addEventListener("scroll", this.handleScroll, true);
    }

    componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this._getPosts(0)
        }
    }

    _getPosts(page){
        const params = new URLSearchParams(this.props.query)

        var url = 'https://ninegag-backend.herokuapp.com/post/'

        url += this.props.category ? this.props.category : ( params.get('search') ? "search/" : "" )

        url += '?page='+this.state.page

        var request = this.props.category ? axios.get(url) : ( params.get('search') ? axios.post(url, {search: params.get('search')}) : axios.get(url))

        request
        .then((res) => {
            var posts = page === 0 ? [] : this.state.posts
            if(res.data.data){
                res.data.data.map(post => {
                    posts.push({
                        title: post.title,
                        url: 'https://ninegag-backend.herokuapp.com/storage/post/'+post.path,
                        category: post.category.name,
                        url_category: 'https://ninegag-backend.herokuapp.com/storage/category/'+post.category.path,
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

    handleScroll = e => {
        if(!this.state.end){
            let element = e.target
    
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                this.setState({
                    page: this.state.page+1
                }, () => {
                    this._getPosts(this.state.page)
                })
            }
        }
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
                {this.state.end && (
                    <div className="end-message mt-3 mb-3 text-center">Não há outras publicações no momento</div>
                )}
            </div>
        )
    }
}