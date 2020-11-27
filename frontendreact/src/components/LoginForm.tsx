import React, {Component} from 'react';
import AuthService from "./../services/AuthService";

class LoginForm extends Component {
        state = {username: '', password: '', isChecked: false}
        
        async handleFormSubmit(event) {
            event.preventDefault();
            const postData = {
                username: this.state.username,
                password: this.state.password,
              };
              const response = await AuthService.doUserLogin(postData);
              console.log(response.data)
              /*
              if (response) {
                AuthService.handleLoginSuccess(response, this.state.isChecked);
                this.props.history.push("/home");
              } else {
                alert("Please check your credentials and try agian");
              }*/
        }

        handleChecked() {
            this.setState({ isChecked: !this.state.isChecked })
        }

        render() {
            const {username, password, isChecked} = this.state;
            return(
                <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>bio</b>DAT</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                    <p className="login-box-msg">Iniciar Sesión en bioDAT</p>
                    <form action="../../index3.html" method="post" onSubmit={event => this.handleFormSubmit(event)}>
                        <div className="input-group mb-3">
                        <input type="email" 
                            name="name"
                            className="form-control" 
                            placeholder="Email" 
                            value={username}
                            onChange={event => this.setState({ username: event.target.value })}
                            />
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-envelope" />
                            </div>
                        </div>
                        </div>
                        <div className="input-group mb-3">
                        <input type="password" 
                        name="password"
                        className="form-control" 
                        placeholder="Password" 
                        value={password}
                        onChange={event => this.setState({ password: event.target.value })}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                            <span className="fas fa-lock" />
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-8">
                            <div className="icheck-primary">
                            <input type="checkbox" 
                                id="remember" 
                                onChange={ () => this.handleChecked() } 
                                checked={ isChecked }
                                />
                            <label onClick={ () => this.handleChecked() }>
                                Recuérdame
                            </label>
                            </div>
                        </div>
                        {/* /.col */}
                        <div className="col-4">
                            <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                        </div>
                        {/* /.col */}
                        </div>
                    </form>
                    <p className="mb-1">
                        <a href="forgot-password.html">Olvidé mi contraseña</a>
                    </p>
                    <p className="mb-0">
                        <a href="register.html" className="text-center">Registrar nueva cuenta</a>
                    </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
                </div>
            )
        }
}

export default LoginForm;
