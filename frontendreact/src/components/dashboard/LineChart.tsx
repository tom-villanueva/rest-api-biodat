import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import SelectedDataInterface from '../../interfaces/SelectedDataInterface';
import { colors } from "./utils";

interface Props {
  title: string;
  data: any[];
  selectedData: SelectedDataInterface;
}

const LineChart = (props: Props) => {
  const [filesData, setFilesData] = useState([] as any[]);
  const [chartData, setChartData] = useState([] as any[]);
  const originalData = props.data;
  const [axesType, setAxesType]   = useState("logarithmic");
  const chartRef = useRef<Line>(null);

  useEffect(() => {
    console.log(props.data);
    setFilesData(props.data);
  }, [ props.data ]);

  useEffect(() => {
    if(props.selectedData.selectedData !== null && props.selectedData.selectedData.length > 0){
      let newData;
      // let fillData: any[] = [];
      let frequencies = new Set(props.selectedData.selectedData.map(({fr}) => fr));

      for(let i = 0; i < originalData.length; i++) {
        if(originalData[i].name === props.selectedData.name) {
        newData = [...originalData[i].data.filter((obj) => {   
          if(frequencies.has(obj.x) || frequencies.has(obj.fr)) {
            return true;
          }
          else {
            return false;
          }
        })];

        }

        if(chartRef.current !== null){
          // console.log("entre");
          console.log(props.selectedData.name);
          chartRef.current.chartInstance.data.datasets.forEach((dataset) => {   
            if(dataset.label === props.selectedData.name){
              console.log(props.selectedData.name);
              console.log(newData);
              dataset.data = (newData);
            }
          })
          chartRef.current.chartInstance.update();
        }
        // fillData.push({data: newData, name: originalData[i].name});
      }
      // setFilesData([...fillData]);
    // }else {
      // setFilesData([...originalData]);
    }
  }, [ props.selectedData, originalData ]);

  useEffect(() => {
    let chartData: any[] = [];
    for (let i = 0; i < filesData.length; i++) {
      var chartObject = {
        label: filesData[i].name,
        data: filesData[i].data,
        fill: false,
        backgroundColor: colors[i],
        borderColor: colors[i],
        key: i
      };
      chartData.push(chartObject);
    }
    setChartData(chartData);
    // console.log("chartdata ", chartData);
  }, [ filesData ]);

  useEffect(() =>{
    if(chartRef.current !== null){
      chartRef.current.chartInstance.config.options.scales.xAxes[0].type = axesType;
      chartRef.current.chartInstance.update();
    }
  }, [axesType]);

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
          // redraw
          type={"scatter"}
          ref={chartRef}
          data={{            
              datasets: chartData
            }}
            options={{
              scales: {
                xAxes: [{
                  type: 'logarithmic',
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
export default LineChart;