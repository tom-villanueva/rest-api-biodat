import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService'

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
		const [error, setError] = useState(false);
		const [errors, setErrors] = useState([] as any[]);
		const [loading, setLoading] = useState(false);

		//refs
		const titleInput = useRef<HTMLInputElement>(null);
		const descriptionInput = useRef<HTMLInputElement>(null);

		useEffect(() => {
			const currentTitle = titleInput.current;
			const currentDescription = descriptionInput.current;
			const data: ProjectInterface = {
				id: -1,
				title: "",
				description: "",
				created_at: "",
				updated_at: "",
			};
			setProject(data);
			return () => {
				setError(false);
				setErrors([]);
				currentTitle?.classList.remove("is-invalid");
				currentDescription?.classList.remove("is-invalid");
			}
		}, [ props.newProject ])

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

			ProjectService.create(data)
				.then(response => {
						const newProject = response.data;
						props.handleProjectForm(newProject);
						setLoading(false);
				})
				.catch(e => {
					console.log(e.response.data);
					setErrors(e.response.data.errors);
					setError(true);
					setLoading(false);
				})			
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
			<form onSubmit={(event) => handleFormSubmit(event) }>
			<div className="form-group">
				<label htmlFor="title"> Título </label>
				<input
						className="form-control"
						ref={titleInput} 
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
						ref={descriptionInput} 
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
				<button className="btn btn-primary btn-block">Agregar Proyecto</button>
			</div>
			{loading && <div className="overlay">
				<i className="fas fa-2x fa-sync-alt fa-spin"></i>
			</div>}
		</form>
		</div>
    );
};
export default ProjectAddForm;