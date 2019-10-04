import React from 'react';

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
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

    render(){
        const post_content = this._getPostContent()
        return (
            <div className="postContainer">
                <div className="text-left ml-3 mt-2 form-inline">
                    <img className="img-post-icon" src={this.props.url_category} /> 
                    <div className="mt-1 ml-2"> {this.props.category} · {this.props.time}</div>
                </div>
                <h4 className="text-left ml-3 mt-3 mb-3">{this.props.title}</h4>
                {post_content}
                <div className="mt-3 ml-3 text-left"> {this.props.points} ponto{this.props.points != 1 ? "s" : ""} · {this.props.comments} comentário{this.props.comments != 1 ? "s" : ""}</div>
                <div className="container ml-3 mt-3 mb-2">
                    <div className="row">
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" type="submit" onClick={() => {}}>
                            <i className={"fa fa-arrow-up"} />
                        </button>
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" type="submit" onClick={() => {}}>
                            <i className={"fa fa-arrow-down"} />
                        </button>
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" type="submit" onClick={() => {}}>
                            <i className="fa fa-comment" />
                        </button>
                        <button className="btn button-navbar my-2 my-sm-0 mr-3" type="submit" onClick={() => {}}>
                            <i className="fa fa-share-alt" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}