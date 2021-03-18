import React, { useEffect, useState } from 'react';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService';
import ErrorPage from '../error/ErrorPage';

interface Props {
	id: number,
	handleProjectDeleteForm: (data) => void;
}

const ProjectDeleteForm = (props: Props) => {

    const initialProjectState: ProjectInterface = {
			id: props.id,
			title: "",
			description: "",
			created_at: "",
			updated_at: "",
    }; 

    const [project, setProject] = useState(initialProjectState);
		const [error, setError] = useState(0);

		useEffect(() => {
			if (props.id > 0) {
				ProjectService.get(props.id)
				.then(response => {
					setProject(response.data)
				})
				.catch(e => {
					setError(e.response.status);
				})
			}	
			return () => {
				setError(0);
			}
		}, [ props.id ])

    const handleFormSubmit = (event) => {
			event.preventDefault();
			ProjectService.remove(project)
				.then(response => {
					console.log(response.data);
					props.handleProjectDeleteForm(project);
				})
				.catch(e => {
					setError(e.response.status) 
				});  	
    };

		return(
			<div>
			{error !== 0 ? (
				<ErrorPage errorStatusCode={ error } />
			)
			: (
				<p></p>
			)}
			<form onSubmit={(event) => handleFormSubmit(event) }>
				<div className="form-group">
					<button className="btn btn-danger">Eliminar Proyecto</button>
				</div>
			</form> 
			</div>  
		);
}
export default ProjectDeleteForm;