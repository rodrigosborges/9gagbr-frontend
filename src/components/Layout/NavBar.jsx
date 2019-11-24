import React from 'react';
import Logo from '../../icon.png'
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user_id: null
        }
    }

    componentDidMount(){
        this.setState({
            user_id: localStorage.getItem('user_id')
        })
    }

    _logout(){
        localStorage.removeItem('user_id')
        localStorage.removeItem('token')
        window.location.replace('/')
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

                <div className="collapse navbar-collapse center-navbar" id="navbarSupportedContent">

                    <ul className="navbar-nav ml-3 mr-auto">
                    </ul>

                    {this.state.user_id && (
                        <ul className="navbar-nav mx-2 my-2">
                            <li className="nav-item">
                                <Link to="/post/create" className="btn btn-block button-navbar my-2 my-sm-0 mr-3">
                                    Publicar
                                </Link>
                            </li>
                        </ul>
                    )}

                    {this.state.user_id && (
                        <ul className="navbar-nav mx-2 my-2">
                            <li className="nav-item">
                                <Link to="/user/posts" className="btn btn-block button-navbar my-2 my-sm-0 mr-3">
                                    Minhas publicações
                                </Link>
                            </li>
                        </ul>
                    )}

                    {!this.state.user_id && (
                        <ul className="navbar-nav mx-2 my-2">
                            <li className="nav-item">
                                <Link to="/login" className="btn btn-block button-navbar my-2 my-sm-0 mr-3">
                                    Entrar
                                </Link>
                            </li>
                        </ul>
                    )}

                    {this.state.user_id && (
                        <ul className="navbar-nav mx-2 my-2">
                            <li className="nav-item">
                                <button onClick={this._logout} className="btn btn-block button-navbar my-2 my-sm-0 mr-3">
                                    Sair
                                </button>
                            </li>
                        </ul>
                    )}

                    <form action="/" className="form-inline mx-2 my-2">
                        <div class="input-group flex-fill">
                            <input id="procurar" name="search" type="text" className="form-control" placeholder="Procurar" />
                            <div class="input-group-append">
                                <button className="btn button-navbar ml-2" type="submit">
                                    <i className="fa fa-search" />
                                </button>                            
                            </div> 
                        </div>
                           
                    </form>

                </div>
            </nav>
        )
    }
}