import React, { Component } from 'react'
import ItemService from '../../services/ItemService'
import ItemItem from './ItemItem';

interface Props {
    project_id: number
}

export default class ItemList extends Component<Props> {

    state = {
        items: [],
        targetItem: -1,
    }

    async componentDidMount() {
        const response = await ItemService.getProjectItems(this.props.project_id);
        const items = response.data; 
        this.setState({
            items: items,
        })
    }

    onEdit(id) {
        this.setState({
            targetItem: id,
        })
    }

    onDelete(id) {
        this.setState({
            targetItem: id,
        })
    }

    renderItems() {
        const { items } = this.state;
        return items.map((item, index) => {
            return (
                <ItemItem 
                    key={ index }
                    item={ item }
                    onEdit={ (id) => this.onEdit(id) }
                    onDelete={ (id) => this.onDelete(id) }
                />
            );
        });
    }

    render() {
        const { items, targetItem } = this.state;
        return (
            <div className="card card-primary collapsed-card">
            <div className="card-header">
                <h3 className="card-title">Items</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-plus" />
                    </button>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped projects">
                <thead>
                <tr>
                    <th>Seleccionado</th>
                    <th>nombre del item</th>
                    <th className="text-center">Acciones</th>
                </tr>
                </thead>
                    <tbody>{items.length > 0 && this.renderItems()}</tbody>
                </table>
            </div>
            </div>
        )
    }
}
