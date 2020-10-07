import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';


class NavbarTop extends Component {

    constructor(props) {
        super(props)
        const { pseudo } = this.props
        this.state =
        {
            pseudo
        }
    }

    render() {

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Bienvenu(e) {this.state.pseudo} !
                </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavbarTop