import React, {Component} from 'react';
import auth from "./auth/auth"

export default class Header extends Component {
    render(){
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
            <li className="nav-item d-none d-sm-inline-block">
            <a href="/login" className="nav-link">Iniciar Sesión</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
            <a href="/register" className="nav-link">Registro</a>
            </li>
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
    }
}