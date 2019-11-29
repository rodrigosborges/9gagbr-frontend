import React from 'react'
import '../../css/Stars.css'
import '../../css/Login.css'
import Logo from '../../icon.png'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import {validate, inputValidate, handleChange} from '../../utils/form'

export default class Feed extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            toRegister: false,
            classForm: "",
            register_name: '',
            register_email: '',
            register_password: '',
            login_email: '',
            login_password: '',
            show: false,
            modalBody: '',
            modalTitle: '',
            modalClose: () => {},
            validations:{},
            validationErrors: {}
        }

        this._login = this._login.bind(this)
        
        this._register = this._register.bind(this)

        this.inputValidate = inputValidate.bind(this)
        this.validate = validate.bind(this)
        this.handleChange = handleChange.bind(this)

    }

    componentWillMount(){
        this._setValidations()
    }
    
    _login(){
        if(this.inputValidate('login_email') && this.inputValidate('login_password')){
            var login = {
                email: this.state.login_email,
                password: this.state.login_password
            }

            axios.post(('http://34.95.246.158')+'/user/login', login)
            .then((res) => {
                if(res.data.message == 'E-mail ou senha incorretos'){
                    this.setState({
                        show: true,
                        modalTitle: 'Erro',
                        modalBody: res.data.message,
                        modalClose: () => {this.setState({show:false})}
                    })
                }else{
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user_id', res.data.user_id)
                    window.location.replace("/")
                }
            })
        }
    }

    _register(){
        if(this.inputValidate('register_email') && this.inputValidate('register_password') && this.inputValidate('register_name')){
            var register = {
                name: this.state.register_name,
                email: this.state.register_email,
                password: this.state.register_password
            }

            axios.post(('http://34.95.246.158')+'/user/', register)
            .then((res) => {
                var success = res.data.message == 'Usuario cadastrado com sucesso'

                var funcao = () => {
                    if(success)
                        document.getElementById("entrar").click()
                    
                    this.setState({
                        login_email: success ? this.state.register_email : this.state.login_email,
                        register_name: '',
                        register_email: '',
                        register_password: '',
                        show: false,
                    })
                }

                this.setState({
                    show: true,
                    modalTitle: success ? 'Sucesso' : 'Erro',
                    modalBody: res.data.message,
                    modalClose: funcao
                })
            })
        }
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

    _setValidations(){
        var validations = {}

        validations['login_email'] = {
            'required'  : true,
            'email'         :true,
        }

        validations['login_password'] = {
            'required'  : true,
            'minLength'       : 8,
            'maxLength'       : 50,
        }

        validations['register_email'] = {
            'required'      : true,
            'email'         :true,
        }

        validations['register_name'] = {
            'required'  : true,
            'minLength'       : 3,
            'maxLength'       : 50,
        }

        validations['register_password'] = {
            'required'  : true,
            'minLength'       : 8,
            'maxLength'       : 50,
        }

        this.setState({validations})
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
                <div className="stars"></div>
                <div className="twinkling"></div>
                <div className="row h-100">
                    <div className="login-content col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 my-auto">
                        <SweetAlert
                            show={this.state.show}
                            title={this.state.modalTitle}
                            text={this.state.modalBody}
                            onConfirm={this.state.modalClose}
                        />
                        <div className={"login-background"}>
                        </div>
                        <div className={(this.state.toRegister === false ? "form-login-info-right" : "form-login-info-left")+" text-center"}>
                            {this.state.toRegister === false && 
                                <div className={window.innerWidth < 800 ? "row mb-3" : ""}>
                                    <div className={window.innerWidth < 800 ? "col-4 offset-2 my-auto" : ""}>
                                        <img src={Logo}></img>
                                    </div>
                                    <div className={window.innerWidth < 800 ? "col-4 my-auto" : ""}>
                                        <div className={window.innerWidth < 800 ? "mb-2 mt-2" : "my-5"}>
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
                                            <button onClick={() => {this._changeForm(false)}} id="entrar" className="btn btn-lg button-navbar">
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
                                                        error={this.state.validationErrors['login_email'] != "" && this.state.validationErrors['login_email'] != undefined}
                                                        helperText={this.state.validationErrors['login_email'] && this.state.validationErrors['login_email']}
                                                        value={this.state.login_email} 
                                                        name="login_email"
                                                        onChange={this.handleChange.bind(this)} 
                                                        value={this.state.login_email} 
                                                        fullWidth 
                                                        label="E-mail" 
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
                                                        error={this.state.validationErrors['login_password'] != "" && this.state.validationErrors['login_password'] != undefined}
                                                        helperText={this.state.validationErrors['login_password'] && this.state.validationErrors['login_password']}
                                                        value={this.state.login_password} 
                                                        name="login_password"
                                                        onChange={this.handleChange.bind(this)} 
                                                        value={this.state.login_password} 
                                                        type="password" 
                                                        fullWidth 
                                                        label="Password" 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <button onClick={this._login} className="btn btn-lg button-navbar mt-5">
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
                                                        error={this.state.validationErrors['register_name'] != "" && this.state.validationErrors['register_name'] != undefined}
                                                        helperText={this.state.validationErrors['register_name'] && this.state.validationErrors['register_name']}
                                                        value={this.state.register_name} 
                                                        name="register_name"
                                                        onChange={this.handleChange.bind(this)} 
                                                        value={this.state.register_name} 
                                                        fullWidth 
                                                        label="Nome" 
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
                                                        error={this.state.validationErrors['register_email'] != "" && this.state.validationErrors['register_email'] != undefined}
                                                        helperText={this.state.validationErrors['register_email'] && this.state.validationErrors['register_email']}
                                                        value={this.state.register_email} 
                                                        name="register_email"
                                                        onChange={this.handleChange.bind(this)} 
                                                        value={this.state.register_email} 
                                                        fullWidth 
                                                        label="E-mail"
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
                                                        error={this.state.validationErrors['register_password'] != "" && this.state.validationErrors['register_password'] != undefined}
                                                        helperText={this.state.validationErrors['register_password'] && this.state.validationErrors['register_password']}
                                                        value={this.state.register_password} 
                                                        name="register_password"
                                                        onChange={this.handleChange.bind(this)} 
                                                        value={this.state.register_password} 
                                                        type="password" 
                                                        fullWidth 
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