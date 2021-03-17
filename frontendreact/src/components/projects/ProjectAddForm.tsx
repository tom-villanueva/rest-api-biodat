import React, { useState } from 'react';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService'
import ErrorPage from '../error/ErrorPage';

interface Props {
	id: number,
	handleProjectForm: (data) => void;
}

const ProjectAddForm = (props:Props) => {

    const initialProjectState: ProjectInterface = {
			id: props.id,
			title: "",
			description: "",
			created_at: "",
			updated_at: "",
    };

    const [project, setProject] = useState(initialProjectState);

    const handleInputChange = (event) => {
			const { name, value } = event.target;
			setProject({ ...project, [name]: value });
    };

    const handleFormSubmit = (event) => {
			event.preventDefault();
			let data: ProjectInterface = {
					id: project.id,
					title: project.title,
					description: project.description,
					created_at: "",
					updated_at: "",
			} 

			ProjectService.create(data)
				.then(response => {
						const newProject = response.data;
						props.handleProjectForm(newProject);
				})
				.catch(e => {
						return <ErrorPage errorStatusCode={ e.response.status }/>
				})
    };

    return(
			<form onSubmit={(event) => handleFormSubmit(event) }>
				<div className="form-group">
					<label htmlFor="title"> Título </label>
					<input
							className="form-control" 
							id="title"
							type="text"
							value={project.title}
							placeholder="Escriba el título"
							onChange={
									handleInputChange
							}
							name="title"
					>
					</input>
					<label htmlFor="description"> Descripción </label>
					<input
							className="form-control" 
							id="description"
							type="text"
							value={project.description}
							placeholder="Escriba la descripción"
							onChange={
									handleInputChange
							}
							name="description"
					>
					</input>
					<button className="btn btn-primary">Agregar Proyecto</button>
				</div>
			</form>    
    );
};
export default ProjectAddForm;