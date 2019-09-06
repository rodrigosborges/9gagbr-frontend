import React from 'react'

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
                {
                    id: 1,
                    name: 'Animais',
                    url: 'https://i.pinimg.com/originals/07/2d/b7/072db775b02535d22a0ccbd66f323e38.png',
                },
                {
                    id: 2,
                    name: 'Comidas',
                    url: 'https://a.wattpad.com/useravatar/marcelorodriguesjr.256.348020.jpg',
                },
                {
                    id: 3,
                    name: 'Jogos',
                    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/c3/8d/50/c38d50e2-6d6c-90bd-bebc-a1b77dd36be8/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg',
                },
                {
                    id: 4,
                    name: 'Memes',
                    url: 'https://pm1.narvii.com/6700/5810319bb08be2a56c9b9287fb773c4f8ed02d87_128.jpg',
                }
            ]
        }
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