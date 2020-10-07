import {
    Box, Button, TextField
} from '@material-ui/core';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Connexion extends Component {
    constructor() {
        super()
        this.state =
        {
            pseudo: '',
            goToChat: false
        }

        this.onChangePseudo = this.onChangePseudo.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    
    strUcFirst(a) { return (a + '').charAt(0).toUpperCase() + a.substr(1); }

    onChangePseudo(e) {
        const pseudo = this.strUcFirst(e.target.value)
        this.setState({ pseudo })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ goToChat: true })
    }

    render() {

        if (this.state.goToChat) {
            return <Redirect push to={`/chatbot/${this.state.pseudo}`}></Redirect>
        }

        return (
            <Box textAlign="center" mt={20}>
                <h1>Votre Pseudo</h1>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="Pseudo"
                        size="small"
                        variant="outlined"
                        value={this.state.pseudo}
                        onChange={this.onChangePseudo}
                        placeholder="Pseudo"
                        type="text"
                        required
                    />
                    <Box ml={2} mt={2}>
                        <Button type="submit" color="primary" variant="outlined">Go</Button>
                    </Box>
                </form>
            </Box>
        )
    }
}

export default Connexion;