import React from 'react';
import Logo from '../../icon.png'

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div className="postContainer">
                <div className="text-left ml-3 mt-2 form-inline">
                    <img className="img-post-icon" src={this.props.url_category} /> 
                    <div className="mt-1 ml-2"> {this.props.category} · {this.props.time}</div>
                </div>
                <h4 className="text-left ml-3 mt-3 mb-3">{this.props.title}</h4>
                <img src={this.props.url} className="image-post"/><br/>
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