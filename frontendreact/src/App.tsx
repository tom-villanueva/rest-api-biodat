import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,  
  Switch,
} from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Home from './components/pages/Home';
import RegistrationForm from './components/auth/RegistrationForm';
import Dashboard from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ProjectList from './components/projects/ProjectList';
import StartPage from './components/pages/StartPage';

const App = () => {

  return (
    <Router>
      <div className="App"> 
        <Switch> 
          <ProtectedRoute
            exact={true}
            path='/proyectos' 
            component={ProjectList}
          /> 

          <Route 
            exact 
            path='/login' 
            render={props =>(
              <Home title="Iniciar Sesión" >
                <LoginForm {...props} />
              </Home>
            )}
          />

          <Route 
            exact 
            path='/register' 
            render={props =>(
              <Home title="Registro" > 
                <RegistrationForm {...props} />
              </Home>
            )} 
          />

          <Route 
            exact 
            path='/home' 
            render={props =>(
              <Home title="Home" >
                <StartPage {...props} />
              </Home>
            )}
          />

          <ProtectedRoute  
            path='/dashboard/:id' 
            component={Dashboard} 
          />

        </Switch> 
      </div> 
    </Router> 
  );
}
export default App;