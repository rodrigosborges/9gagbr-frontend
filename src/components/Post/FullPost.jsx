import React from 'react';
import Post from './Post';
import Comment from './Comment';
import '../../css/Post.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import {Validate} from '../../utils/validation'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            post:{},
            comments: [],
            comment: "",
            validations:{},
            validationErrors: {}
        }
    }
    
    componentDidMount(){
        this._getPost()
        this._setValidations()
        this.setState({
            user_id: localStorage.getItem('user_id')
        })
    }

    componentDidUpdate(previousProps){
        if (previousProps.post_id !== this.props.post_id) {
            this._getPost()
        }
    }

    _setValidations(){
        var validations = {}

        validations['comment'] = {
            'required'  : true,
            'minLength' : 3,
            'maxLength' : 255,
        }

        this.setState({validations})
    }
    
    handleChange(event){
        event.persist()
        let change = {}
        change[event.target.name] = event.target.type === 'file' ? event.target.files[0] : event.target.value
        this.setState(change, () => {
            this._inputValidate(event.target.name)
        })
    }

    sendComment(){
        if(!this.state.user_id){
            window.location.replace('/login')
        }

        if(this._inputValidate('comment')){
            axios.post(
                'http://'+(process.env.SERVER ? process.env.SERVER : 'localhost:3001')+'/comment/', {
                    'message': this.state.comment,
                    'user_id': this.state.user_id,
                    'post_id': this.state.post.id
                },
            ).then((res) => {
                if(res.data.message == "Post comentado com sucesso"){
                    this.setState({comment:""})
                    this._getPost()
                }else{
                    this.setState({
                        validationErrors:{
                            'comment': 'Não foi possivel cadastrar o comentário.'
                        }
                    })
                }
            })
        }
    }


    _inputValidate(key){
        var field = Validate(this.state[key], this.state.validations[key])

        if(field.valid == false){
            this.setState(prevState => {
                let validationErrors = Object.assign({}, prevState.validationErrors);
                validationErrors[key] = field.message;
                return { validationErrors };
            })
        }else{
            this.setState(prevState => {
                let validationErrors = Object.assign({}, prevState.validationErrors);
                validationErrors[key] = "";
                return { validationErrors };
            })
        }

        return field.valid
    }

    _getPost(){
        axios.get('http://'+(process.env.SERVER ? process.env.SERVER : 'localhost:3001')+'/post/find/'+this.props.post_id)
        .then((res) => {
            var post = res.data

            if(!post)
                window.location.replace('/404')
                        
            var comments = post.comments.map(comment => {
                return {
                    name: comment.user.name, //alterar para nome do usuario
                    message: comment.message,
                    date: this._formatDate(comment.createdAt) 
                }
            })

            var liked = false
            var unliked = false

            post.positives.map(positive => {
                if(positive.user_id == 1)
                    liked = true
            })

            post.negatives.map(negative => {
                if(negative.user_id == 1)
                    unliked = true
            })

            this.setState({
                post: {
                    id: post.id,
                    title: post.title,
                    url: 'http://'+(process.env.SERVER ? process.env.SERVER : 'localhost:3001')+'/storage/post/'+post.path,
                    category: post.category.name,
                    url_category: 'http://'+(process.env.SERVER ? process.env.SERVER : 'localhost:3001')+'/storage/category/'+post.category.path,
                    comments: post.comments.length,
                    time: this._formatDate(post.createdAt),
                    positives: post.positives,
                    negatives: post.negatives
                },
                comments
            })

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
                {this.state.post.id && 
                    <div className="container h-100">
                        <div className="row" key={1}>
                            <div className="col-lg-8 offset-lg-2">
                                <Post 
                                    time={this.state.post.time} 
                                    url_category={this.state.post.url_category} 
                                    positives={this.state.post.positives}
                                    negatives={this.state.post.negatives}
                                    comments={this.state.post.comments} 
                                    category={this.state.post.category} 
                                    title={this.state.post.title} 
                                    url={this.state.post.url}
                                    id={this.state.post.id}
                                    link={false}
                                    user_id={this.state.user_id}
                                />

                                <div className="postContainer">
                                    <div className="row">
                                        <div className="col-md-10 col-sm-9 mt-3 pl-4">
                                            <TextField 
                                                error={this.state.validationErrors['comment'] != "" && this.state.validationErrors['comment'] != undefined}
                                                helperText={this.state.validationErrors['comment'] && this.state.validationErrors['comment']}
                                                value={this.state.comment} 
                                                fullWidth 
                                                id="comment" 
                                                label="Comente algo aqui..." 
                                                name="comment"
                                                variant="outlined"
                                                multiline
                                                margin="dense"
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                        <div className="col-md-2 col-sm-3 pt-3">
                                            <button onClick={() => {this.sendComment()}} className="btn btn-lg button-navbar mt-2">
                                                <i className="fas fa-share"></i>
                                            </button>
                                        </div>
                                    </div>
                        
                                    <h4 className="text-left ml-3 mt-3 mb-3">{this.state.post.comments+" comentário"+(this.state.post.comments != 1 ? "s" : "")}</h4>
                                    {this.state.comments.map((comment, key) => (
                                        <div className="ml-2" key={key}>    
                                            <Comment
                                                name={comment.name}
                                                date={comment.date}
                                                message={comment.message}
                                            />
                                            <hr/>
                                        </div>    
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}