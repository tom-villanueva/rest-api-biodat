import React from 'react';
import auth from "../auth/auth"
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService"

const Header = () => {
		const history = useHistory();

    const handleClick = async (event) => {
			event.preventDefault();
			const response = await AuthService.handleLogout();
			if(response){
				history.push("/login");
			}
    }

		return (
			<nav className="main-header navbar navbar-expand navbar-white navbar-light">
			{/* Left navbar links */}
			<ul className="navbar-nav">
					<li className="nav-item">
					<a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
					</li>
					<li className="nav-item d-none d-sm-inline-block">
					<a href="/home" className="nav-link">Inicio</a>
					</li>
					{!auth.isAuthenticated() ? (
						<div>
								<li className="nav-item d-none d-sm-inline-block">
								<a href="/login" className="nav-link">Iniciar Sesión</a>
								</li>
								<li className="nav-item d-none d-sm-inline-block">
								<a href="/register" className="nav-link">Registro</a>
								</li>
						</div>
						):(
						<div>
								<li className="nav-item d-none d-sm-inline-block">
								<a href="/login" className="nav-link" onClick={ (event) => handleClick(event) }>Logout</a>
								</li>
						</div>)
					}
			</ul>
			{/* Right navbar links */}
			<ul className="navbar-nav ml-auto">
					<li className="nav-item">
					<a className="nav-link" data-widget="fullscreen" href="#" role="button">
							<i className="fas fa-expand-arrows-alt" />
					</a>
					</li>
			</ul>
			</nav>
		)
};
export default Header;
