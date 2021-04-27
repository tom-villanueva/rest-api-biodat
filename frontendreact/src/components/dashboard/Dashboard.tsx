import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ItemList from '../items/ItemList';
import FileList from '../files/FileList';
import ColeChart from './ColeChart';
import FileService from '../../services/FileService';
import FrequencyChart from './FrequencyChart';
import usePrevious from '../../services/usePrevious';

const Dashboard = () => {
	const { id } = useParams();//id del proyecto
	const [selectedItem, setSelectedItem] = useState(-1);
	const [selectedFiles, setSelectedFiles] = useState([] as number[]);
	const [selectedFilesData, setSelectedFilesData] = useState([]);
	const [selectedFilesDataModulus, setSelectedFilesDataModulus] = useState([]);
	const [selectedFilesDataPhase, setSelectedFilesDataPhase] = useState([]);
	const prevSelectedFiles = usePrevious(selectedFiles);

	const handleSelectedItem = (id: number) => {
		setSelectedItem(id);
	};

	const handleSelectedFiles = (ids: number[]) => {
		console.log("ids", ids);
		setSelectedFiles(ids);
		console.log("en el dashbaoprd", selectedFiles);
	};

	useEffect(() => {
		if (selectedItem !== -1 && prevSelectedFiles !== selectedFiles) {
			FileService.get(id, selectedItem, selectedFiles)
			.then(response => {
				const data = (response.data);
				setSelectedFilesData(data); 
			})
			.catch(e => {
				console.log(e.response.data);
			})

		FileService.getModulus(id, selectedItem, selectedFiles)
			.then(response => {
				const data = (response.data);
				setSelectedFilesDataModulus(data);
			})
			.catch(e => {
				console.log(e.response.data);
			})

		FileService.getPhase(id, selectedItem, selectedFiles)
			.then(response => {
				const data = (response.data);
				setSelectedFilesDataPhase(data);
			})
			.catch(e => {
				console.log(e.response.data);
			})
		}
		return () => {
			console.log("CLEANUP DASHBOARD");
			setSelectedFilesData([]);
			setSelectedFilesDataModulus([]);
			setSelectedFilesDataPhase([]);
		}
	}, [ selectedFiles, id, selectedItem ]);

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
						data={selectedFilesDataModulus}
					/>
				</div>
			<div className="row-12">
			{/* <div className="col-6"> */}
				<FrequencyChart 
					data={selectedFilesDataPhase}
				/>
			</div>
				{/* </div> */}
			{/* </div> */}
		</div>
	);
}
export default Dashboard;