import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";

const LoginForm = () => {

  const initialLoginData = {
    email: "",
    password: "",
  };
  const [loginData, setloginData] = useState(initialLoginData);
  const [isChecked, setisChecked] = useState(false); 
  const history = useHistory();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      email: loginData.email,
      password: loginData.password,
    };
    const response = await AuthService.doUserLogin(postData);

    if (response) {
      AuthService.handleLoginSuccess(response, isChecked);
      history.push("/home");
    } else {
      alert("Revise sus credenciales e inténtelo de vuelta");
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginData({ ...loginData, [name]: value });
  };

  const handleChecked = () => {
    setisChecked(!isChecked);
  }

  return (
    <div className="container-fluid text-center">
      <div className="login-box">
        <div className="login-logo">
          <a href="#">
            <b>bio</b>DAT
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Iniciar Sesión en bioDAT</p>
            <form
              action="#"
              method="post"
              onSubmit={(event) => handleFormSubmit(event)}
            >
              <div className="input-group mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={ loginData.email }
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
                  value={ loginData.password }
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
                  <div className="icheck-primary">
                    <input
                      type="checkbox"
                      id="remember"
                      onChange={() => handleChecked()}
                      checked={isChecked}
                    />
                    <label onClick={() => handleChecked()} >
                      Recuérdame
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-6">
                  <button type="submit" className="btn btn-primary btn-block">
                    Iniciar Sesión
                  </button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <p className="mb-1">
              <a href="forgot-password.html">Olvidé mi contraseña</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">
                Registrar nueva cuenta
              </a>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
}
export default LoginForm;