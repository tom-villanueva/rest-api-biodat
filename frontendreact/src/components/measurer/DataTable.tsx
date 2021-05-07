import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

interface Props {
  data: any[]
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

      for(let i = 0; i < props.data[0].data.length; i++){
        column = {
          name: String(i),
          selector: String(i)
        }
        newColumns.push(column);
      }
      setColumns(newColumns);

      for(let i = 0; i < props.data.length; i++){
        console.log(props.data[i].data)
        dataArray = Object.assign({}, props.data[i].data);
        newData.push(dataArray);
      }
      setActualData(newData);
    }

  }, [ props.data ])

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
        title="Nuevo aparato"
        pagination
        fixedHeader
        paginationComponentOptions={paginacionOpciones}
        fixedHeaderScrollHeight="600px"
        className="dataTables_wrapper dt-bootstrap4"
      />
    </div>
  )
}
export default DataTableComponent;
