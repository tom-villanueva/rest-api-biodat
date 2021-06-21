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
		const [error, setError] = useState(false);
		const [loading, setLoading] = useState(false);

		useEffect(() => {
			const fetchProject = async () => {
				setLoading(true);
				if (props.id > 0) {
					ProjectService.get(props.id)
					.then(response => {
						setProject(response.data);
						setLoading(false);
					})
					.catch(e => {
						setLoading(false);
						setError(true);	
					})
				}	
			}
			fetchProject();

			return () => {
				setError(false);
			}
		}, [ props.id ])

    const handleFormSubmit = (event) => {
			event.preventDefault();
			setError(false);
			setLoading(true);
			ProjectService.remove(project)
				.then(response => {
					console.log(response.data);
					props.handleProjectDeleteForm(project);
					setLoading(false);
				})
				.catch(e => {
					setError(!error);
					setLoading(!loading); 
				});  	
    };

		return(
			<div>
			{error && <p>Hubo un error</p>}
			{loading && <p>Espere por favor</p>}
			<form onSubmit={(event) => handleFormSubmit(event) }>
				<div className="form-group">
					<button className="btn btn-danger btn-block">Eliminar Proyecto</button>
				</div>
			</form>
			{loading && <div className="overlay">
				<i className="fas fa-2x fa-sync-alt fa-spin"></i>
				</div>} 
			</div>  
		);
}
export default ProjectDeleteForm;