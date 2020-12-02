import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch 
} from 'react-router-dom';


import LoginForm from './components/LoginForm';
import ProjectList from './components/ProjectList';
import Home from './components/Home';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App"> 
          <ul> 
            <li> 
              <Link to="/home">Home</Link> 
            </li> 
            <li> 
              <Link to="/login">Login</Link> 
            </li> 
            <li> 
              <Link to="/contacto">Contactanos</Link> 
            </li> 
          </ul>
          <Switch> 
            <Route exact path='/Home' component={Home}></Route>
            <Route exact path='/projects' component={ProjectList}></Route>

            <Route exact path='/login' component={LoginForm}></Route> 
          </Switch> 
        </div> 
      </Router> 
    );
  }
}

export default App;
