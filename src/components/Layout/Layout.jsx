import React from "react"
import Sidebar from "react-sidebar";
import NavBar from './NavBar'
import SideBarContent from './SideBarContent'
import '../../css/Stars.css'
import '../../css/CreatePost.css'

const mql = window.matchMedia(`(min-width: 800px)`);

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarOpen: false
        }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged)
        this.mediaQueryChanged()
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged)
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open })
    }

    mediaQueryChanged() {
        this.setState({ sidebarOpen: mql.matches })
    }

    render() {
        return (
            <div>
            <Sidebar
                sidebar={
                    <SideBarContent/> 
                }
                docked={this.state.sidebarOpen && window.innerWidth > 800}
                open={this.state.sidebarOpen && window.innerWidth < 800}
            >
                <div className={(this.state.sidebarOpen && window.innerWidth < 800) ? "sidebar-button-hide" : "sidebar-button-show"}>
                    <button className="btn button-navbar" type="submit" onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
                        <i className={"fa fa-"+(!this.state.sidebarOpen ? 'list' : 'times')} />
                    </button>
                </div>
                <NavBar />
                <div id="div-content" className="div-background div-background-ext">
                    <div id='stars'></div>
                    <div id='stars2'></div>
                    <div id='stars3'></div>
                    <div className="container my-3">
                        <div className="col-md-10 offset-md-1">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Sidebar>

            </div>
        )
    }
}
