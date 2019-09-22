import React from 'react'
import '../../css/Stars.css'
import '../../css/Login.css'
import Logo from '../../icon.png'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            toRegister: false,
            classForm: "",
            register: {
                name: '',
                email: '',
                password: '',
            },
            login: {
                email: '',
                password: '',
            },
        }
    
    }

    _login(){
    }

    _register(){
        axios.post('http://localhost:3001/user/', this.state.register)
        .then((res) => {
            console.log(res.data.message)
        })
    }

    _changeForm(toRegister){
        if(this.state.classForm === ""){
            this.setState({
                toRegister,
                classForm: "transition-login-right"
            })
        }else if(this.state.classForm === "transition-login-right"){
            this.setState({
                toRegister,
                classForm: "transition-login-right transition-login-left",
            }, () => {
                this.setState({
                    classForm: "transition-login-left"
                })
            })
        }else{
            this.setState({
                toRegister,
                classForm: "transition-login-right transition-login-left",
            }, () => {
                this.setState({
                    classForm: "transition-login-right"
                })
            })
        }
    }

    resize = () => this.forceUpdate()

    componentDidMount() {
      window.addEventListener('resize', this.resize)
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.resize)
    }

    render(){
        return (
            <div className="div-content div-background">
                <div id='stars'></div>
                <div id='stars2'></div>
                <div id='stars3'></div>
                <div className="row h-100">
                    <div className="login-content col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 my-auto">
                        <div className={"login-background"}>
                        </div>
                        <div className={(this.state.toRegister === false ? "form-login-info-right" : "form-login-info-left")+" text-center"}>
                            {this.state.toRegister === false && 
                                <div className={window.innerWidth < 800 ? "row mb-3" : ""}>
                                    <div className={window.innerWidth < 800 ? "col-4 offset-2 my-auto" : ""}>
                                        <img src={Logo}></img>
                                    </div>
                                    <div className={window.innerWidth < 800 ? "col-4 my-auto" : ""}>
                                        <div className={window.innerWidth < 800 ? "mb-4 mt-4" : "my-5"}>
                                            <span className="form-login-info-title">Não possui conta?</span>
                                        </div>
                                        <div  className={window.innerWidth < 800 ? "mb-4" : ""}>
                                            <button onClick={() => {this._changeForm(true)}} className="btn btn-lg button-navbar">
                                                Registrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.toRegister === true && 
                                <div className={window.innerWidth < 800 ? "row mt-4" : ""}>
                                    <div className={window.innerWidth < 800 ? "col-4 offset-2 my-auto" : ""}>
                                        <img src={Logo}></img>
                                    </div>
                                    <div className={window.innerWidth < 800 ? "col-4 my-auto" : ""}>
                                        <div className={window.innerWidth < 800 ? "mt-2" : "my-5"}>
                                            <span className="form-login-info-title">Já possui conta?</span>
                                        </div>
                                        <div  className={window.innerWidth < 800 ? "mt-4" : ""}>
                                            <button onClick={() => {this._changeForm(false)}} className="btn btn-lg button-navbar">
                                                Entrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={"form-login "+(this.state.classForm)}>
                            {this.state.toRegister === false && 
                                <div className="row h-100">
                                    <div className="my-auto col-md-10 offset-md-1 text-center form-color">
                                        <span className="form-login-title">Entrar</span>
                                        <div className="col-12 mt-5">
                                            <Grid container  alignItems="flex-end">
                                                <Grid item  xs={1}>
                                                    <i className="fas fa-at fa-lg"></i>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField 
                                                        defaultValue={this.state.login.email} 
                                                        fullWidth 
                                                        id="input-with-icon-grid" 
                                                        label="E-mail" 
                                                        onChange={(e) => {this.setState({
                                                            login: {
                                                                ...this.state.login,
                                                                email: e.target.value
                                                            }
                                                        })}} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <Grid container  alignItems="flex-end">
                                                <Grid item  xs={1}>
                                                    <i className="fas fa-key fa-lg"></i>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField 
                                                        defaultValue={this.state.login.password} 
                                                        type="password" 
                                                        fullWidth 
                                                        id="input-with-icon-grid" 
                                                        label="Password" 
                                                        onChange={(e) => {this.setState({
                                                            login: {
                                                                ...this.state.login,
                                                                password: e.target.value
                                                            }
                                                        })}} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <button onClick={() => {}} className="btn btn-lg button-navbar mt-5">
                                            Entrar
                                        </button>
                                    </div>
                                </div>
                            }
                            {this.state.toRegister === true && 
                                <div className="row h-100">
                                    <div className="my-auto col-md-10 offset-md-1 text-center form-color">
                                        <span className="form-login-title">Registrar</span>
                                        <div className="col-12 mt-5">
                                            <Grid container  alignItems="flex-end">
                                                <Grid item  xs={1}>
                                                    <i className="fas fa-user fa-lg"></i>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField 
                                                        defaultValue={this.state.register.name} 
                                                        fullWidth 
                                                        id="input-with-icon-grid" 
                                                        label="Nome" 
                                                        onChange={(e) => {this.setState({
                                                            register: {
                                                                ...this.state.register,
                                                                name: e.target.value
                                                            }
                                                        })}} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <Grid container  alignItems="flex-end">
                                                <Grid item  xs={1}>
                                                    <i className="fas fa-at fa-lg"></i>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField 
                                                        defaultValue={this.state.register.email} 
                                                        fullWidth 
                                                        id="input-with-icon-grid" 
                                                        label="E-mail"
                                                        onChange={(e) => {this.setState({
                                                            register: {
                                                                ...this.state.register,
                                                                email: e.target.value
                                                            }
                                                        })}} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <Grid container  alignItems="flex-end">
                                                <Grid item  xs={1}>
                                                    <i className="fas fa-key fa-lg"></i>
                                                </Grid>
                                                <Grid item xs={11}>
                                                    <TextField 
                                                        defaultValue={this.state.register.password} 
                                                        onChange={(e) => {this.setState({
                                                            register: {
                                                                ...this.state.register,
                                                                password: e.target.value
                                                            }
                                                        })}} 
                                                        type="password" 
                                                        fullWidth 
                                                        id="input-with-icon-grid" 
                                                        label="Password" 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <button onClick={() => {this._register()}} className="btn btn-lg button-navbar mt-5">
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="text-center mt-5">
                            <Link to="/" className="btn btn-lg button-navbar">
                                Voltar para a página principal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}