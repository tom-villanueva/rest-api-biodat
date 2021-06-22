import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/items/ItemList";
import FileList from "../components/files/FileList";
import ColeChart from "../components/dashboard/ColeChart";
import FileService from "../services/FileService";
import FrequencyChart from "../components/dashboard/FrequencyChart";
import LineChart from "../components/dashboard/LineChart";
import usePrevious from "../services/usePrevious";
import TabbedCard from "../components/layout/TabbedCard";
import SelectedDataInterface from "../interfaces/SelectedDataInterface";

const Dashboard = () => {
  const { id } = useParams(); //id del proyecto
  const [selectedItem, setSelectedItem] = useState(-1);
  const [selectedFiles, setSelectedFiles] = useState([] as number[]);
  const [selectedFilesData, setSelectedFilesData] = useState([]);
  const [selectedFilesDataModulus, setSelectedFilesDataModulus] = useState([]);
  const [selectedFilesDataPhase, setSelectedFilesDataPhase] = useState([]);
  const [selectedData, setSelectedData] = useState({selectedData: [] as any[], name:""});
  const prevSelectedFiles = usePrevious(selectedFiles);

  //error y loading
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDataPhase, setLoadingDataPhase] = useState(false);
  const [loadingDataModulus, setLoadingDataModulus] = useState(false);
  
  const handleSelectedItem = (id: number) => {
    setSelectedItem(id);
    console.log("NUEVO ID", id);
  };

  const handleSelectedFiles = (ids: number[]) => {
    setSelectedFiles(ids);
  };

  const handleSelectedData = (selectedData: SelectedDataInterface) => {
    setSelectedData(selectedData);
  }

  useEffect(() => {
    if (selectedItem !== -1 && prevSelectedFiles !== selectedFiles) {
      setError(false);
      setLoadingData(true);
      setLoadingDataPhase(true);
      setLoadingDataModulus(true);

      FileService.get(id, selectedItem, selectedFiles)
        .then((response) => {
          const data = response.data;
          setSelectedFilesData(data);
          setLoadingData(false);
        })
        .catch((e) => {
          setError(true);
          console.log(e.response.data);
        });

      FileService.getModulus(id, selectedItem, selectedFiles)
        .then((response) => {
          const data = response.data;
          setSelectedFilesDataModulus(data);
          setLoadingDataPhase(false);
        })
        .catch((e) => {
          setError(true);
          console.log(e.response.data);
        });

      FileService.getPhase(id, selectedItem, selectedFiles)
        .then((response) => {
          const data = response.data;
          setSelectedFilesDataPhase(data);
          setLoadingDataModulus(false);
        })
        .catch((e) => {
          setError(true);
          console.log(e.response.data);
        });
    }
    return () => {
      console.log("CLEANUP DASHBOARD");
      setSelectedFilesData([]);
      setSelectedFilesDataModulus([]);
      setSelectedFilesDataPhase([]);
    };
  }, [selectedFiles, id, selectedItem]);

  return (
    <div>
      <div className="row">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-lg-6">
          <ItemList
            project_id={id}
            handleSelectedItem={(id) => handleSelectedItem(id)}
          />
          <div>
           <TabbedCard
            data={selectedFilesData}
            handleSelectedData={handleSelectedData}
           />          
          </div>
          <div>
            <LineChart
              title="Modulo vs Frecuencia"
              data={selectedFilesDataModulus}
              selectedData={selectedData}
              loading={loadingDataModulus}
              error={error}
            />
          </div>
        </div>
        {/* COLUMNA IZQUIERDA */}
        {/* COLUMNA DERECHA   */}
        <div className="col-lg-6">
          <FileList
            project_id={id}
            item_id={selectedItem}
            handleSelectedFiles={handleSelectedFiles}
          />     
          <div>
            <LineChart 
              title="Cole" 
              data={selectedFilesData}
              selectedData={selectedData}
              loading={loadingData}
              error={error}
            />  
          </div>
          <div>
            <LineChart
              title="Fase vs Frecuencia"
              data={selectedFilesDataPhase}
              selectedData={selectedData}
              loading={loadingDataPhase}
              error={error}
            />
          </div>               
        </div>
        {/* COLUMNA DERECHA   */}
      </div>
    </div>
  );
};
export default Dashboard;
