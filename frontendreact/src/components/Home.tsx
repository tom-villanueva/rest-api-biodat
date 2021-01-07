import React, { Component } from 'react';

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Content from './Content';
import ProjectList from './projects/ProjectList';

interface Props {
    title: string
}

export default class Home extends Component<Props> {

    render() {
        return(
            <div className="wrapper">
                <Header />
                <SideBar />
                <Content title={this.props.title}> 
                    {this.props.children}
                </Content>
                <Footer />
            </div>
        )
    }

}

