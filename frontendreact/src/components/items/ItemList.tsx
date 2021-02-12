import React, { Component } from "react";
import ItemService from "../../services/ItemService";
import ItemInterface from "../../interfaces/ItemInterface";
import ItemAddForm from "./ItemAddForm";
import ItemItem from "./ItemItem";
import ModalForm from "../modals/ModalForm"
import ItemEditForm from "./ItemEditForm";
import ItemDeleteForm from "./ItemDeleteForm";

interface Props {
  items: ItemInterface[],
  handleAddItem: (data) => void,
  handleEditItem: (data, targetItem: number) => void,
  handleDeleteItem: (data, targetItem: number) => void,
  handleSelectedItem: (id) => void,
}

export default class ItemList extends Component<Props> {
  state = {
    items: [] as ItemInterface[],
    targetItem: -1,
    selectedItem: -1,
    showEditModal: false,
    showDeleteModal: false,
  };

  async componentDidMount() {
    this.setState({
      items: this.props.items,
    });
  }
  async componentDidUpdate(prevProps) {
    if(this.props.items !== prevProps.items) {
      this.setState({
        items: this.props.items,
      })
    }
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
    this.props.handleSelectedItem(id);
    this.setState({
      selectedItem: id,
    })
  }

  renderItems() {
    const { items, selectedItem } = this.state;
    return items.map((item, index) => {
      return (
        <ItemItem
          key={index}
          item={item}
          selectedItem={selectedItem}
          onEdit={(id) => this.onEdit(id)}
          onDelete={(id) => this.onDelete(id)}
          onSelect={(id) => this.onSelect(id)}
        />
      );
    });
  }

  async handleAddItem(data){
    this.props.handleAddItem(data)
  }

  async handleItemEditForm(data) {
    this.props.handleEditItem(data, this.state.targetItem)
    this.setState({
      showEditModal: false,
      targetItem: -1,
    });
  }

  async handleItemDeleteForm(data) {
    this.props.handleDeleteItem(data, this.state.targetItem)
    this.setState({
      showDeleteModal: false,
      targetItem: -1,
    });
  }

  render() {
    const { items, targetItem, showEditModal, showDeleteModal } = this.state;
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
