import React, { useEffect, useState } from "react";
import ItemInterface from "../../interfaces/ItemInterface";
import ItemService from "../../services/ItemService";
import ErrorPage from "../error/ErrorPage";

interface Props {
  projectId: number,
  itemId: number,
  handleAddItem: (data) => void;
}

const ItemAddForm = (props: Props) => {
  const initialItemState: ItemInterface = {
    title: "",
    project_id: props.projectId,
    created_at: "",
    updated_at: "",
    id: props.itemId,
  }

  const [item, setItem] = useState(initialItemState);
  
  // useEffect(() => {
  //   return () => {
  //     setItem(initialItemState)
  //   }
  // })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data: ItemInterface = {
      title: item.title,
      project_id: item.project_id,
      created_at: "",
      updated_at: "",
      id: item.id,
    }

    ItemService.create(data)
      .then(response => {
        const newItem = response.data; 
        props.handleAddItem(newItem);
      })
      .catch(e => {
        <ErrorPage errorStatusCode={ e.response.status } />
      })
    setItem(initialItemState)
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                value={item.title}
                placeholder="Escriba el nombre del nuevo item..."
                onChange={ handleInputChange }
              ></input>
            </div>
            <div className="col">
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default ItemAddForm;