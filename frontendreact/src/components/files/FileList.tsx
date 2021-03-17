import React, { useState, useEffect } from 'react'
import DataInterface from '../../interfaces/DataInterface'
import FileInterface from '../../interfaces/FileInterface'
import FileItem from './FileItem'

interface Props {
  files: FileInterface[],
}

const FileList = (props:Props) => {
  const [files, setFiles] = useState([] as FileInterface[]);

  useEffect(() => {
    setFiles(props.files);
  }, [ props.files ])

  const renderItems = () => {
    return files.map((item, index) => {
      return (
        <FileItem
          key={index}
          file={item}
        />
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
      <div className="card-body">
      <table className="table table-striped projects">
        <thead>
          <tr>
            <th>Seleccionado</th>
            <th>nombre del archivo</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 && renderItems()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default FileList;