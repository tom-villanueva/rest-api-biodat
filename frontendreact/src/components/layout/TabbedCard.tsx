import React from 'react'
import DataTableComponent from '../measurer/DataTable'

interface Props {
  data: any[];
  handleSelectedData: (selectedData) => void;
}

const TabbedCard = (props: Props) => {

  const renderTabs = () => {
    return props.data.map((data, idx) => {
      return(
        <div className="tab-pane" id={`tab_${idx}`} key={idx}>
          <DataTableComponent
            title={`${idx}`}
            data={data}
            handleSelectedData={props.handleSelectedData}
          />
        </div>
      );
    });
  }

  const renderTabNav = () => {
    return props.data.map((e, idx) => {
      return(
        <li className="nav-item" key={idx}>
          <a className="nav-link" href={`#tab_${idx}`} data-toggle="tab">{`Tab ${idx}`}</a>
        </li>
      );
    })
  }

  return(
    <div>    
      <div className="card">
      <div className="card-header d-flex p-0">
        <h3 className="card-title p-3">Datos seleccionados</h3>
        <ul className="nav nav-pills ml-auto p-2">
          {props.data.length > 0 && renderTabNav()}
        </ul>
      </div>
      <div className="card-body">
        <div className="tab-content">
          {props.data.length > 0 && renderTabs()}
        </div>
      </div>
    </div>
    </div>
  );
}

export default TabbedCard;