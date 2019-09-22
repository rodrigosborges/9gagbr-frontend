import React from 'react';
import Logo from '../../icon.png'
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            logado: true
        }
    }

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-md navbar-top">

                <a className="ml-5" href="/">
                    <img src={Logo} className="logo-navbar"></img>
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav ml-3 mr-auto">
                    </ul>

                    {this.state.logado && (
                        <ul className="navbar-nav mx-2">
                            <li className="nav-item">
                                <Link to="/post/create" className="btn button-navbar my-2 my-sm-0 mr-3">
                                        Novo meme
                                </Link>
                            </li>
                        </ul>
                    )}

                    {!this.state.logado && (
                        <ul className="navbar-nav mx-2">
                            <li className="nav-item">
                                <Link to="/login" className="btn button-navbar my-2 my-sm-0 mr-3">
                                    Entrar
                                </Link>
                            </li>
                        </ul>
                    )}

                    <form className="form-inline">
                        <div className="form-group">
                            <input id="procurar" name="procurar" type="text" className="form-control" placeholder="Procurar" />
                            <button className="btn button-navbar ml-2" type="submit">
                                <i className="fa fa-search" />
                            </button>
                        </div>
                    </form>

                </div>
            </nav>
        )
    }
}