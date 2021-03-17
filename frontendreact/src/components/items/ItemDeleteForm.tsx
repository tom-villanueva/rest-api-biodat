import React, { Component, useState } from 'react'
import ItemInterface from '../../interfaces/ItemInterface';
import ItemService from '../../services/ItemService';
import ErrorPage from '../error/ErrorPage';

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

    const handleFormSubmit = (event) => {
			event.preventDefault();
			
			ItemService.remove(item)
				.then(response => {
					console.log(response.data);
					props.handleItemDeleteForm(response.data);
				})
				.catch(e => {
					<ErrorPage errorStatusCode={ e.response.status } />
				})
    };

		return(
			<form onSubmit={(event) => handleFormSubmit(event) }>
					<div className="form-group">
							<button className="btn btn-danger">Eliminar Item</button>
					</div>
			</form>    
		);
}
export default ItemDeleteForm;