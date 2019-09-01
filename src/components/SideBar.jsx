import React from "react";
import Sidebar from "react-sidebar";
import Feed from './Feed'
import NavBar from './NavBar'

const mql = window.matchMedia(`(min-width: 800px)`);

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false
        };

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
}

componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
}

onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
}

mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
}

render() {
    return (
        <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
        >
            <NavBar sidebarOpen={this.state.sidebarOpen} onSetSidebarOpen={this.onSetSidebarOpen}/>
            <Feed />
        </Sidebar>
    );
}
}
