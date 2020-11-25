import React, {Component} from 'react';

export default class Header extends Component {
    render(){
        return (
        <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="bioDAT Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">bioDAT</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
                <a href="#" className="d-block">Nombre de usuario</a>
            </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library */}
                <li className="nav-header"></li>
                <li className="nav-item">
                <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-table" />
                    <p>
                    Proyectos
                    </p>
                </a>
                </li>
                <li className="nav-header">Utilidades</li>
                <li className="nav-item">
                <a href="pages/calendar.html" className="nav-link">
                    <i className="nav-icon fas fa-bookmark"></i>
                    <p>
                    Tutoriales
                    </p>
                </a>
                </li>
                <li className="nav-item">
                <a href="pages/calendar.html" className="nav-link">
                    <i className="nav-icon fas fa-comment-alt" />
                    <p>
                    Contacto
                    </p>
                </a>
                </li>
                </ul>
            </nav>
            {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
        </aside>

        )
    }
}