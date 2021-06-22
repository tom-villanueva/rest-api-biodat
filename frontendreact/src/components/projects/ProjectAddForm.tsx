import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ItemInterface from '../../interfaces/ItemInterface';
import ProjectInterface from '../../interfaces/ProjectInterface';
import FormResource from '../form/FormResource';
import InputField from '../form/InputField';

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
      setError(false);
      setErrors([]);
    }
  }, [ props.newProject ])

  const handleInputChange = (event) => {
    setError(false);
    setErrors([]);
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleResource = (errors?, resource?: ItemInterface | ProjectInterface) => {	
    console.log(resource);
    if(errors !== undefined) {
      setErrors(errors);
    } else {
      props.handleProjectForm(resource);
    }
  };

  return(
  <div>
  {error && <p>Hubo un error</p>}
  <FormResource
      resourceType={"PROJECT"}
      resourceData={project}
      resourceAction={"CREATE"}
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
export default ProjectAddForm;