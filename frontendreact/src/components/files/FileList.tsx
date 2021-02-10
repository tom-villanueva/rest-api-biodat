import React, { Component } from 'react'

interface Props {
  item_id: number,
}

export default class extends Component<Props> {

  async componentDidMount() {

  }
  
  render() {
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

        </div>
      </div>
    )
  }
}
