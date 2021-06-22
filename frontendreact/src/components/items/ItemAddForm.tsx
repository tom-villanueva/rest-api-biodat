import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ItemInterface from "../../interfaces/ItemInterface";
import ProjectInterface from "../../interfaces/ProjectInterface";
import FormResource from "../form/FormResource";
import InputField from "../form/InputField";

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
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

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
      props.handleAddItem(resource);
    }
    setItem(initialItemState);
  };
  
  return (
    <div>
    {error && <p>Hubo un error</p>}
    {loading && <p>Espere por favor</p>}
      <FormResource
        resourceType={"ITEM"}
        resourceData={item}
        resourceAction={"CREATE"}
        handleResource={handleResource}
      >
        <div className="form-group">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-6">
            <InputField
                value={item.title}
                errors={errors}
                placeholder={"Escriba el titulo del set de datos"}
                name={"title"}
                onChange={handleInputChange}
              >
                Titulo:
            </InputField>
            </div>
            <div className="col-6">
            <label>
              Agregar
              <button className="btn btn-outline-primary btn-block">
                <i className="fas fa-plus"></i>
              </button>
            </label>
            </div>
          </div>
        </div>
        
        </div>
      </FormResource>
    </div>
  );
}
export default ItemAddForm;