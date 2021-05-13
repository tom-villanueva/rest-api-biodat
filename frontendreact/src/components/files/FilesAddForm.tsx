import React, { useEffect, useState } from "react";
import MeasurerInterface from "../../interfaces/MeasurerInterface";
import FileService from "../../services/FileService";
import http from "../../services/HttpService";

interface Props {
  projectId: number;
  itemId: number;
  handleAddFiles: (data) => void;
  modal: boolean;
}

const FilesAddForm = (props: Props) => {
  const [files, setFiles] = useState([] as File[]);
  const [measurers, setMeasurers] = useState([] as MeasurerInterface[]);
  const [measurer, setMeasurer] = useState("");

  useEffect(() => {
    http
      .get("/measurers")
      .then((response) => {
        console.log(response.data);
        const measurers = response.data;
        setMeasurers(measurers);
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      console.log("CLEANUP ADDFORM")
      setMeasurer("");
      setMeasurers([]);
      setFiles([]);
    }
  }, [ props.modal ]);

  const handleInputChange = (event) => {
    console.log("evento", event);
    const files = event.target.files;
    let newFiles: File[] = [];
    for (var i = 0; i < files.length; i++) {
      newFiles.push(files[i]);
    }
    console.log(files);
    setFiles(newFiles);
  };

  const handleSelectChange = (event) => {
    const measurer = event.target.value;
    // console.log(event.target.value);
    setMeasurer(measurer);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    for (var i = 0; i < files.length; i++) {
      data.append("measurement", files[i]);
    }
    // console.log("measurer", measurer);
    data.append("measurer", measurer);
    data.append("project", String(props.projectId));
    data.append("item", String(props.itemId));

    FileService.create(props.projectId, props.itemId, data)
      .then((response) => {
        console.log(response.data);
        const newFiles = response.data;
        props.handleAddFiles(newFiles);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
    setFiles([]);
  };

  const renderMeasurers = () => {
    return measurers.map((measurer, index) => {
      return (
        <option key={index} value={measurer.name}>
          {`${measurer.name}`}
        </option>
      );
    });
  };

  const renderFiles = () => {
    return files.map((file, index) => {
      return (
        <tr key={index}>
          <td><i>{index}</i></td>
          <td>{file.name}</td>
        </tr>
      );
    });
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <div className="container-fluid">
          <div className="input-group mb-3">
            <div className="col-12 mb-3">
              <label>Elegir aparato</label>
              <select
                className="custom-select"
                id="measurer"
                value={measurer}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Aparato
                </option>
                {measurers.length > 0 && renderMeasurers()}
              </select>
            </div>
            <div className="col-12">
              <input
                disabled={measurer === "" ? true: false}
                className="custom-file-input"
                type="file"
                id="measurement"
                name="measurement"
                multiple
                onChange={handleInputChange}
              ></input>
              <label className="custom-file-label" htmlFor="measurement">
                Cargar Archivos...
              </label>
            </div>
          </div>
          <div className="table-responsive p-0" style={{ height : 200 } }>
            <table className="table table-head-fixed text-nowrap" >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Archivo</th>
                </tr>
              </thead>
              <tbody>
                {files.length > 0 && renderFiles()}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <button 
              disabled={(files.length === 0 ? true: false)}
              className="btn btn-success btn-block"
            >
              <i className="fas fa-plus"></i>
              {` Cargar Archivos`}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default FilesAddForm;
