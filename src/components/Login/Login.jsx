import React from 'react';
import '../../starsnight.css'
import Logo from '../../icon.png'
import { Link } from 'react-router-dom';

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            register: false,
            classForm: "",
        }
    
    }

    _changeForm(register){
        if(this.state.classForm == ""){
            this.setState({
                register,
                classForm: "transition-login-right"
            })
        }else if(this.state.classForm == "transition-login-right"){
            this.setState({
                register,
                classForm: "transition-login-right transition-login-left",
            }, () => {
                this.setState({
                    classForm: "transition-login-left"
                })
            })
        }else{
            this.setState({
                register,
                classForm: "transition-login-right transition-login-left",
            }, () => {
                this.setState({
                    classForm: "transition-login-right"
                })
            })
        }
    }

    render(){
        return (
            <div className="div-content">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className="row h-100">
                    <div className="login-content col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 my-auto">
                        <div className={"login-background"}>
                        </div>
                        <div className={(this.state.register === false ? "form-login-info-right" : "form-login-info-left")+" text-center"}>
                            {this.state.register === false && 
                                <div>
                                    <img className="mt-5" src={Logo}></img>
                                    <div className="my-5">
                                        <span className="form-login-info-title">Ainda não possui conta?</span>
                                    </div>
                                    <div>
                                        <button onClick={() => {this._changeForm(true)}} className="btn btn-lg button-navbar">
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            }
                            {this.state.register === true && 
                                <div>
                                    <img className="mt-5" src={Logo}></img>
                                    <div className="my-5">
                                        <span className="form-login-info-title">Já possui conta?</span>
                                    </div>
                                    <div>
                                        <button onClick={() => {this._changeForm(false)}} className="btn btn-lg button-navbar">
                                            Entrar
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={"form-login "+(this.state.classForm)}>
                            {this.state.register === false && 
                                <div className="row h-100">
                                    <div className="my-auto col-md-10 offset-md-1 text-center form-color">
                                        <span className="form-login-title">Entrar</span>
                                        <div className="input-field mt-5">
                                            <i className="fas fa-at prefix"></i>
                                            <input id="Nome" type="text" className="validate" />
                                            <label htmlFor="Nome">E-mail</label>
                                        </div>
                                        <div className="input-field mt-5">
                                            <i className="fas fa-key prefix"></i>
                                            <input id="password" type="text" className="validate" />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <button onClick={() => {}} className="btn btn-lg button-navbar">
                                            Entrar
                                        </button>
                                    </div>
                                </div>
                            }
                            {this.state.register === true && 
                                <div className="row h-100">
                                    <div className="my-auto col-md-10 offset-md-1 text-center form-color">
                                        <span className="form-login-title">Registrar</span>
                                        <div className="input-field mt-5">
                                            <i className="fas fa-user prefix"></i>
                                            <input id="Nome" type="text" className="validate" />
                                            <label htmlFor="Nome">Nome</label>
                                        </div>
                                        <div className="input-field mt-5">
                                            <i className="fas fa-at prefix"></i>
                                            <input id="email" type="text" className="validate" />
                                            <label htmlFor="email">E-mail</label>
                                        </div>
                                        <div className="input-field mt-5">
                                            <i className="fas fa-key prefix"></i>
                                            <input id="password" type="text" className="validate" />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <button onClick={() => {}} className="btn btn-lg button-navbar">
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="text-center mt-5">
                            <Link to="/" className="btn btn-lg button-navbar mt-5">
                                Voltar para a página principal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}