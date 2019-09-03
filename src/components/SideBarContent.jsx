import React from 'react'

export default class SideBarContent extends React.Component{

    render(){
        return (
            <div className="sidebar-content">
                <div class="section-sidebar">
                    <div class="section-sidebar-title">Popular</div>
                </div>
                <div class="section-sidebar">
                    <div class="section-sidebar-title">Categorias</div>
                </div>
            </div>
        )
    }
}