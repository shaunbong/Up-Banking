import React from "react";
import styles from "./Chart.module.css";
import { Bar } from "react-chartjs-2";

const Chart = ({ data }) => {
  const barChart = data.length ? (
    <Bar
      data={{
        labels: data.map(({ date }) => date),
        datasets: [
          {
            label: "Amount",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: data.map(({ amount }) => amount),
          },
        ],
      }}
      width={1000}
      height={100}
      options={{
        onClick: (e) => {
          const { datasets } = e[0]._chart.tooltip._data;
          const datasetIndex = e[0]._datasetIndex;
          const dataIndex = e[0]._index;

          console.log(datasetIndex);
        },
        maintainAspectRatio: false,
      }}
    />
  ) : null;

  return (
    <div>
      <h1>hello</h1>
      {barChart}
    </div>
  );
};

export default Chart;
