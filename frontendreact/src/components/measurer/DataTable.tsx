import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import SelectedDataInterface from '../../interfaces/SelectedDataInterface';
import Card from '../layout/Card';

interface Props {
  title: string;
  data: any[];
  handleSelectedData: (selectedData) => void;
}

const DataTableComponent = (props: Props) => {
  const [columns, setColumns] = useState([] as any[]);  
  const [actualData, setActualData] = useState([] as any[]);

  useEffect(() => {
    let column;
    let newColumns:any[] = [];

    let dataArray;
    let newData:any[] = [];

    if(props.data !== undefined && props.data.length > 0){
      // console.log("data cero ",props.data)
      const keys = Object.keys(props.data[0]);
      // console.log(keys);
      for(let i = 0; i < keys.length; i++){
        column = {
          name: keys[i],
          selector: keys[i],
          sortable: true
        }
        newColumns.push(column);
      }
      setColumns(newColumns);

      for(let i = 0; i < props.data.length; i++){
        //console.log(props.data[i].data)
        dataArray = Object.assign({}, props.data[i]);
        // console.log(dataArray)
        newData.push(dataArray);
      }
      setActualData(newData);
    }

  }, [ props.data ])


  const handleChange = (state) => {
    console.log(state);
    const rowsToChange:SelectedDataInterface = {
      selectedData: state.selectedRows,
      name: props.title
    };

    props.handleSelectedData(rowsToChange);
  }

  const paginacionOpciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  }

  return (
    <div>
        <DataTable 
          columns={columns}
          data={actualData}
          title={props.title}
          pagination
          fixedHeader
          selectableRows
          onSelectedRowsChange={handleChange}
          //noContextMenu
          paginationComponentOptions={paginacionOpciones}
          fixedHeaderScrollHeight="600px"
          className="dataTables_wrapper dt-bootstrap4"
        />
    </div>
  )
}
export default DataTableComponent;
