import React, { Component } from "react";

interface Props {
  handleAddItem: (data) => void;
}

export default class ItemAddForm extends Component<Props> {
  state = {
    title: "",
  };

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const { handleAddItem } = this.props;
    handleAddItem({ title });
    this.setState({
      title:""
    })
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <input
                  className="form-control"
                  type="text"
                  value={title}
                  placeholder="Escriba el nombre del nuevo item..."
                  onChange={(event) => {
                    this.setState({
                      title: event.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="col">
                <button className="btn btn-primary">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
