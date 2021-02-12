import React, { Component } from 'react'
import ItemInterface from '../../interfaces/ItemInterface'

interface Props {
    item: ItemInterface,
    selectedItem: number,
    onEdit: (id) => void, 
    onDelete: (id) => void,
    onSelect: (id) => void,
}

export default class ItemItem extends Component<Props> {

    state = {
        selected: false,
    }

    async componentDidUpdate(prevProps) {
        if(this.props.selectedItem !== -1 && this.props.item.id !== prevProps.selectedItem) {
            this.setState({
                selected: !this.state.selected,
            })
        }
    }

    async onSelect(id) {
        this.setState({
            selected: !this.state.selected,
        });
        if(!this.state.selected){
            this.props.onSelect(id);
        }
        else{
            this.props.onSelect(-1);
        }      
    }

    render() {
        const { item, onEdit, onDelete, onSelect  } = this.props;
        return (
            <tr>
            <td>
                <a className= {`btn btn-sm ${this.state.selected ? "btn-success" : "btn-danger"}`} 
                   onClick={(id) => this.onSelect(item.id) 
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
