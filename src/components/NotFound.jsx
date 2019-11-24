import React from 'react';
import '../css/404.css'
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {

    render(){
        return (
            <div className="error-content">
                <div className="error-text">
                    <h1 className="error">Erro 404</h1>
                    <div className="im-sheep">
                        <div className="top">
                            <div className="body"></div>
                            <div className="head">
                                <div className="im-eye one"></div>
                                <div className="im-eye two"></div>
                                <div className="im-ear one"></div>
                                <div className="im-ear two"></div>
                            </div>
                        </div>
                        <div className="im-legs">
                            <div className="im-leg"></div>
                            <div className="im-leg"></div>
                            <div className="im-leg"></div>
                            <div className="im-leg"></div>
                        </div>
                    </div>
                    <h4 className="css">Oops! Essa página não pode ser encontrada!</h4>
                    <Link to="/" className="btn button-navbar">
                        Página inicial
                    </Link>
                </div>
            </div>
        )
    }
}