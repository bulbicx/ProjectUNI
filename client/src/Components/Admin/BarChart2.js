import React, { useEffect, useRef } from "react";
import Style from "./chart.module.css";
import Chart from "chart.js";

const ChartBarData = ({labels, datas, titleGraph, typeData}) => {
        
  const canvasRef = useRef();
  
  // eslint-disable-next-line
  useEffect(() => {
  const data = []

  for (let x = 0; x < labels.length; x++) {
      data.push({Date: labels[x], Cases: datas[x]})
  }

  const canvas = canvasRef.current.getContext("2d");
  let randomcolor=(color1,color2)=>{
    return Math.floor(Math.random()*color1+color2)
  }
  const chart = {
    type: "bar",
    data: {
      datasets: [
        {
          label: typeData, 
          data:  data.map((item) =>{
          return{
            t:item.Date,
            y:item.Cases
          }} ),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: "#123E80",
          borderWidth: 1,
          pointBackgroundColor:data.map((item)=>`#${randomcolor(900,100)}E${randomcolor(90,10)}8c`) ,
          pointHoverBackgroundColor:data.map((item)=>`#${randomcolor(900,100)}E${randomcolor(90,10)}`)
          
        },
      ],
    },

    options: {
      responsive: true,
      animation: {
        duration: 1000,
      },
      title: {
        display: true,
        text: titleGraph,
        fontSize: 25,
      },
      legend: {
        display: true,
        position: "bottom",
      },
      scales: {
        xAxes: [
          {
              type: "time", 
              time: {
                  unit: "week",
              //my data in daily basis change to "week" if data in weekly basis
              },
          
              distribution: "series",
          //   gridLines: {
          //     lineWidth: 0,
          //   },
          },
        ],
        yAxes: [
          {
            ticks: {
              callback: function (value, index, values) {
                return value;
              },
            },
          },
        ],
      },
      tooltips: {
        intersect: false,
        mode: "index",
      },
    },
  };

  let myChart = new Chart(canvas, chart);
  return () => {
    myChart.destroy();
    };
    // eslint-disable-next-line
  }, [datas, labels]);

  return (
    <div className={Style.timeserise}>
        <canvas ref={canvasRef} />
    </div>
  );
};

export default ChartBarData;