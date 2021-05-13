import React, { useState } from 'react'

const MeasurerForm = () => {

  const initialItemState = {
    name:"",
    frequency:"",
    delimitador:"",
    real: "",
    imaginary: "",
    module: "",
    phase: "",
    from_line: 0
  };

  const [formData, setFormData] = useState(initialItemState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    throw new Error('Function not implemented.');
  };
  
  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
          <div className="form-group">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <label htmlFor="name">Nombre aparato:</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder="Ingrese nombre"
                    onChange={ handleInputChange }
                  >                 
                  </input>
                </div>
                <div className="col">
                  <label htmlFor="frequency">Frecuencia:</label>
                  <input
                    className="form-control"
                    type="number"
                    id="frequency"
                    name="frequency"
                    value={formData.frequency}
                    placeholder="Ingrese num de col"
                    onChange={ handleInputChange }
                  >                 
                  </input>
                </div>
                <div className="col">
                  <label htmlFor="real">Parte real:</label>
                  <input
                    className="form-control"
                    type="number"
                    id="real"
                    name="real"
                    value={formData.real}
                    placeholder="Ingrese num de col"
                    onChange={ handleInputChange }
                  >                 
                  </input>
                </div>
                <div className="col">
                  <label htmlFor="imaginary">Parte imaginaria:</label>
                  <input
                    className="form-control"
                    type="number"
                    id="imaginary"
                    name="imaginary"
                    value={formData.imaginary}
                    placeholder="Ingrese num de col"
                    onChange={ handleInputChange }
                  >                  
                  </input>
                </div>
                <div className="col">
                  <label htmlFor="real">Modulo:</label>
                  <input
                    className="form-control"
                    type="number"
                    id="module"
                    name="module"
                    value={formData.module}
                    placeholder="Ingrese num de col"
                    onChange={ handleInputChange }
                  >                  
                  </input>
                </div>
                <div className="col">
                  <label htmlFor="real">Fase:</label>
                  <input
                    className="form-control"
                    type="number"
                    id="phase"
                    name="phase"
                    value={formData.phase}
                    placeholder="Ingrese num de col"
                    onChange={ handleInputChange }
                  >                 
                  </input>
                </div>
                <div className="col">
                  <label htmlFor="real">Desde linea:</label>
                  <input
                    className="form-control"
                    type="number"
                    id="from_line"
                    name="from_line"
                    value={formData.from_line}
                    placeholder="Desde linea..."
                    onChange={ handleInputChange }
                  >                  
                  </input>
                </div>
              </div>
            </div>
          </div>
        </form>
  )
}

export default MeasurerForm;
