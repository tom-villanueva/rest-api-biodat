import React, { useEffect, useState } from 'react';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService';
import ErrorPage from '../error/ErrorPage';

interface Props {
    id: number,
    handleProjectEditForm: (data) => void;
}

const ProjectEditForm = (props:Props) => {

	const initialProjectState: ProjectInterface = {
		id: props.id,
		title:"",
		description:"",
		created_at: "",
		updated_at: "",
	};

	const [project, setProject] = useState(initialProjectState);
	const [message, setMessage] = useState("")

	useEffect(() => {
		console.log("entreee")
		if (props.id > 0) {
			ProjectService.get(props.id)
			.then(response => {
				setProject(response.data)
			})
			.catch(e => {
				return <ErrorPage errorStatusCode = { e.response.status } />
			})
		}	
	}, [ props.id ])
	
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
	
		ProjectService.update(data)
			.then(response => {
				const newProject = response.data;
				setMessage("ACTUALIZADO EXITOSAMENTE")
				props.handleProjectEditForm(newProject);
			})
			.catch(e => {
				return <ErrorPage errorStatusCode = { e.response.status } />
			})
	};

	return(
		<form onSubmit={(event) => handleFormSubmit(event) }>
				<div className="form-group">
						<label htmlFor="title"> Título </label>
						<input
								className="form-control" 
								type="text"
								id="title"
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
								type="text"
								id="description"
								value={project.description}
								placeholder="Escriba la descripción"
								onChange={
										handleInputChange
								}
								name="description"
						>
						</input>
						<p>{message}</p>
						<button className="btn btn-primary">Editar Proyecto</button>
				</div>
		</form>    
	)
};
export default ProjectEditForm;