import React, {Component} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../componenets/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../componenets/Navigation/SideDrawer/SideDrawer";


class Layout extends Component {
    state = {
        showSideDrawer: false,
    }



    sideDrawerClose = () => {
        this.setState({showSideDrawer: false});
    }

    //SECURE WAY TO TOGGLE
    sideDrawerToggle = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <>
                <Toolbar drawerClicked={this.sideDrawerToggle}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClose}/>
                <main
                    className={classes.Content}>{this.props.children}
                </main>
            </>
        )
    }
}

export default Layout;
