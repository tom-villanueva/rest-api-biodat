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
  project_id: number,
  handleSelectedItem: (id) => void,
}

const ItemList = (props: Props) => {

  const [items, setItems] = useState([] as ItemInterface[]);
  const [targetItem, setTargetItem] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const retrieveItems = () => {
    ItemService.getAll(props.project_id)
    .then(response => {
      setItems(response.data);
    })
    .catch(e => {
      console.log(e.response.data);
    })
  }

  useEffect(() => {
    retrieveItems();
  }, [ props.project_id ]); 

  const onEdit = (id: number) => {
    setShowEditModal(!showEditModal);
    setTargetItem(id); 
  }

  const onDelete = (id: number) => {
    console.log("ID", id);
    setShowDeleteModal(!showDeleteModal);
    setTargetItem(id);
  }

  const onSelect = (id: number) => {
    props.handleSelectedItem(id);
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
    retrieveItems();
  }

  const handleItemEditForm = async (data) => {
    const newItem = data;
    let newItems: ItemInterface[];
    newItems = items;

    const isEditedItem = (item: ItemInterface) => item.id === targetItem;

    let index: number = newItems.findIndex(isEditedItem);
    newItems[index] = newItem;

    setItems(newItems);
    setShowEditModal(!showEditModal);
    setTargetItem(-1);
  }

  const handleItemDeleteForm = (data) => {
    const response = data;
    
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
      <div className="card-body table-responsive p-0" style={{ height : 300 } }>
        <ItemAddForm 
          projectId={props.project_id}
          itemId={targetItem}
          handleAddItem={ (data) => handleAddItem(data) } 
        />
        <table className="table table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>Seleccionado</th>
              <th>nombre del item</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 && renderItems()}
          </tbody>
        </table>
      </div>
        <ModalForm 
          title="Editar Item"
          visibility={ showEditModal }
          onClose={() => {
              setShowEditModal(!showEditModal);
              setTargetItem(-1);
          }}
        >
          <ItemEditForm 
            projectId={props.project_id}
            itemId={targetItem} 
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
            projectId={props.project_id}
            itemId={targetItem}
            handleItemDeleteForm={ (data) => 
              handleItemDeleteForm(data) 
            }
          />
        </ModalForm>     
    </div>
  );
}
export default ItemList;