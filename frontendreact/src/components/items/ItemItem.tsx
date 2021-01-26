import React, { Component } from 'react'
import ItemInterface from '../../interfaces/ItemInterface'

interface Props {
    item: ItemInterface,
    selected: boolean
    onEdit: (id) => void, 
    onDelete: (id) => void,
    onSelect: (id) => void,
}

export default class ItemItem extends Component<Props> {

    render() {
        const { item, selected, onEdit, onDelete, onSelect  } = this.props;
        return (
            <tr>
            <td>
                <a className= {`btb btn-sm ${selected ? "btn-success" : "btn-danger"}`} 
                   onClick={(id) => onSelect(item.id) 
                }>
                <i className="fas fa-check"></i>
                </a>
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
