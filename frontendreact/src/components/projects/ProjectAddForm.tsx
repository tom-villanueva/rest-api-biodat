import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService'
import ErrorPage from '../error/ErrorPage';

interface Props {
	newProject: boolean;
	handleProjectForm: (data) => void;
}

const ProjectAddForm = (props:Props) => {

    const initialProjectState: ProjectInterface = {
			id: -1,
			title: "",
			description: "",
			created_at: "",
			updated_at: "",
    };

    const [project, setProject] = useState(initialProjectState);
		const [error, setError] = useState(0);

		useEffect(() => {
			const data: ProjectInterface = {
				id: -1,
				title: "",
				description: "",
				created_at: "",
				updated_at: "",
			};
			setProject(data);
			return () => {
				setError(0);
			}
		}, [ props.newProject ])

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

			ProjectService.create(data)
				.then(response => {
						const newProject = response.data;
						props.handleProjectForm(newProject);
				})
				.catch(e => {
					console.log(e.response.data)
					setError(e.response.status);
				})
    };

    return(
			<div>
			{error !== 0 ?(
				<ErrorPage errorStatusCode={ error } />
			)
			:(
				<p></p>
			)}
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
		</div>
    );
};
export default ProjectAddForm;