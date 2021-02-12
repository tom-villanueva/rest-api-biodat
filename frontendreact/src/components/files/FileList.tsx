import React, { Component } from 'react'
import DataInterface from '../../interfaces/DataInterface'
import FileInterface from '../../interfaces/FileInterface'
import FileItem from './FileItem'

interface Props {
  files: FileInterface[],
}

export default class extends Component<Props> {
  state = {
    files: [] as FileInterface[],
  }

  async componentDidMount() {
    this.setState({
      files: this.props.files,
    })
  }

  async componentDidUpdate(prevProps) {
    if(this.props.files !== prevProps.files) {
      this.setState({
        files: this.props.files,
      })
    }
  }

  renderItems() {
    const { files } = this.state;
    return files.map((item, index) => {
      return (
        <FileItem
          key={index}
          file={item}
        />
      );
    });
  }
  
  render() {
    const { files } = this.state;
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
            {files.length > 0 && this.renderItems()}</tbody>
          </table>
        </div>
      </div>
    )
  }
}
