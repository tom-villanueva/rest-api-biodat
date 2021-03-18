import React, { Component, useState } from 'react';
import ItemInterface from '../../interfaces/ItemInterface';
import ItemService from '../../services/ItemService';
import ErrorPage from '../error/ErrorPage';

interface Props {
    projectId: number,
    itemId: number,
    handleItemEditForm: (data) => void;
}

const ItemEditForm = (props: Props) => {

    const initialItemState: ItemInterface = {
			title: "",
			project_id: props.projectId,
			created_at: "",
			updated_at: "",
			id: props.itemId,
    };

    const [item, setItem] = useState(initialItemState);

    const handleInputChange = (event) => {
			const { name, value } = event.target;
			setItem({ ...item, [name]: value });
    };

    const handleFormSubmit = (event) => {
			event.preventDefault();
			let data: ItemInterface = {
				title: item.title,
				project_id: props.projectId,
				created_at: "",
				updated_at: "",
				id: props.itemId,
			};

			ItemService.update(data)
				.then(response => {
					const newItem = response.data;
					props.handleItemEditForm(newItem);
				})
				.catch(e => {
					<ErrorPage errorStatusCode={ e.response.status }/>
				})
    };

		return(
			<form onSubmit={(event) => handleFormSubmit(event) }>
				<div className="form-group">
						<label htmlFor="title"> Título </label>
						<input
								className="form-control" 
								type="text"
								id="title"
                name="title"
								value={item.title}
								placeholder="Escriba el título"
								onChange={ handleInputChange }
						>
						</input>
						<button className="btn btn-primary">Editar Proyecto</button>
				</div>
			</form>    
		);
}
export default ItemEditForm;