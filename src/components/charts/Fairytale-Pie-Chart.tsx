import React from "react";
import { Pie } from "react-chartjs-2";

import { Card } from "react-bootstrap";

import { generateRandomChartColors } from "../../utils/fairytaleHelpers";

interface IPie {
  labels: Array<unknown>;
  data: Array<unknown>;
  title?: string;
  description?: string;
}

const FairytalePieChart: React.FC<IPie> = ({ labels, data, title, description }) => {
  const dataSet = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: generateRandomChartColors(data.length),
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <h6 className="card-subtitle text-muted">{description}</h6>
      </Card.Header>
      <Card.Body>
        <div className="chart chart-sm">
          <Pie data={dataSet} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default FairytalePieChart;
