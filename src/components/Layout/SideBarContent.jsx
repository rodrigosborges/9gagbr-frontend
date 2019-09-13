import React from 'react'
import axios from 'axios'

export default class SideBarContent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            popular: [
                {
                    icon: 'fab fa-hotjar',
                    label: 'Em alta',
                    url: '#',
                },
                {
                    icon: 'fa fa-clock',
                    label: 'Recentes',
                    url: '#',
                },
                {
                    icon: 'fa fa-random',
                    label: 'Aleatório',
                    url: '#',
                }
            ],
            categories: [
            ]
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
                    url: 'http://localhost:3001/storage/category/'+category.path
                })
            })
            this.setState({categories})
        })
    }

    render(){
        return (
            <div className="sidebar-content">

                <div className="section-sidebar">
                    <span className="section-sidebar-title">Popular</span>
                    <hr className="hr-title-sidebar"/>
                    {this.state.popular.map((item, key) => 
                        <a key={key} className="a-sidebar-link" href={item.url}>
                            <div className="button-navbar section-sidebar-link">
                                <span className="sidebar-link">
                                    <i className={item.icon}></i> {item.label}
                                </span>
                            </div>
                        </a>
                    )}
                </div>

                <div className="section-sidebar">
                    <div className="section-sidebar-title">Categorias</div>
                    <hr className="hr-title-sidebar"/>
                    {this.state.categories.map((category, key) => 
                        (
                            <a key={key} className="a-sidebar-link" href="#">
                                <div className="button-navbar section-sidebar-link">
                                    <span className="sidebar-link">
                                        <img className="img-post-icon" src={category.url} />
                                        <span className="category-label">{category.name}</span>
                                    </span>
                                </div>
                            </a>
                        )
                    )}
                </div>
            </div>
        )
    }
}