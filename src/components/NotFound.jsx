import React from 'react';
import '../css/Stars.css'
import '../css/Post.css'
import '../css/404.css'

export default class NotFound extends React.Component {

    render(){
        return (
            <div id="div-content" className="div-background">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div class="error-content">
                <div class="row">
                        <div class="col-md-12 ">
                            <div class="error-text">
                                <h1 class="error">Erro 404</h1>
                                <div class="im-sheep">
                                    <div class="top">
                                        <div class="body"></div>
                                        <div class="head">
                                            <div class="im-eye one"></div>
                                            <div class="im-eye two"></div>
                                            <div class="im-ear one"></div>
                                            <div class="im-ear two"></div>
                                        </div>
                                    </div>
                                    <div class="im-legs">
                                        <div class="im-leg"></div>
                                        <div class="im-leg"></div>
                                        <div class="im-leg"></div>
                                        <div class="im-leg"></div>
                                    </div>
                                </div>
                                <h4 class="css">Oops! Essa página não pode ser encontrada!</h4>
                                <a href="./" class="btn button-navbar ">Página inicial</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}