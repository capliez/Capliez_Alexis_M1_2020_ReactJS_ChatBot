import React, { Component, createRef } from 'react';
import {
   Box,
  Grid,
  List, 
  Paper, 
  Typography
} 
from '@material-ui/core'

//Components
import Bots from './components/Bots';
import dataBots from './components/Bots/dataBots';
import NavbarTop from './components/NavbarTop';
import SendMessage from './components/SendMessage';
import ViewMessage from './components/ViewMessage';

//Animations
import {
  CSSTransition,
  TransitionGroup
}
from 'react-transition-group';
import './animations.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    const { pseudo } = this.props.match.params
    this.allbots = { dataBots }
    this.messagesRef = createRef()
    this.state =
    {
      pseudo,
      messages: {},
      currentMessageUser: '',
      isMessage: false
    }
  }

  //Envoie Message Utilisateur
  addMessage = message => {
    const messages = { ...this.state.messages }
    const isMessage = true

    messages[`message-${Date.now()}`] = message
    Object
      .keys(messages)
      .slice(0, -50)
      .forEach(key => {
        messages[key] = null
      })

    this.setState({ messages, currentMessageUser: message, isMessage })

    //On appel la vérification des commandes des bots
    this.verifResponseBot(message)
  }

  //Vérification commande des bots
  verifResponseBot(message) {
    const { dataBots } = this.allbots

    //On vérifie que la commande appartient à un bots
    dataBots.map((item, index) =>
      item.options[message.message] ? setTimeout(() => { this.createMessageBot(item.name, item.options[message.message], item.avatar) }, 2000) : false
    )
    this.setState({ isMessage: false })
  }

  //Envoie message bots
  createMessageBot = (name, messagebot, avatar) => {
    const messages = { ...this.state.messages }

    const message = {
      id: String(Math.floor(Math.random() * Math.floor(10000))),
      pseudo: name,
      avatar,
      message: messagebot,
      isUser: false,
      sentAt: Date.now()
    }

    messages[`message-${Date.now()}`] = message
    Object
      .keys(messages)
      .slice(0, -50)
      .forEach(key => {
        messages[key] = null
      })

    this.setState({ ...this.state.messages, messages })
  }


  componentDidUpdate() {
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  render() {
    const nbmessages = Object.keys(this.state.messages).length
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <CSSTransition
          timeout={500}
          classNames='item'
          key={key}
        >
          <ViewMessage
            isUser={this.state.messages[key].isUser}
            avatar={this.state.messages[key].avatar}
            message={this.state.messages[key].message}
            pseudo={this.state.messages[key].pseudo}
            id={this.state.messages[key].id}
            sentAt={this.state.messages[key].sentAt}
          />
        </CSSTransition>
      ))
    const { dataBots } = this.allbots
    return (
      <div>
        <NavbarTop pseudo={this.state.pseudo} />
        <Box mt={3}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4} >
              <List>
                <Box pl={2} pr={2}>
                  {dataBots.map((item, index) =>
                    <Bots isMessage={this.state.isMessage} message={this.state.message} key={item.id} data={item} />
                  )}
                </Box>
              </List>
            </Grid>

            <Grid item xs={12} md={8} >
              <Paper square >
                <Box p={1} >
                  <Typography variant="h5" gutterBottom>
                    Messages ({nbmessages})
                  </Typography>
                </Box>
                <div className="box">
                  <div className="messages" ref={this.messagesRef}>
                    <TransitionGroup className="message">
                      {messages}
                    </TransitionGroup>
                  </div>
                </div>
              </Paper>
              <Box mt={2}>
                <SendMessage  addMessage={this.addMessage} longueur={20} pseudo={this.state.pseudo} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default App;
