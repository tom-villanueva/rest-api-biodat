import React, { useEffect, useState } from "react";
import MeasurerInterface from "../../interfaces/MeasurerInterface";
import FileService from "../../services/FileService";
import http from "../../services/HttpService";

interface Props {
  projectId: number;
  itemId: number;
  handleAddFiles: (data) => void;
}

const FilesAddForm = (props: Props) => {
  const [files, setFiles] = useState([]);
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
  }, []);

  const handleInputChange = (event) => {
    const files = event.target.files;
    setFiles(files);
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

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <div className="container-fluid">
          <div className="row form-group">
            <div className="col-12">
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
          </div>
          <div className="row form-group">
            <div className="col-6">
              <input
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
            <div className="col-6">
              <button className="btn btn-success btn-block">
                <i className="fas fa-plus"></i>
                {` Cargar Archivos`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default FilesAddForm;
