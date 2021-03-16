import React, { useState } from 'react';
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

    const handleFormSubmit = (event) => {
			event.preventDefault();

			ProjectService.remove(project)
				.then(response => {
					console.log(response.data);
					props.handleProjectDeleteForm(project);
				})
				.catch(e => {
					return <ErrorPage errorStatusCode={ e.response.status } /> 
				});  	
    };

		return(
			<form onSubmit={(event) => handleFormSubmit(event) }>
					<div className="form-group">
							<button className="btn btn-danger">Eliminar Proyecto</button>
					</div>
			</form>    
		);
}
export default ProjectDeleteForm;