import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ItemList from '../items/ItemList';
import FileList from '../files/FileList';
import ColeChart from './ColeChart';
import FileService from '../../services/FileService';
import FrequencyChart from './FrequencyChart';

const Dashboard = () => {
	const { id } = useParams();//id del proyecto
	const [selectedItem, setSelectedItem] = useState(-1);
	const [selectedFiles, setSelectedFiles] = useState([] as number[]);
	const [selectedFilesData, setSelectedFilesData] = useState([]);

	const handleSelectedItem = (id: number) => {
		console.log("id", id);
		setSelectedItem(id);
	};

	const handleSelectedFiles = (ids: number[]) => {
		console.log("ids", ids);
		setSelectedFiles(ids);
		console.log("en el dashbaoprd", selectedFiles);
	};

	useEffect(() => {

		FileService.get(id, selectedItem, selectedFiles)
			.then(response => {
				const data = (response.data);
				setSelectedFilesData(data);
			})
			.catch(e => {
				console.log(e.response.data);
			})

	}, [ selectedFiles ]);

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
						handleSelectedFiles={handleSelectedFiles}
				/>
				</div>
			</div>
			<div className="row-12">
				{/* <div className="col-6"> */}
					<ColeChart 
						data={selectedFilesData}
					/>
				{/* </div> */}
			</div>
			<div className="row-12">
				{/* <div className="col-6"> */}
					<FrequencyChart 
						data={selectedFilesData}
					/>
				</div>
				{/* </div> */}
			{/* </div> */}
		</div>
	);
}
export default Dashboard;