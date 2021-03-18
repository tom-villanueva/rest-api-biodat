import React, { useState } from "react";
import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {
  const initialRegisterData = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [registerData, setRegisterData] = useState(initialRegisterData);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.password_confirmation,
    }
    const response = await AuthService.doUserRegistration(postData);

    if (response) {
        AuthService.handleLoginSuccess(response, false);
        history.push("/home");
    } else {
        alert("Algo salió mal");
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <div className="container-fluid text-center">
      <div className="login-box">
      <div className="login-logo">
          <a href="/home">
            <b>bio</b>DAT
          </a>
      </div>
      <div className="card">
      <div className="card-body login-card-body">
      <p className="login-box-msg">Registrar una nueva cuenta</p>
      <form action="#" method="post" onSubmit={event => handleSubmit(event)}>
        <div className="input-group mb-3">
          <input 
              type="email" 
              id="email"
              name="email"
              className="form-control" 
              placeholder="Email" 
              value={ registerData.email } 
              onChange={ handleInputChange }
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={ registerData.password } 
            onChange={ handleInputChange }
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="password"
            id="password_confiramtion"
            name="password_confirmation"
            className="form-control"
            placeholder="Retype password"
            value={ registerData.password_confirmation } 
            onChange={ handleInputChange }
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="checkbox icheck">
              <label>
                <input type="checkbox" /> I agree to the <a href="/home">terms</a>
              </label>
            </div>
          </div>
          <div className="col-6">
            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Registrarse
            </button>
          </div>         
        </div>
      </form>

      <a href="/login" className="text-center">
        ya tengo una cuenta
      </a>
    </div>
    </div>
    </div>
    </div>
  );
}
export default RegistrationForm;