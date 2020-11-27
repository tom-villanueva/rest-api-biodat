import React, { Component } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Content from './components/Content';
import LoginForm from './components/LoginForm';

class App extends Component {

  render() {
    return (
      <div>
        {/*<Header/>
        <SideBar/>
        <Content/>
        <Footer/>*/}
        <LoginForm/>
        
      </div>
    );
  }
}

export default App;
