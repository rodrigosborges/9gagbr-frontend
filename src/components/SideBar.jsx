import React from "react"
import Sidebar from "react-sidebar";
import Feed from './Feed'
import NavBar from './NavBar'
import SideBarContent from './SideBarContent'

const mql = window.matchMedia(`(min-width: 800px)`);

export default class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarOpen: true
        }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged)
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
            <Sidebar
                sidebar={<SideBarContent /> }
                docked={this.state.sidebarOpen}
            >
                <NavBar sidebarOpen={this.state.sidebarOpen} onSetSidebarOpen={this.onSetSidebarOpen}/>
                <Feed />
            </Sidebar>
        )
    }
}
