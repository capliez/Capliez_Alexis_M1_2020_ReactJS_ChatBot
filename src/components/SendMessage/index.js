import React, { Component } from 'react';
import { 
  Box, 
  InputBase, 
  Toolbar,
  IconButton,
  Paper
} 
from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';

class SendMessage extends Component {

    constructor(props){
        super(props)
        this.state = {
            message: '',
            longueur: this.props.longueur
        }
    }


    createMessage = () => {
        const { addMessage, pseudo, longueur} = this.props
        if(this.state.message.trim() == ''){
          return false
        }
        if(this.state.message !== '--commands'){
          const message = {
            id: String(Math.floor(Math.random() * Math.floor(10000))),
            pseudo: pseudo,
            isUser: true,
            message: this.state.message,
            sentAt: Date.now()
          }
          
          addMessage(message)
        }else{
          this.createMessageHelp()
        }

        //Reset
        this.setState({ message: '', length: longueur })
      }

      createMessageHelp(){
        const { addMessage} = this.props

        const message = {
          id: String(Math.floor(Math.random() * Math.floor(10000))),
          pseudo: 'Robot Assistant',
          avatar: 'robot.jpg',
          isUser: false,
          message: 'Les commandes disponibles : Bots, Salut, Bye, Bonjour, Météo ',
          sentAt: Date.now()
        }
        
        addMessage(message)
      }
      
      handleKeyUp = event => {
        if (event.key === 'Enter') {
          this.createMessage()
        }
      }

      strUcFirst(a){return (a+'').charAt(0).toUpperCase()+a.substr(1);}
      handleChange = event => {
        
        let message = this.strUcFirst(event.target.value)
        const longueur = this.props.longueur - message.length

        if(message.substr(0, 3) == '--c'){
          message = '--commands' 
        }
        
        this.setState({ message, longueur })
        
      }
    
      handleSubmit = event => {
        event.preventDefault()
        this.createMessage()
      }

    render() {
  
        return (
          
                <Toolbar position="relative" >
                    <Box width="85%" m="auto">
                        <Paper onSubmit={this.handleSubmit} component="form" >
                            <Box p="5px" display="flex" >
                                <InputBase
                                    fullWidth={true}
                                    onKeyUp={this.handleKeyUp}
                                    required
                                    value={this.state.message}
                                    onChange={this.handleChange}
                                    placeholder='Tape "--commands" pour voir les commandes'
                                    inputProps={{ 'aria-label': 'Tape "--commands" pour voir les commandes' }}
                                />

                                <IconButton type="submit" aria-label="search">
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                </Toolbar>
            


        )
    }
}

export default SendMessage