import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ItemList from '../items/ItemList';
import FileList from '../files/FileList';
import ErrorPage from '../error/ErrorPage';

const Dashboard = () => {
	const { id } = useParams();//id del proyecto
	const [selectedItem, setSelectedItem] = useState(-1);

	const handleSelectedItem = (id: number) => {
		console.log("id", id);
		setSelectedItem(id);
	};

	return (
		<div>
			<div className="row">
				<div className="col-6">
				<ItemList 
						project_id = { id }
						handleSelectedItem = { (id) => handleSelectedItem(id) }
				/>
				</div>
				<div className="col-6">
				<FileList
						project_id={id}
						item_id={selectedItem}
				/>
				</div>
			</div>
		</div>
	);
}
export default Dashboard;