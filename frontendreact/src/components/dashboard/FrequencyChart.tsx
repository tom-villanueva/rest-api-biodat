import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { colors } from "./utils";

interface Props {
  title: string;
  data: any[];
}

const FrequencyChart = (props: Props) => {

  const [filesData, setFilesData] = useState([] as any[]);
  const [chartData, setChartData] = useState([] as any[]);
  const [axesType, setAxesType]   = useState("linear");

  useEffect(() => {
    // let newData;
    // let data: any[] = [];
    // for(let i=0; i<props.data.length; i++) {
    //   // elimina los atributos que no van a ser utilizados,
    //   // en este caso no se utiliza la parte real
    //   newData = props.data[i].map(({fr, ...atributos}) => ({...atributos, y: fr}));
    //   console.log(newData);
    //   data.push(newData);
    // }
    
    setFilesData(props.data);
   
  }, [ props.data ])

  useEffect(() => {
    let chartData: any[] = [];
    for (let i = 0; i < filesData.length; i++) {
      var chartObject = {
        label: i.toString(),
        data: filesData[i],
        fill: false,
        backgroundColor: colors[i],
        borderColor: colors[i],
      };
      chartData.push(chartObject);
    }
    setChartData(chartData);
    console.log("chartdata ", chartData);
  }, [ filesData ]);

  return (
    <div className="card card-info">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>
        <h2 className="card-title">{`(${axesType})`}</h2>
        <div className="card-tools">
        <button
            type="button"
            className="btn btn-tool"
            onClick={() => {
              if(axesType === "linear"){
                setAxesType('logarithmic');
              }
              else{
                setAxesType("linear");
              }             
            }}
          >
            <i className="fas fa-chart-area" />
          </button>
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
        {chartData.length>0 && 
        <Line
          data={{            
              datasets: chartData
            }}
            options={{
              scales: {
                xAxes: [{
                  type: axesType,
                  position: 'bottom'
                }],
                yAxes: [{
                  type: 'linear',
                  position: 'left'
                }]
              },
              maintanAspectRatio: false,
            }}
        />}
        </div>
      </div>
      {/* /.card-body */}
    </div>
  );
};
export default FrequencyChart;