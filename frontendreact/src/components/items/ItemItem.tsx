import React, { Component } from 'react'
import ItemInterface from '../../interfaces/ItemInterface'

interface Props {
    item: ItemInterface,
    onEdit: (id) => void, 
    onDelete: (id) => void,
}

export default class ItemItem extends Component<Props> {
    
    render() {
        const { item, onEdit, onDelete } = this.props;
        return (
            <tr>
            <td>
                <input className="form-check-input" type="radio" name="ItemSelected" checked={false}></input>
            </td>
            <td>
                <a>
                { item.title }
                </a>
                <br />
            </td>
            <td className="project-actions text-center">
                <a className="btn btn-info btn-sm" onClick={(id) => onEdit(item.id) }>
                <i className="fas fa-pencil-alt">
                </i>                   
                </a>
                <a className="btn btn-danger btn-sm" onClick={(id) => onDelete(item.id)}>
                <i className="fas fa-trash">
                </i>                   
                </a>
            </td>
        </tr>
        )
    }
}
