import React, { useEffect, useState } from "react";
import ItemService from "../../services/ItemService";
import ItemInterface from "../../interfaces/ItemInterface";
import ItemAddForm from "./ItemAddForm";
import ItemItem from "./ItemItem";
import ModalForm from "../modals/ModalForm"
import ItemEditForm from "./ItemEditForm";
import ItemDeleteForm from "./ItemDeleteForm";
import ErrorPage from "../error/ErrorPage";

interface Props {
  items: ItemInterface[],
  project_id: number,
  handleSelectedItem: (id, items) => void,
}

export const ItemList = (props: Props) => {

  const [items, setItems] = useState([] as ItemInterface[]);
  const [targetItem, setTargetItem] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    ItemService.getAll(props.project_id)
      .then(response => {
        setItems(response.data);
      })
      .catch(e => {
        return <ErrorPage errorStatusCode={ e.response.status }/>
      })
  }, [items]); 
  
  const onEdit = (id: number) => {
    setShowEditModal(!showEditModal);
    setTargetItem(id); 
  }

  const onDelete = (id: number) => {
    setShowDeleteModal(!showDeleteModal);
    setTargetItem(id);
  }

  const onSelect = (id: number) => {
    props.handleSelectedItem(id, items);
    setSelectedItem(id);
  }

  const renderItems = () => {
    return items.map((item, index) => {
      return (
        <ItemItem
          key={index}
          item={item}
          selectedItem={selectedItem}
          onEdit={(id) => onEdit(id)}
          onDelete={(id) => onDelete(id)}
          onSelect={(id) => onSelect(id)}
        />
      );
    });
  }

  const handleAddItem = async (data) =>{
    const item = data;
    let newItems: ItemInterface[];
    newItems = items;
    newItems.push(item);
    setItems(newItems);
  }

  const handleItemEditForm = async (data) => {
    const newItem: AxiosResponse<any> = useItemService("UPDATE", data as ItemInterface);
    
    let newItems: ItemInterface[];
    newItems = items;

    let index: number;
    for (let item of newItems){
      index = newItems.indexOf(item);
      if (item.id === targetItem){
        newItems[index] = newItem.data;
      }
    }
    setItems(newItems);
    setShowEditModal(!showEditModal);
    setTargetItem(-1);
  }

  const handleItemDeleteForm = async (data) => {
    const response: AxiosResponse<any> = useItemService("DELETE", data as ItemInterface);
    
    let newItems: ItemInterface[];
    newItems = items.filter((item : ItemInterface) => {
      return item.id !== targetItem;
    });

    setItems(newItems);
    setShowDeleteModal(!showDeleteModal);
    setTargetItem(-1);
  }

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Items</h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      <div className="card-body">
        <ItemAddForm handleAddItem={ (data) => handleAddItem(data) } />
        <table className="table table-striped projects">
          <thead>
            <tr>
              <th>Seleccionado</th>
              <th>nombre del item</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 && renderItems()}</tbody>
        </table>
        <ModalForm 
          title="Editar Item"
          visibility={ showEditModal }
          onClose={() => {
              setShowEditModal(!showEditModal);
              setTargetItem(-1);
          }}
        >
          <ItemEditForm 
            id={ targetItem } 
            handleItemEditForm={(data) => 
              handleItemEditForm(data)
            } 
          />
        </ModalForm>
        <ModalForm
          title="Eliminar Item"
          visibility={ showDeleteModal }
          onClose={() => {
            setShowDeleteModal(!showDeleteModal);
            setTargetItem(-1);
          }}
        >
          <ItemDeleteForm 
            id={ targetItem } 
            handleItemDeleteForm={ (data) => 
              handleItemDeleteForm(data) 
            }
          />
        </ModalForm>
      </div>
    </div>
  );
}
