import React from 'react';

import ProjectItem from './ProjectItem';
import ModalProjectForm from './modals/ModalProjectForm';
import ProjectService from './../services/ProjectService';

export default class ProjectList extends React.Component {
  state = {
    showModal: false,
    projects: []
  }

  async componentDidMount() {
    const response = await ProjectService.getProjects();
    console.log(response.data);
    const projects = response;
    this.setState({ 
      projects: response.data, 
    });

  }

  renderItems(){
    const { projects } = this.state;
    return projects.map((project, index) => {
      return <ProjectItem key={index} project={ project } />
    });
  }

  render() {
    const { showModal, projects } = this.state;
    return (
      <div className="card">
        <div className="card-header">
            <h3 className="card-title">Proyectos</h3>
            <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i className="fas fa-minus" /></button>
            <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
                <i className="fas fa-times" /></button>
            </div>
        </div>
        <div className="card-body p-0">
            <table className="table table-striped projects">
            <thead>
                <tr>
                <th style={{width: '1%'}}>
                    #
                </th>
                <th style={{width: '20%'}}>
                    Nombre Proyecto
                </th>
                <th style={{width: '20%'}}>
                    Descripción
                </th>
                <th style={{width: '10%'}} className="text-center">
                    Fecha
                </th>
                <th style={{width: '15%'}}>
                    Acciones
                </th>
                </tr>

            </thead>
            <tbody>

              { this.renderItems() }
              
            </tbody>
            </table>
        </div>
        <ModalProjectForm title="Nuevo Proyecto" visibility={showModal} onClose={() => this.setState({
          showModal: !showModal
        })}/>
      </div>
    )
  }
}