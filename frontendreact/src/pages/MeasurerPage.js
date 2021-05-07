import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import DataTableComponent from '../components/measurer/DataTable'
import MeasurerForm from '../components/measurer/MeasurerForm';

const buttonRef = React.createRef();

export default class MeasurerPage extends Component {

  state={
    data: []
  };

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    console.log(data);
    this.setState({
      data: data
    });
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log(data);
  };

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  componentWillUnmount() {
    this.setState({
      data: []
    })
  }

  render() {
    return (
      <>
        <h5>Nuevo aparato</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                onClick={this.handleOpenDialog}
                className="btn btn-primary btn-block"
              >
                Seleccionar Archivo
              </button>
              <div
                className="form-control"
              >
                {file && file.name}
              </div>
              <button
                className="btn btn-danger"
                onClick={this.handleRemoveFile}
              >
                Borrar
              </button>
            </aside>
          )}
        </CSVReader>

        {this.state.data.length > 0 && 
          <DataTableComponent
            data={this.state.data}
          />
        }
        <MeasurerForm/>
        
      </>
    );
  }
}