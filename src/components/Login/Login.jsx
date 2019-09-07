import React from 'react';
import '../../starsnight.css'
import Logo from '../../icon.png'
import {SlideInRight, SlideInLeft} from 'react-animations'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            register: false
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
                        <div className="login-background">
                        </div>
                        <div className="form-login-info text-center">
                            <img className="mt-5" src={Logo}></img>
                            {this.state.register === false && 
                                <div>
                                    <div className="my-5">
                                        <span class="form-login-info-title">Ainda não possui conta?</span>
                                    </div>
                                    <div>
                                        <button onClick={() => this._changeRegister(true)} className="btn btn-lg button-navbar">
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            }
                            {this.state.register === true && 
                                <div>
                                    <div className="my-5">
                                        <span class="form-login-info-title">Já possui conta?</span>
                                    </div>
                                    <div>
                                        <button onClick={() => this._changeRegister(false)} className="btn btn-lg button-navbar">
                                            Entrar
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="form-login">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}