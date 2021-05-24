import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

interface Props {
  title: string;
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
      console.log("data cero ",props.data)
      const size = Object.keys(props.data[0][0]).length;
      for(let i = 0; i < props.data[0][0].keys.length; i++){
        column = {
          name: String(i),
          selector: String(i),
          sortable: true
        }
        newColumns.push(column);
      }
      setColumns(newColumns);

      for(let i = 0; i < props.data[0].length; i++){
        //console.log(props.data[i].data)
        dataArray = Object.assign({}, props.data[0][i]);
        console.log(dataArray)
        newData.push(dataArray);
      }
      setActualData(newData);
    }

  }, [ props.data ])


  const conditionalRowStyles = [
    {
      when: row => row.toggleSelected,
      style: {
        backgroundColor: "green",
        userSelect: "none"
      }
    }
  ];

  const handleRowClicked = row => {
    const updatedData = actualData.map(item => {
      console.log(row.id, item.id)
      if (row.id !== item.id) {
        // if(item.toggleSelected === true) {
        //   return {
        //     ...item,
        //     toggleSelected: !item.toggleSelected
        //   };
        // }else{
        //   return item;
        // }
        console.log(item.toggleSelected);
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected
      };
    });

    setActualData(updatedData);
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
        //selectableRows
        //noContextMenu
        paginationComponentOptions={paginacionOpciones}
        conditionalRowStyles={conditionalRowStyles}
        onRowClicked={handleRowClicked}
        fixedHeaderScrollHeight="600px"
        className="dataTables_wrapper dt-bootstrap4"
      />
    </div>
  )
}
export default DataTableComponent;
