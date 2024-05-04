import React from "react";
import { Line } from "react-chartjs-2";

import { Card } from "react-bootstrap";
import { generateRandomChartColors } from "../../utils/fairytaleHelpers";
import { IMonthlyStatObject } from "../../pages/fairytale-ads/CampaignDetail";
import { CHARTS_PALETTE } from "../../constants";

interface ILine {
  labels: Array<string>;
  data: IMonthlyStatObject;
  title?: string;
  description?: string;
  lineLabel?: string;
}

export const FairytaleLineChart: React.FC<ILine> = ({ labels, data, title, description, lineLabel }) => {
  const _labels = Object.keys(data);
  const dataSet = {
    labels: labels,
    datasets: _labels.map((label, index) => {
      // @ts-ignore
      const dataToChart: Array<number> = data[label];
      const _chartColor = generateRandomChartColors(1)[0];
      return {
        label: label === "clicksPerMonth" ? "Clicks" : "Views",
        fill: true,
        backgroundColor: "transparent",
        borderColor: _chartColor,
        data: dataToChart,
      };
    }),
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.05)",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0)",
            fontColor: "#fff",
          },
        },
      ],
    },
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <h6 className="card-subtitle text-muted">{description}</h6>
      </Card.Header>
      <Card.Body>
        <div className="chart">
          <Line data={dataSet} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default FairytaleLineChart;
