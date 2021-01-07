import React from "react";

import ProjectItem from "./ProjectItem";
import ModalForm from "../modals/ModalForm";
import ProjectService from "../../services/ProjectService";
import ProjectAddForm from "./ProjectAddForm";
import ProjectInterface from "../../interfaces/ProjectInterface";
import ProjectEditForm from "./ProjectEditForm";
import ProjectDeleteForm from "./ProjectDeleteForm";

export default class ProjectList extends React.Component {
  state = {
    showAddModal: false,
    showEditModal: false,
    showDeleteModal: false,
    projects: [],
    targetProject: -1,
  };

  async componentDidMount() {
    const response = await ProjectService.getProjects();
    const projects = response.data;
    this.setState({
      projects: projects,
    });
  }

  onEdit(id: number) {
    this.setState({
      showEditModal: true,
      targetProject: id,
    });
  }

  onDelete(id: number) {
    this.setState({
      showDeleteModal: true,
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
          onDelete={(id) => this.onDelete(id)}
        />
      );
    });
  }

  async handleProjectForm(data) {
    /* Crea el proyecto a nivel base de datos y actualiza la vista */
    const project = await ProjectService.createProject(data);
    let newProjects: ProjectInterface[];
    newProjects = this.state.projects;
    newProjects.push(project.data);
    this.setState({
      projects: newProjects,
    });
  }

  async handleProjectEditForm(data) {
    /* Actualiza el proyecto a nivel base de datos y actualiza la vista */
    const newProject = await ProjectService.updateProject(data);
    let newProjects: ProjectInterface[];
    newProjects = this.state.projects;

    let index: number;
    for (let project of newProjects){
      index = newProjects.indexOf(project);
      if (project.id === this.state.targetProject){
        newProjects[index] = newProject.data;
      }
    }
    this.setState({
      projects: newProjects,
      targetProject: -1,
    });
  }

  async handleProjectDeleteForm(data){
    console.log("data", data);
    const status = await ProjectService.deleteProject(data);
    let newProjects: ProjectInterface[];
    newProjects = this.state.projects.filter((project : ProjectInterface) => {
      return project.id !== this.state.targetProject;
    });
    this.setState({
      projects: newProjects,
      targetProject: -1,
    });
  }

  render() {
    const { showAddModal, showEditModal, showDeleteModal, projects, targetProject } = this.state;
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
        <ModalForm
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
        </ModalForm>

        <ModalForm
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
        </ModalForm>

        <ModalForm
          title="Eliminar Proyecto"
          visibility={showDeleteModal}
          onClose={() =>
            this.setState({
              showDeleteModal: !showDeleteModal,
            })
          }
        >
          <ProjectDeleteForm
            id={ targetProject }
            handleProjectDeleteForm={(data) => this.handleProjectDeleteForm(data)}
          />
        </ModalForm>
      </div>
    );
  }
}
