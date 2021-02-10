import React, { Component } from 'react';

interface Props {
    id: number,
    handleItemEditForm: (data) => void;
}

export default class ItemEditForm extends Component<Props>{

    state={
        title:"",
    }

    handleFormSubmit(event){
        event.preventDefault();
        const { title } = this.state;
        const { id, handleItemEditForm } = this.props;
        handleItemEditForm({id, title});
    }

    render() {
        const {title} = this.state;
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
                    <button className="btn btn-primary">Editar Proyecto</button>
                </div>
            </form>    
        )
    }
}