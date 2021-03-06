import React, { useEffect, useState } from "react";
import ProjectItem from "../components/projects/ProjectItem";
import ModalForm from "../components/modals/ModalForm";
import ProjectAddForm from "../components/projects/ProjectAddForm";
import ProjectInterface from "../interfaces/ProjectInterface";
import ProjectEditForm from "../components/projects/ProjectEditForm";
import ProjectDeleteForm from "../components/projects/ProjectDeleteForm";
import ProjectService from "../services/ProjectService";


const ProjectList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projects, setProjects] = useState([] as ProjectInterface[]);
  const [targetProject, setTargetProject] = useState(-1);

  // error y cargando 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    ProjectService.getAll()
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(e => {
        setError(true);
        setLoading(false);
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
      {error && <p>Hubo un error cargando los proyectos</p>}
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
      {loading && <div className="overlay">
				<i className="fas fa-2x fa-sync-alt fa-spin"></i>
				</div>}
      <ModalForm
        title="Nuevo Proyecto"
        visibility={showAddModal}
        onClose={() => {
          setShowAddModal(!showAddModal);
        }}
      >
        <ProjectAddForm  
          newProject={showAddModal}
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