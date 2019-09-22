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
            show: true,
        }

        this._getCategories()
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

    render(){
        return (
            <div className="form-post">
                <SweetAlert
                    show={true}
                    title="Sucesso"
                    text="Meme cadastrado com sucesso!"
                    onConfirm={() => this.setState({ show: false })}
                />
                <div className="col-lg-10 offset-lg-1 my-auto">
                    <div className="mt-5">
                        <span className="form-post-title">{this.state.id == null ? "Novo meme" : "Editar meme"}</span>
                    </div>
                    <Grid className="mt-5" container alignItems="flex-end">
                        <Grid item  xs={2} md={1}>
                            <i className="fas fa-heading fa-lg"></i>
                        </Grid>
                        <Grid item xs={10} md={11}>
                            <TextField 
                                value={this.state.title} 
                                fullWidth 
                                id="input-with-icon-grid" 
                                label="Título" 
                                onChange={(e) => {this.setState({
                                    title: e.target.value
                                })}} 
                            />
                        </Grid>
                    </Grid>
                    <Grid className="mt-5" container alignItems="flex-end">
                        <Grid item xs={2} md={1}>
                            <i className="fas fa-images fa-lg"></i>
                        </Grid>
                        <Grid item xs={10} md={9}>
                            <TextField 
                                fullWidth
                                value={this.state.imageName}
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
                                    onChange={(e) => {this.setState({
                                        imageName: e.target.value,
                                        image: e.target.files[0]
                                    })}} 
                                />
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid className="mt-4" container  alignItems="flex-end">
                        <Grid item  xs={2} md={1}>
                            <i className="fas fa-list fa-lg"></i>
                        </Grid>
                        <Grid item xs={10} md={11}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="category">Categoria</InputLabel>
                                <Select
                                    value={this.state.category_id}
                                    onChange={(e) => {this.setState({
                                        category_id: e.target.value
                                    })}}
                                    id="category"
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