import React from 'react';
import Logo from '../icon.png'

export default class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-md navbar-top">

                <button className="btn button-navbar my-2 my-sm-0 mr-3" type="submit" onClick={() => this.props.onSetSidebarOpen(!this.props.sidebarOpen)}>
                    <i className={"fa fa-"+(!this.props.sidebarOpen ? 'list' : 'close')} />
                </button>

                <a className="" href="/">
                    <img src={Logo} className="logo-navbar"></img>
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Aleatório</a>
                        </li>
                    </ul>

                    <form className="form-inline my-2 my-lg-0">
                        <input name="procurar" className="form-control mr-sm-2" type="search" placeholder="Procurar" aria-label="Procurar" />
                        <button className="btn button-navbar my-2 my-sm-0" type="submit">
                            <i className="fa fa-search" />
                        </button>
                    </form>

                </div>
            </nav>
        )
    }
}