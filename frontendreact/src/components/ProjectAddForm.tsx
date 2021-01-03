import React, { Component } from 'react';

interface Props {
    handleProjectForm: (data) => void;
}

export default class ProjectAddForm extends Component<Props>{

    state={
        title:"",
        description:"",
    }

    handleFormSubmit(event){
        event.preventDefault();
        const {title, description} = this.state;
        this.props.handleProjectForm({title, description});
    }

    render() {
        const {title, description} = this.state;
        const {handleProjectForm} = this.props;
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
                    <button className="btn btn-primary">Agregar Proyecto</button>
                </div>
            </form>    
        )
    }
}