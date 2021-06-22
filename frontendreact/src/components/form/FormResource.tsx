import React, { useEffect, useState } from 'react'
import ItemInterface from '../../interfaces/ItemInterface';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ItemService from '../../services/ItemService';
import ProjectService from '../../services/ProjectService';

interface Props {
  resourceType: string,
  resourceData?: ItemInterface | ProjectInterface;
  resourceAction: string;
  handleResource: (errors?, resource?: ItemInterface | ProjectInterface) => void;
  children: React.ReactNode;
}

const resourceServices = {
  "PROJECT": ProjectService,
  "ITEM": ItemService
}

const FormResource = (props: Props) => {
  const { 
    resourceType, 
    resourceData, 
    resourceAction, 
    handleResource,
    children 
  } = props;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resourceService, setResourceService] = useState(ProjectService); //Project service de default
  const [resourceActions, setResourceActions] = useState({});

  useEffect(() => {
    setResourceService(resourceServices[resourceType]);
  }, [ resourceType ]);

  useEffect(() => {
    if (resourceService !== undefined) {
      setResourceActions({
        "CREATE": resourceService.create, 
        "UPDATE": resourceService.update,
        "REMOVE": resourceService.remove,
      });
    }
  }, [ resourceService ]);

  useEffect(() => {
    setError(false);
  }, [resourceData])

  const handleFormSubmit = (event) => {
		setLoading(true);
		setError(false);
		event.preventDefault();

    const action = resourceActions[resourceAction];

    action(resourceData)
			.then(response => {
				const newResource = response.data;
				handleResource(undefined, newResource);
				setLoading(false);
			})
			.catch(e => {
        handleResource(e.response.data.errors, undefined);
				setError(true);
				setLoading(false);
			});
  };

  return (
    <form onSubmit={(event) => handleFormSubmit(event) }>
      {error && 
        <p>Hubo un error en el formulario</p>}

      {children}

      {loading && 
        <div className="overlay">
          <i className="fas fa-2x fa-sync-alt fa-spin"></i>
        </div>}
    </form>
  )
}

export default FormResource;
