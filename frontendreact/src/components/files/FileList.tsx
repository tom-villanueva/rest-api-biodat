import React, { useState, useEffect } from 'react'
import FileInterface from '../../interfaces/FileInterface'
import FileService from '../../services/FileService';
import ErrorPage from '../error/ErrorPage';
import FilesAddForm from './FilesAddForm';


interface Props {
  project_id: number,
  item_id: number,
  handleSelectedFiles: (ids) => void,
}

const FileList = (props: Props) => {
  const [files, setFiles] = useState([] as FileInterface[]);
  const [selectedFiles, setSelectedFiles] = useState([] as number[]);

  const retrieveFiles = () => {
    FileService.getAll(props.project_id, props.item_id)
    .then(response => {
      setFiles(response.data);
    })
    .catch(e => {
      <ErrorPage errorStatusCode={ e.response.status } />
    })
  }

  useEffect(() => {
		if(props.item_id !== -1){
			retrieveFiles();
		}
    return () => {
      setFiles([] as FileInterface[]);
    }
	}, [ props.item_id ]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddFiles = (data) => {
    retrieveFiles();
  }

  const handleSelectChange = (event) => {
    event.preventDefault();
    const filesIds = Array.from(event.target.selectedOptions, (option: HTMLSelectElement) => parseInt(option.value));
    setSelectedFiles(filesIds);
    console.log("en la lista de archivos>", filesIds);  
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSelectedFiles(selectedFiles);
  }

  const renderFiles = () => {
    return files.map((file, index) => {
      return (
        <option key={index} value={file.id}>{file.file_name}</option> 
      );
    });
  }

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Archivos</h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      <div className="card-body table-responsive p-1"  style={{ height : 300 } }>
        <FilesAddForm 
          projectId={props.project_id}
          itemId={props.item_id}
          handleAddFiles={handleAddFiles}
        />
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="form-group">
            <div className="container-fluid">
              <div className="row">       
              <label htmlFor="files">Archivos Seleccionados</label>
              <select multiple className="custom-select" name="files" id="files" onChange={handleSelectChange}>
                {files.length > 0 && renderFiles()}
              </select>
              </div>
            </div>
            <button className="btn btn-primary btn-block">
              GRAFICAR
            </button>
          </div> 
        </form>        
      </div>
    </div>
  );
}
export default FileList;