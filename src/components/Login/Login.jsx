import React from 'react';
import '../../starsnight.css'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="div-content">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className="row h-100">
                    <div className="login-content col-md-8 offset-md-2 my-auto">
                        <div class="login-background"></div>
                        <div class="form-login col-md-8">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}