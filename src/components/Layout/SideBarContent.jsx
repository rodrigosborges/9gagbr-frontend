import React from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom';

export default class SideBarContent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            popular: [
                {
                    icon: 'fab fa-hotjar',
                    label: 'Em alta',
                    url: '/category/Em alta',
                },
                {
                    icon: 'fa fa-clock',
                    label: 'Recentes',
                    url: '/category/Recentes',
                },
            ],
            categories: [
            ],
            aleatorio: null,
            redirect: null,
        }
    }

    componentDidMount(){
        this._getCategories()
    }

    _getRandom(e){
        e.preventDefault()
        axios.get('https://ninegag-backend.herokuapp.com/post/Aleatório')
        .then((res) => {
            this.setState({
                redirect: <Redirect to={"/post/"+res.data} />
            })
        })
    }

    _getCategories(){
        axios.get('https://ninegag-backend.herokuapp.com/category/')
        .then((res) => {
            var categories = this.state.categories
            if(res.data.data){
                res.data.data.map(category => {
                    categories.push({
                        id: category.id,
                        name: category.name,
                        url: 'https://ninegag-backend.herokuapp.com/storage/category/'+category.path
                    })
                })
            this.setState({categories})
            }
        })
    }

    render(){

        return (
            <div className="sidebar-content">
                {this.state.redirect}
                <div className="section-sidebar">
                    <span className="section-sidebar-title">Popular</span>
                    <hr className="hr-title-sidebar"/>
                    {this.state.popular.map((item, key) => 
                        <Link key={key} className="a-sidebar-link" to={item.url}>
                            <div className="button-navbar section-sidebar-link">
                                <span className="sidebar-link">
                                    <i className={item.icon}></i> {item.label}
                                </span>
                            </div>
                        </Link>
                    )}
                    <a key={3} href="/category/aleatorio" className="a-sidebar-link" onClick={(e) => this._getRandom(e)}>
                        <div className="button-navbar section-sidebar-link">
                            <span className="sidebar-link">
                                <i className={'fa fa-random'}></i> Aleatório
                            </span>
                        </div>
                    </a>
                </div>

                <div className="section-sidebar">
                    <div className="section-sidebar-title">Categorias</div>
                    <hr className="hr-title-sidebar"/>
                    {this.state.categories.map((category, key) => 
                        (
                            <Link key={key} className="a-sidebar-link" to={"/category/"+category.name}>
                                <div className="button-navbar section-sidebar-link">
                                    <span className="sidebar-link">
                                        <img className="img-post-icon" src={category.url} />
                                        <span className="category-label">{category.name}</span>
                                    </span>
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </div>
        )
    }
}