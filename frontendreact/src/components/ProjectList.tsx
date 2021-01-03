import React from "react";

import ProjectItem from "./ProjectItem";
import ModalProjectForm from "./modals/ModalProjectForm";
import ProjectService from "./../services/ProjectService";
import ProjectAddForm from "./ProjectAddForm";
import ProjectInterface from "../interfaces/ProjectInterface";
import ProjectEditForm from "./ProjectEditForm";

export default class ProjectList extends React.Component {
  state = {
    showAddModal: false,
    showEditModal: false,
    projects: [],
    targetProject: 0,
  };

  async componentDidMount() {
    const response = await ProjectService.getProjects();
    console.log(response.data);
    const projects = response;
    this.setState({
      projects: response.data,
    });
  }

  onEdit(id: number) {
    this.setState({
      showEditModal: true,
      targetProject: id,
    });
  }

  renderProjectItems() {
    const { projects } = this.state;
    return projects.map((project, index) => {
      return (
        <ProjectItem
          key={index}
          id={index}
          project={project}
          onEdit={(id) => this.onEdit(id)}
        />
      );
    });
  }

  async handleProjectForm(data) {
    const project = await ProjectService.createProject(data);
    console.log(project.data);
    let newProjects: ProjectInterface[];
    newProjects = this.state.projects;
    newProjects.push(project.data);
    this.setState({
      projects: newProjects,
    });
  }

  async handleProjectEditForm(data) {
    const project = await ProjectService.updateProject(data);
    console.log(project.data);
    let newProjects: ProjectInterface[];
    newProjects = this.state.projects.filter((project : ProjectInterface) => {
      return project.id !== this.state.targetProject;
    });
    this.setState({
      projects: newProjects,
    });
  }

  render() {
    const { showAddModal, showEditModal, projects, targetProject } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Proyectos</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
              data-toggle="tooltip"
              title="Collapse"
            >
              <i className="fas fa-minus" />
            </button>
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
              data-toggle="tooltip"
              title="Remove"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre Proyecto</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>{projects.length > 0 && this.renderProjectItems()}</tbody>
          </table>
          <button
            className="btn btn-info btn-lg"
            onClick={() =>
              this.setState({
                showAddModal: true,
              })
            }
          >
            <i className="fas fa-plus"></i>
            Nuevo Proyecto
          </button>
        </div>
        <ModalProjectForm
          title="Nuevo Proyecto"
          visibility={showAddModal}
          onClose={() =>
            this.setState({
              showAddModal: !showAddModal,
            })
          }
        >
          <ProjectAddForm
            handleProjectForm={(data) => this.handleProjectForm(data)}
          />
        </ModalProjectForm>

        <ModalProjectForm
          title="Editar Proyecto"
          visibility={showEditModal}
          onClose={() =>
            this.setState({
              showEditModal: !showEditModal,
            })
          }
        >
          <ProjectEditForm
            id={ targetProject }
            handleProjectEditForm={(data) => this.handleProjectEditForm(data)}
          />
        </ModalProjectForm>
      </div>
    );
  }
}
