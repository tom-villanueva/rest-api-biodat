import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

interface Props {
  data: any[],
}

const ColeChart = (props: Props) => {

  const [filesData, setFilesData] = useState([] as any[]);

  useEffect(() => {
    let newData;
    let data: any[] = [];
    for(let i=0; i<props.data.length; i++) {
      // elimina los atributos que no van a ser utilizados,
      // en este caso no se utiliza la parte real
      newData = props.data[0].map(({fr, ...atributos}) => atributos);//({...atributos, y: fr}));
      console.log(newData);
      data.push(newData);
    }
    // console.log("data", data[0]);
    setFilesData(data);
  }, [ props.data ])


  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">Cole Chart</h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="remove"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="chart">
        {filesData.length>0 && 
        <Line
          data={{            
              datasets: [{
                label: "frequency",
                data: filesData,
              }]
            }}
            options={{
              scales: {
                  xAxes: [{
                      type: 'linear',
                      position: 'bottom'
                  }]
              },
              fill: false,
            }}
        />}
        </div>
      </div>
      {/* /.card-body */}
    </div>
  );
};
export default ColeChart;