import React, { useEffect, useState } from 'react';
import ItemInterface from '../../interfaces/ItemInterface';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService';
import FormResource from '../form/FormResource';
import InputField from '../form/InputField';

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
					setErrors(e.response.data.errors);
				})
			}	
		}
		fetchProject();
		
		return () => {
			setError(false);
			setErrors([]);
		}
	}, [ props.id ])
	
	const handleInputChange = (event) => {
		setError(false);
		setErrors([]);
		const { name, value } = event.target;
		setProject({ ...project, [name]: value });
	};

	const handleResource = (errors?, resource?: ItemInterface | ProjectInterface) => {	
    if(errors !== undefined) {
      setErrors(errors);
    } else {
      props.handleProjectEditForm(resource);
    }
	};

	return(
		<div>
			{error && <p>Hubo un error en la carga</p>}
			{loading && <p>Espere por favor</p>}
        <FormResource
          resourceType={"PROJECT"}
          resourceData={project}
          resourceAction={"UPDATE"}
          handleResource={handleResource}
        >
          <div className="form-group"> 
            <InputField
              value={project.title}
              errors={errors}
              placeholder={"Escriba el titulo del proyecto"}
              name={"title"}
              onChange={handleInputChange}
            >
              Titulo:
            </InputField>

            <InputField
              value={project.description}
              errors={errors}
              placeholder={"Escriba la descripcion del proyecto"}
              name={"description"}
              onChange={handleInputChange}
            >
              Descripcion:
            </InputField>
						<button className="btn btn-primary btn-block">Aceptar</button>
          </div>
        </FormResource>
			</div>
		);
};
export default ProjectEditForm;