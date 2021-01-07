import React, { Component } from 'react';

interface Props {
    id: number,
    handleProjectDeleteForm: (data) => void;
}

export default class ProjectEditForm extends Component<Props>{

    handleFormSubmit(event){
        event.preventDefault();
        const { id } = this.props;
        this.props.handleProjectDeleteForm({id});
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