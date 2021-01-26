import React, { Component } from "react";
import ItemService from "../../services/ItemService";
import ItemInterface from "../../interfaces/ItemInterface";
import ItemAddForm from "./ItemAddForm";
import ItemItem from "./ItemItem";
import ModalForm from "../modals/ModalForm"
import ItemEditForm from "./ItemEditForm";
import ItemDeleteForm from "./ItemDeleteForm";

interface Props {
  project_id: number;
}

export default class ItemList extends Component<Props> {
  state = {
    items: [],
    project_id: this.props.project_id,
    targetItem: -1,
    selectedItem: -1,
    showEditModal: false,
    showDeleteModal: false,
  };

  async componentDidMount() {
    const response = await ItemService.getProjectItems(this.state.project_id);
    const items = response.data;
    this.setState({
      items: items,
    });
  }

  onEdit(id: number) {
    this.setState({
      showEditModal: true,
      targetItem: id,
    });
  }

  onDelete(id: number) {
    this.setState({
      showDeleteModal: true,
      targetItem: id,
    });
  }

  onSelect(id: number) {
    this.setState({
      selectedItem: id,
    });
  }

  renderItems() {
    const { items } = this.state;
    return items.map((item, index) => {
      return (
        <ItemItem
          key={index}
          item={item}
          selected={false}
          onEdit={(id) => this.onEdit(id)}
          onDelete={(id) => this.onDelete(id)}
          onSelect={(id) => this.onSelect(id)}
        />
      );
    });
  }

  async handleAddItem(data){
    const item = await ItemService.createItem(this.state.project_id, data);
    let newItems: ItemInterface[];
    newItems = this.state.items;
    newItems.push(item.data);
    this.setState({
      items: newItems,
    });
  }

  async handleItemEditForm(data) {
    const newItem = await ItemService.updateItem(data.project_id, data.id, data);

    let newItems: ItemInterface[];
    newItems = this.state.items;

    let index: number;
    for (let item of newItems){
      index = newItems.indexOf(item);
      if (item.id === this.state.targetItem){
        newItems[index] = newItem.data;
      }
    }
    this.setState({
      items: newItems,
      showEditModal: false,
      targetItem: -1,
    });
  }

  async handleItemDeleteForm(data) {
    const response = await ItemService.deleteItem(data.project_id, data.id);

    let newItems: ItemInterface[];
    newItems = this.state.items.filter((item : ItemInterface) => {
      return item.id !== this.state.targetItem;
    });
    this.setState({
      items: newItems,
      showDeleteModal: false,
      targetItem: -1,
    });

  }

  render() {
    const { items, project_id, targetItem, showEditModal, showDeleteModal } = this.state;
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
          <ItemAddForm handleAddItem={ (data) => this.handleAddItem(data) } />
          <table className="table table-striped projects">
            <thead>
              <tr>
                <th>Seleccionado</th>
                <th>nombre del item</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 && this.renderItems()}</tbody>
          </table>
          <ModalForm 
            title="Editar Item"
            visibility={ showEditModal }
            onClose={() =>
                this.setState({
                  showEditModal: !showEditModal,
                  targetItem: -1
                })
            }
          >
            <ItemEditForm 
              id={ targetItem } 
              project_id={ project_id }
              handleItemEditForm={(data) => 
                this.handleItemEditForm(data)
              } 
            />
          </ModalForm>
          <ModalForm
            title="Eliminar Item"
            visibility={ showDeleteModal }
            onClose={() =>
                this.setState({
                  showDeleteModal: !showDeleteModal,
                  targetItem: -1
                })
            }
          >
            <ItemDeleteForm 
              id={ targetItem } 
              project_id={ project_id } 
              handleItemDeleteForm={ (data) => 
                this.handleItemDeleteForm(data) 
              }
            />
          </ModalForm>
        </div>
      </div>
    );
  }
}
