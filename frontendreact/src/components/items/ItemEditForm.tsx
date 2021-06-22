import React, { Component, useEffect, useState } from 'react';
import ItemInterface from '../../interfaces/ItemInterface';
import ProjectInterface from '../../interfaces/ProjectInterface';
import ItemService from '../../services/ItemService';
import ErrorPage from '../error/ErrorPage';
import FormResource from '../form/FormResource';
import InputField from '../form/InputField';

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
        setErrors(e.response.data.errors)
      })
    }	
    return () => {
      console.log("cleanup");
    }
  }, [ props.itemId, props.projectId ])

  const handleInputChange = (event) => {
    setError(false);
    setErrors([]);
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleResource = (errors?, resource?: ItemInterface | ProjectInterface) => {	
    if(errors !== undefined) {
      setErrors(errors);
    } else {
      props.handleItemEditForm(resource);
    }
  };

  return(
    <div>
    {error && <p>Hubo un error</p>}
    {loading && <p>Espere por favor</p>}
      <FormResource
        resourceType={"ITEM"}
        resourceData={item}
        resourceAction={"UPDATE"}
        handleResource={handleResource}
      >
        <div className="form-group">
        <InputField
            value={item.title}
            errors={errors}
            placeholder={"Escriba el titulo del set de datos"}
            name={"title"}
            onChange={handleInputChange}
          >
            Titulo:
        </InputField>
        <button className="btn btn-primary btn-block">Aceptar</button>
        </div>
      </FormResource>
    </div>   
  );
}
export default ItemEditForm;