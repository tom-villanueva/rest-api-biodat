import React, { useEffect, useState } from 'react'
import ItemInterface from '../../interfaces/ItemInterface'

interface Props {
    item: ItemInterface,
    selectedItem: number,
    onEdit: (id) => void, 
    onDelete: (id) => void,
    onSelect: (id) => void,
}

const ItemItem = (props: Props) => {

  const [selected, setSelected] = useState(false);

	useEffect(() => {
		if(props.selectedItem !== props.item.id && selected) {
			setSelected(!selected);
		}
	}, [props.selectedItem])

	const onSelect = (id) => {
		console.log("seleccionado ", id)
		if(!selected) {
			props.onSelect(id);
		} 
		else { //ON UNSELECT
			props.onSelect(-1);
		}
		setSelected(!selected);
	};

	return (
		<tr>
			<td>
					<a className= {`btn btn-sm ${selected ? "btn-success" : "btn-danger"}`} 
							onClick={() => onSelect(props.item.id) }
					>
					<i className="fas fa-check"></i>
					</a>
			</td>
			<td>
					<a>
					{ props.item.title }
					</a>
					<br />
			</td>
			<td className="project-actions text-center">
					<a className="btn btn-info btn-sm" onClick={() => props.onEdit(props.item.id) }>
					<i className="fas fa-pencil-alt">
					</i>                   
					</a>
					<a className="btn btn-danger btn-sm" onClick={() => props.onDelete(props.item.id)}>
					<i className="fas fa-trash">
					</i>                   
					</a>
			</td>
		</tr>
	);
}
export default ItemItem;