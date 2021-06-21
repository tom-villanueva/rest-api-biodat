import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
	const [error, setError] = useState(false);
	const [errors, setErrors] = useState([] as any[]);
	const [loading, setLoading] = useState(false);

	//refs
	const titleInput = useRef<HTMLInputElement>(null);
	const descriptionInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const currentTitle = titleInput.current;
		const currentDescription = descriptionInput.current;

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
					setErrors(e.response.data.errors);
				})
			}	
		}
		fetchProject();
		
		return () => {
			setError(false);
			setErrors([]);
			currentTitle?.classList.remove("is-invalid");
			currentDescription?.classList.remove("is-invalid");
		}
	}, [ props.id ])
	
	const handleInputChange = (event) => {
		setError(false);
		setErrors([]);
		titleInput.current?.classList.remove("is-invalid");
		descriptionInput.current?.classList.remove("is-invalid");
		const { name, value } = event.target;
		setProject({ ...project, [name]: value });
	};

	const handleFormSubmit = (event) => {
		setLoading(true);
		setError(false);
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
				setLoading(false);
			})
			.catch(e => {
				setErrors(e.response.data.errors);
				setError(true);
				setLoading(false);
			});
	};

	useLayoutEffect(() => {
		const currentTitle = titleInput.current;
		const currentDescription = descriptionInput.current;
		for (let error of errors) {
			if (error.field === "title") {
				currentTitle?.classList.add("is-invalid")
			}
			else if (error.field === "description") {
				currentDescription?.classList.add("is-invalid")
			}
		}
	}, [ errors ])

	return(
		<div>
			{error && <p>Hubo un error</p>}
			{loading && <p>Espere por favor</p>}
			<form onSubmit={(event) => handleFormSubmit(event) }>
				<div className="form-group">
					<label htmlFor="title"> Título </label>
					<input
							className="form-control" 
							ref={titleInput}
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
							ref={descriptionInput} 
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
					<button className="btn btn-primary btn-block">Editar Proyecto</button>
				</div>
				{loading && <div className="overlay">
				<i className="fas fa-2x fa-sync-alt fa-spin"></i>
				</div>}
			</form> 
			</div>
		);
};
export default ProjectEditForm;