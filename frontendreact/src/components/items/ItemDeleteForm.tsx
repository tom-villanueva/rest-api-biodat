import React, { useEffect, useState } from 'react'
import ItemInterface from '../../interfaces/ItemInterface';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ItemService from '../../services/ItemService';
import ErrorPage from '../error/ErrorPage';
import FormResource from '../form/FormResource';

interface Props {
    projectId: number,
    itemId: number,
    handleItemDeleteForm: (data) => void;
}

const ItemDeleteForm = (props: Props) => {
    
    const initialItemState: ItemInterface = {
			title: "",
			project_id: props.projectId,
			created_at: "",
			updated_at: "",
			id: props.itemId,
    };

    const [item, setItem] = useState(initialItemState);
		const [error, setError] = useState(false);
		const [errors, setErrors] = useState([] as any[]);
		const [loading, setLoading] = useState(false);

		useEffect(() => {
			setLoading(true);
    	setError(false);
			if (props.itemId > 0) {
				ItemService.get(props.projectId, props.itemId)
				.then(response => {
					setItem(response.data);
					setLoading(false);
				})
				.catch(e => {
					setError(true);
        	setLoading(false);
					console.log("error");
				})
			}	
			return () => {
				console.log("cleanup");
			}
		}, [ props.itemId, props.projectId ])

					
	const handleResource = (errors?, resource?: ItemInterface | ProjectInterface) => {	
		if(errors !== undefined) {
			setErrors(errors);
		} else {
			props.handleItemDeleteForm(resource);
		}
	};

	return(
		<div>
      {error && <p>Hubo un error</p>}
      {loading && <p>Espere por favor</p>}
      <FormResource
        resourceType={"ITEM"}
        resourceData={item}
        resourceAction={"REMOVE"}
        handleResource={handleResource}
      >
        <button className="btn btn-danger btn-block">Aceptar</button>
      </FormResource>
    </div>
	);
}
export default ItemDeleteForm;