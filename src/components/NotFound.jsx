import React from 'react';
import '../css/404.css'
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {

    render(){
        return (
            <div class="error-content">
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
                    <Link to="/" className="btn button-navbar">
                        Página inicial
                    </Link>
                </div>
            </div>
        )
    }
}