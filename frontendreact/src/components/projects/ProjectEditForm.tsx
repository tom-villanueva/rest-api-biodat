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
	const [error, setError] = useState(0);

	useEffect(() => {
		if (props.id > 0) {
			ProjectService.get(props.id)
			.then(response => {
				setProject(response.data);
			})
			.catch(e => {
				setError(e.response.status);
			})
		}	
		return () => {
			setError(0);
		}
	}, [ props.id ])
	
	const handleInputChange = (event) => {
		setError(0);
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
				props.handleProjectEditForm(newProject);
			})
			.catch(e => {
				setError(e.response.status);
			})
	};

	return(
		<div>
			{error !== 0 ?(
			<ErrorPage errorStatusCode = { error } />
			):
			(
				<p></p>
			)}
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
					<button className="btn btn-primary">Editar Proyecto</button>
				</div>
			</form> 
			</div>
		);
};
export default ProjectEditForm;