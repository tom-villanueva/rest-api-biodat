import React, { useState } from 'react'
import MeasurerInterface from '../../interfaces/MeasurerInterface';
import MeasurerService from '../../services/MeasurerService';

const MeasurerForm = () => {

  const initialMeasurerState = {
    name:"",
    fr:"",
    delimiter:",",
    real: "",
    imaginary: "",
    modulus: "",
    phase: "",
    fromLine: 0,
    created_at: "",
    updated_at: "",
    isPersonal: true,
  };

  const [formData, setFormData] = useState(initialMeasurerState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let data: MeasurerInterface = {
      id: 0,
      name: formData.name,
      fr: formData.fr,
      delimiter: ",",
      real: formData.real,
      imaginary: formData.imaginary,
      modulus: formData.modulus,
      phase: formData.phase,
      fromLine: formData.fromLine,
      created_at: "",
      updated_at: "",
      isPersonal: formData.isPersonal,
    }

    MeasurerService.create(data)
      .then(response => {
        console.log("measurer creado ", response.data);
      })
      .catch(e => {
        console.error(e);
      })
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
                    name="fr"
                    value={formData.fr}
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
                    name="modulus"
                    value={formData.modulus}
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
                    name="fromLine"
                    value={formData.fromLine}
                    placeholder="Desde linea..."
                    onChange={ handleInputChange }
                  >                  
                  </input>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-outline-primary">
                {`ACEPTAR `}
                <i className="fas fa-plus"></i>
            </button>
          </div>
        </form>
  )
}

export default MeasurerForm;
