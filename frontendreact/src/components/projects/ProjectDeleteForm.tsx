import React, { useEffect, useState } from 'react';
import ItemInterface from '../../interfaces/ItemInterface';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ProjectService from '../../services/ProjectService';
import FormResource from '../form/FormResource';

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
  const [errors, setErrors] = useState([]);
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

  const handleResource = (errors?, resource?: ItemInterface | ProjectInterface) => {
    if(errors !== undefined) {
      setErrors(errors);
    } else {
      props.handleProjectDeleteForm(resource);
    }
  };

  return(
    <div>
      {error && <p>Hubo un error</p>}
      {loading && <p>Espere por favor</p>}
      <FormResource
        resourceType={"PROJECT"}
        resourceData={project}
        resourceAction={"REMOVE"}
        handleResource={handleResource}
      >
        <button className="btn btn-danger btn-block">Aceptar</button>
      </FormResource>
    </div>
  )
};
export default ProjectDeleteForm;