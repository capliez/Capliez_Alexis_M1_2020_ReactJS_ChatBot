import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Connexion from './pages/Connexion';


const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Connexion}/>
      <Route  path='/chatbot/:pseudo' component={App}/>
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(

    <Root />
 ,
  document.getElementById('app')
);

serviceWorker.unregister();
