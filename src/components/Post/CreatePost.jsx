import React from 'react';
import '../../css/Stars.css'
import '../../css/CreatePost.css'
import Form from './Form'

export default class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return (
            <div id="div-content" className="div-background div-background-ext">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className="container my-3">
                    <div className="col-md-10 offset-md-1">
                        <Form />
                    </div>
                </div>
            </div>
        )
    }
}