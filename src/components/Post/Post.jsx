import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            liked: false,
            unliked: false
        }
    }

    componentDidMount(){
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
            points: this.props.positives.length - this.props.negatives.length
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

    _checkLogin(){
        if(!this.props.user_id)
            window.location.replace("/login")
    }

    _like(liked){

        this._checkLogin()

        var data = {
            user_id: this.props.user_id,
            positive: true,
            post_id: this.props.id
        }

        if(this.state.liked == true){
            data.remove = true
            this.setState({
                liked: false,
            })
        }else{
            this.setState({
                liked: true,
            })
        }

        axios.post('http://localhost:3001/reaction/', data)
    }

    _dislike(unliked){

        this._checkLogin()
        
        var data = {
            user_id: this.props.user_id,
            positive: false,
            post_id: this.props.id
        }

        if(this.state.unliked == true){
            data.remove = true
            this.setState({
                unliked: false,
            })
        }else{
            this.setState({
                unliked: true,
            })
        }

        axios.post('http://localhost:3001/reaction/', data)
    }

    render(){
        const post_content = this._getPostContent()
        return (
            <div className="postContainer">
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
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" onClick={() => {}}>
                            <i className="fa fa-comment" />
                        </button>
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" onClick={() => {}}>
                            <i className="fa fa-share-alt" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}