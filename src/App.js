import React, { Component } from 'react';
import { 
  Route, 
  Switch,
  Link,
  BrowserRouter as Router, 
} from 'react-router-dom';
import List from './List.js';
import Detail from './Detail.js';
import About from './About.js';

export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <h2>Pokedex</h2>
          <Link to="/">List Pokemon</Link>
          <Link to="/about-me/">About</Link>
          <Switch>
              <Route exact path="/" component={List} />  
              <Route exact path="/about-me" component={About} />
              <Route exact path="/pokemon/:charId" component={Detail} />
          </Switch>
      </div>
  </Router>
    )
  }
}
