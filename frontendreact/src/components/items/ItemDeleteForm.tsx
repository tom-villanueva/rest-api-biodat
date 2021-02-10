import React, { Component } from 'react'

interface Props {
    id: number,
    handleItemDeleteForm: (data) => void;
}

export default class ItemDeleteForm extends Component<Props> {
    handleFormSubmit(event){
        event.preventDefault();
        const { id, handleItemDeleteForm } = this.props;
        handleItemDeleteForm({ id });
    }

    render() {
        return(
            <form onSubmit={(event) => this.handleFormSubmit(event) }>
                <div className="form-group">
                    <button className="btn btn-danger">Eliminar Item</button>
                </div>
            </form>    
        )
    }
}
