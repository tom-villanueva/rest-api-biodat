import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ItemList from '../items/ItemList';
import FileList from '../files/FileList';
import FileService from '../../services/FileService';
import FileInterface from '../../interfaces/FileInterface';
import ErrorPage from '../error/ErrorPage';

const Dashboard = () => {
    const { id } = useParams();
    const [files, setFiles] = useState([] as FileInterface[]);
    const [selectedItem, setSelectedItem] = useState(-1);

		useEffect(() => {
			if(selectedItem !== -1){
				FileService.getAll(id, selectedItem)
				.then(response => {
					setFiles(response.data);
				})
				.catch(e => {
					<ErrorPage errorStatusCode={ e.response.status } />
				})
			}
		}, [ id, selectedItem ]);

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
						files = { files }
				/>
				</div>
			</div>
		</div>
	);
}
export default Dashboard;