import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import { RouteComponentProps } from "react-router-dom";

export default class RegistrationForm extends Component<RouteComponentProps> {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  async handleSubmit(event) {
    event.preventDefault();
    const postData = {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
    }
    const response = await AuthService.doUserRegistration(postData);

    if (response) {
        AuthService.handleLoginSuccess(response, false);
        this.props.history.push("/home");
    } else {
        alert("Algo salió mal");
    }

  }

  render() {
    const {email, password, password_confirmation } = this.state;
    return (
      <div className="register-box-body">
        <p className="login-box-msg">Registrar una nueva cuenta</p>
        <form action="../../index.html" method="post" onSubmit={event => this.handleSubmit(event)}>
          <div className="form-group has-feedback">
            <input 
                type="email" 
                name="email"
                className="form-control" 
                placeholder="Email" 
                value={ email } 
                onChange={event => this.setState({ email: event.target.value })}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={ password } 
              onChange={event => this.setState({ password: event.target.value })}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              placeholder="Retype password"
              value={ password_confirmation } 
              onChange={event => this.setState({ password_confirmation: event.target.value })}
            />
            <span className="glyphicon glyphicon-log-in form-control-feedback" />
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <input type="checkbox" /> I agree to the <a href="#">terms</a>
                </label>
              </div>
            </div>
            <div className="col-xs-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
              >
                Registrarse
              </button>
            </div>         
          </div>
        </form>

        <a href="login.html" className="text-center">
          ya tengo una cuenta
        </a>
      </div>
    );
  }
}
