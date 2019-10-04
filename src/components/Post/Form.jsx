import React from 'react';
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Validate} from '../../utils/validation'

export default class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: null,
            title: "",
            imageName: "Nenhum arquivo selecionado",
            image: null,
            category_id: "",
            categories: [],
            show: false,
            validations:{
                'title': {
                    'required'  : true,
                    'minLength'       : 3,
                    'maxLength'       : 50,
                },
                'image': {
                    'required': true,
                    'ext': ['png', 'jpg', 'jpeg', 'webm', 'mp4', 'gif'],
                },
                'category_id': {
                    'required': true,
                },
            },
            validationErrors: {

            }
        }

        this._getCategories()
    }

    handleChange(event){
        event.persist()
        let change = {}
        change[event.target.name] = event.target.type === 'file' ? event.target.files[0] : event.target.value
        this.setState(change, () => {
            this._inputValidate(event.target.name)
        })
    }

    _inputValidate(key){
        var field = Validate(this.state[key], this.state.validations[key])

        if(field.valid == false){
            this.setState(prevState => {
                let validationErrors = Object.assign({}, prevState.validationErrors);
                validationErrors[key] = field.message;
                return { validationErrors };
            })
        }else{
            this.setState(prevState => {
                let validationErrors = Object.assign({}, prevState.validationErrors);
                validationErrors[key] = "";
                return { validationErrors };
            })
        }

        return field.valid
    }

    _formValidate(){
        var valid = true
        Object.keys(this.state.validations).map((key) => {
            if(!this._inputValidate(key))
                valid = false
        })
        return valid
    }

    _getCategories(){
        axios.get('http://localhost:3001/category/')
        .then((res) => {
            var categories = this.state.categories
            res.data.data.map(category => {
                categories.push({
                    id: category.id,
                    name: category.name,
                })
            })
            this.setState({categories})
        })
    }

    _sendForm = () => {
        if(this._formValidate()){
            var data = new FormData()
            data.append('path', this.state.image)
            data.append('title', this.state.title)
            data.append('category_id', this.state.category_id)
            axios.post(
                'http://localhost:3001/post/', 
                data, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                } 
            ).then((res) => {
                this.setState({
                    show: true,
                    title: "",
                    imageName: "Nenhum arquivo selecionado",
                    image: null,
                    category_id: "",
                })
            })
        }
    }

    render(){
        return (
            <div className="form-post">
                <div className="col-lg-10 offset-lg-1 my-auto">
                    <SweetAlert
                        show={this.state.show}
                        title="Sucesso"
                        text="Meme cadastrado com sucesso!"
                        onConfirm={() => this.setState({ show: false })}
                    />
                    <div className="mt-5">
                        <span className="form-post-title">{this.state.id == null ? "Novo meme" : "Editar meme"}</span>
                    </div>
                    <Grid className="mt-5" container alignItems="flex-end">
                        <Grid item  xs={2} md={1}>
                            <i className="fas fa-heading fa-lg"></i>
                        </Grid>
                        <Grid item xs={10} md={11}>
                            <TextField 
                                error={this.state.validationErrors['title'] != "" && this.state.validationErrors['title'] != undefined}
                                helperText={this.state.validationErrors['title'] && this.state.validationErrors['title']}
                                value={this.state.title} 
                                fullWidth 
                                id="input-with-icon-grid" 
                                label="Título" 
                                name="title"
                                onChange={this.handleChange.bind(this)} 
                            />
                        </Grid>
                    </Grid>
                    {this.state.id == null && 
                        <Grid className="mt-5" container alignItems="flex-end">
                            <Grid item xs={2} md={1}>
                                <i className="fas fa-images fa-lg"></i>
                            </Grid>
                            <Grid item xs={10} md={9}>
                                <TextField 
                                    error={this.state.validationErrors['image'] != "" && this.state.validationErrors['image'] != undefined}
                                    helperText={this.state.validationErrors['image'] && this.state.validationErrors['image']}
                                    fullWidth
                                    value={this.state.image ? this.state.image.name : "Nenhum arquivo selecionado"}
                                    id="input-with-icon-grid" 
                                    label="Arquivo"
                                    disabled 
                                />
                            </Grid>
                            <Grid item xs={12} md={2} className="text-center mt-2">
                                <Button
                                    variant="contained"
                                    component="label"
                                    className="ml-2"
                                >
                                    Escolher
                                    <input
                                        type="file"
                                        className="d-none"
                                        name="image"
                                        onChange={this.handleChange.bind(this)} 
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                    }
                    <Grid className="mt-4" container  alignItems="flex-end">
                        <Grid item  xs={2} md={1}>
                            <i className="fas fa-list fa-lg"></i>
                        </Grid>
                        <Grid item xs={10} md={11}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="category">Categoria</InputLabel>
                                <Select
                                    error={this.state.validationErrors['category_id'] != "" && this.state.validationErrors['category_id'] != undefined}
                                    value={this.state.category_id}
                                    onChange={this.handleChange.bind(this)}
                                    id="category"
                                    aria-describedby="category-id-error"
                                    name="category_id"
                                >
                                    <MenuItem value="">
                                        <em>Selecione</em>
                                    </MenuItem>
                                    {this.state.categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {this.state.validationErrors['category_id'] && 
                                    <FormHelperText className="error-label">{this.state.validationErrors['category_id']}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>
                    </Grid>
                    <button onClick={() => {this._sendForm()}} className="btn btn-lg button-navbar mt-5 mb-5">
                        {this.state.id == null ? "Salvar" : "Atualizar"}
                    </button>
                </div>
            </div>
        )
    }
}