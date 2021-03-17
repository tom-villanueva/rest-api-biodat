import React, { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import ModalForm from "../modals/ModalForm";
import ProjectAddForm from "./ProjectAddForm";
import ProjectInterface from "../../interfaces/ProjectInterface";
import ProjectEditForm from "./ProjectEditForm";
import ProjectDeleteForm from "./ProjectDeleteForm";
import ProjectService from "../../services/ProjectService";
import ErrorPage from "../error/ErrorPage";

const ProjectList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projects, setProjects] = useState([] as ProjectInterface[]);
  const [targetProject, setTargetProject] = useState(-1);

  useEffect(() => {
    ProjectService.getAll()
      .then(response => {
        setProjects(response.data);
      })
      .catch(e => {
        return <ErrorPage errorStatusCode={ e.response.status }/>
      })
  }, []);

  const onEdit = (id: number) => {
    setShowEditModal(!showEditModal);
    setTargetProject(id);
  };

  const onDelete = (id: number) => {
    console.log("id", id);
    setShowDeleteModal(!showDeleteModal);
    setTargetProject(id);
  };

  const renderProjectItems = () => {
    return projects.map((project, index) => {
      return (
        <ProjectItem
          key={index}
          id={index}
          project={project}
          onEdit={(id) => onEdit(id)}
          onDelete={(id) => onDelete(id)}
        />
      );
    });
  };

  const handleProjectForm = async (data) => {
    /* Crea el proyecto a nivel base de datos y actualiza la vista */
    const project = data; 
    let newProjects: ProjectInterface[];
    newProjects = projects;
    newProjects.push(project);
    setProjects(newProjects);
    setShowAddModal(!showAddModal);
  };

  const handleProjectEditForm = async (data) => {
    const newProject = data;
    let newProjects: ProjectInterface[];
    newProjects = projects;

    const isEditedProject = (project: ProjectInterface) => project.id === targetProject;
  
    let index: number = newProjects.findIndex(isEditedProject);
    newProjects[index] = newProject;
    // for (let project of newProjects) {
    //   index = newProjects.indexOf(project);
    //   if (project.id === targetProject) {
    //     newProjects[index] = newProject;
    //   }
    // }
    setProjects(newProjects);
    setShowEditModal(!showEditModal);
    setTargetProject(-1);
  };

  const handleProjectDeleteForm = (data) => {
    let newProjects: ProjectInterface[];
    newProjects = projects.filter((project: ProjectInterface) => {
      return project.id !== targetProject;
    });
    setProjects(newProjects);
    setShowDeleteModal(!showDeleteModal);
    setTargetProject(-1);
  };

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
          <tbody>{projects.length > 0 && renderProjectItems()}</tbody>
        </table>
        <button
          className="btn btn-info btn-lg"
          onClick={() => {
            setShowAddModal(!showAddModal);
          }}
        >
          <i className="fas fa-plus"></i>
          Nuevo Proyecto
        </button>
      </div>
      <ModalForm
        title="Nuevo Proyecto"
        visibility={showAddModal}
        onClose={() => {
          setShowAddModal(!showAddModal);
        }}
      >
        <ProjectAddForm 
          id={targetProject} 
          handleProjectForm={(data) => handleProjectForm(data)} 
        />
      </ModalForm>

      <ModalForm
        title="Editar Proyecto"
        visibility={showEditModal}
        onClose={() => {
          setShowEditModal(!showEditModal);
          setTargetProject(-1);
        }}
      >
        <ProjectEditForm
          id={targetProject}
          handleProjectEditForm={(data) => handleProjectEditForm(data)}
        />
      </ModalForm>

      <ModalForm
        title="Eliminar Proyecto"
        visibility={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(!showDeleteModal);
          setTargetProject(-1);
        }}
      >
        <ProjectDeleteForm
          id={targetProject}
          handleProjectDeleteForm={(data) => handleProjectDeleteForm(data)}
        />
      </ModalForm>
    </div>
  );
};
export default ProjectList;