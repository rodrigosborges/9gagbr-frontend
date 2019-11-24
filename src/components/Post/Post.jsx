import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import SweetAlert from 'sweetalert-react';

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            liked: false,
            unliked: false,
            show: false,
            modalTitle: '',
            modalText: '',
            modalResponse: () => {},
        }

        this._share = this._share.bind(this)
        this._focusComment = this._focusComment.bind(this)
        this._deletePost = this._deletePost.bind(this)
    }

    componentDidMount(){
        if(window.location.search.includes('comment'))
            document.getElementById("comment").focus()
            
        this._updateComponent()
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.id !== this.props.id) {
            this._updateComponent()
        }
    }

    _updateComponent(){
        var liked = false
        var unliked = false

        this.props.positives.map(positive => {
            if(positive.user_id == this.props.user_id)
                liked = true
        })

        this.props.negatives.map(negative => {
            if(negative.user_id == this.props.user_id)
                unliked = true
        })

        this.setState({
            liked,
            unliked,
            points: this.props.positives.length - this.props.negatives.length,
            user_id: localStorage.getItem('user_id')
        })
    }

    _getPostContent(){
        var extension = this.props.url.split(".").pop()
        if(['jpg', 'jpeg', 'png', 'gif'].includes(extension)){
            return (
                <img src={this.props.url} className="image-post"/>            
            )
        }else{
            return (
                <video autoPlay muted preload="auto" loop='loop' >
                    <source src={this.props.url} className="image-post" type="video/mp4"/>
                    Seu navegador não suporta esse tipo de vídeo.
                </video>
            )
        }
    }

    _like(liked){

        if(this.props.user_id){

            var data = {
                user_id: this.props.user_id,
                positive: true,
                post_id: this.props.id
            }

            if(this.state.liked == true){
                data.remove = true
                this.setState({
                    liked: false,
                    unliked: false,
                    points: this.state.points-1
                })
            }else{
                this.setState({
                    liked: true,
                    unliked: false,
                    points: this.state.points+(this.state.unliked == false ? 1 : 2)
                })
            }

            axios.post('https://ninegag-backend.herokuapp.com/reaction/', data)
        }else{
            window.location.replace("/login")
        }
    }

    _dislike(unliked){
        
        if(this.props.user_id){
            var data = {
                user_id: this.props.user_id,
                positive: false,
                post_id: this.props.id
            }

            if(this.state.unliked == true){
                data.remove = true
                this.setState({
                    unliked: false,
                    liked: false,
                    points: this.state.points+1
                })
            }else{
                this.setState({
                    unliked: true,
                    liked: false,
                    points: this.state.points-(this.state.liked == false ? 1 : 2)
                })
            }

            axios.post('https://ninegag-backend.herokuapp.com/reaction/', data)
        }else{
            window.location.replace("/login")
        }
    }

    _share(){
        var link = window.location.host+"/post/"+this.props.id
        this.copyToClipboard(link)
    }

    copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    _focusComment(){
        if(window.location.pathname.includes("/post/"))
            document.getElementById("comment").focus()
        else
            window.location.replace("/post/"+this.props.id+"?comment")
    }

    _deletePost(){
        axios.delete('https://ninegag-backend.herokuapp.com/post/'+this.props.id).then((res) => {
            this.setState({
                show: true,
                modalTitle: res.data.message == 'Erro no servidor' ? 'Erro' : 'Sucesso',
                modalText: res.data.message,
                modalResponse: () => {this.setState({show: false})}
            })
            if(res.data.message != 'Erro no servidor')
                this.props._removePost(this.props.key)
        })
    }

    render(){
        const post_content = this._getPostContent()
        return (
            <div className="postContainer">
                <SweetAlert
                    show={this.state.show}
                    title={this.state.modalTitle}
                    text={this.state.modalText}
                    onConfirm={this.state.modalResponse}
                />
                {localStorage.getItem('user_id') == this.props.user_id && window.location.pathname == '/user/posts' && (
                    <div className="button-options">
                        <Link to={`/post/${this.props.id}/edit`} className="btn btn-outline-warning">
                            <i className="fa fa-edit" />
                        </Link>
                        <button onClick={this._deletePost} type="button" className="btn btn-outline-danger ml-2">
                            <i className="fa fa-trash" />
                        </button>
                    </div>
                )}
                <div className="text-left ml-3 mt-2 form-inline">
                    <img className="img-post-icon" src={this.props.url_category} /> 
                    <div className="mt-1 ml-2"> {this.props.category} · {this.props.time}</div>
                </div>
                {this.props.link === true && (
                    <Link to={"/post/"+this.props.id}><h4 className="text-dark text-left ml-3 mt-3 mb-3">{this.props.title}</h4></Link>
                )}
                {this.props.link === false && (
                    <h4 className="text-left ml-3 mt-3 mb-3">{this.props.title}</h4>
                )}
                {post_content}
                <div className="mt-3 ml-3 text-left"> {this.state.points} ponto{this.state.points != 1 && this.state.points != -1 ? "s" : ""} · {this.props.comments} comentário{this.props.comments != 1 ? "s" : ""}</div>
                <div className="container ml-3 mt-3 mb-2">
                    <div className="row">
                        <button className={"btn button-navbar my-2 my-sm-0 mr-3 " + (this.state.liked == true ? "active" : "")} onClick={() => {this._like()}}>
                            <i className={"fa fa-arrow-up"} />
                        </button>
                        <button className={"btn button-navbar my-2 my-sm-0 mr-3 " + (this.state.unliked == true ? "active" : "")} onClick={() => {this._dislike()}}>
                            <i className={"fa fa-arrow-down"} />
                        </button>
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" onClick={this._focusComment}>
                            <i className="fa fa-comment" />
                        </button>
                        <button type="button" className="btn button-navbar my-2 my-sm-0 mr-3" data-toggle="tooltip" data-placement="top" title="Clique para copiar o link" onClick={this._share}>
                            <i className="fa fa-share-alt" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}