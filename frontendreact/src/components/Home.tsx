import React, { Component } from 'react';

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Content from './Content';
import ProjectList from './ProjectList';
import ModalProjectForm from './modals/ModalProjectForm';

export default class Home extends Component {

    render() {
        return(
            <div className="wrapper">
                <Header />
                <SideBar />
                <Content title="projects"> 
                    <ProjectList />
                </Content>
                <Footer />
            </div>
        )
    }

}

