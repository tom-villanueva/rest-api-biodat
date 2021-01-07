import React, { Component } from 'react';

interface Props {
    id: number,
    handleProjectEditForm: (data) => void;
}

export default class ProjectEditForm extends Component<Props>{

    state={
        title:"",
        description:"",
    }

    handleFormSubmit(event){
        event.preventDefault();
        const {title, description} = this.state;
        const { id } = this.props;
        this.props.handleProjectEditForm({id, title, description});
    }

    render() {
        const {title, description} = this.state;
        return(
            <form onSubmit={(event) => this.handleFormSubmit(event) }>
                <div className="form-group">
                    <label htmlFor="title"> Título </label>
                    <input
                        className="form-control" 
                        type="text"
                        value={title}
                        placeholder="Escriba el título"
                        onChange={(event) => {
                            this.setState({ title: event.target.value })
                        }}
                    >
                    </input>
                    <label htmlFor="description"> Descripción </label>
                    <input
                        className="form-control" 
                        type="text"
                        value={description}
                        placeholder="Escriba la descripción"
                        onChange={(event) => {
                            this.setState({ description: event.target.value })
                        }}
                    >
                    </input>
                    <button className="btn btn-primary">Editar Proyecto</button>
                </div>
            </form>    
        )
    }
}