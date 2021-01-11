import React, { Component } from 'react'

interface Props {
    id: number,
    project_id: number,
    handleItemDeleteForm: (data) => void;
}

export default class ItemDeleteForm extends Component<Props> {
    handleFormSubmit(event){
        event.preventDefault();
        const { id, project_id, handleItemDeleteForm } = this.props;
        handleItemDeleteForm({ project_id, id });
    }

    render() {
        return(
            <form onSubmit={(event) => this.handleFormSubmit(event) }>
                <div className="form-group">
                    <button className="btn btn-danger">Eliminar Proyecto</button>
                </div>
            </form>    
        )
    }
}
