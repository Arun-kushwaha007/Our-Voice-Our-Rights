import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { IDistrictSnapshot } from "../../../server/src/models/District";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TrendChartProps {
  trendData: IDistrictSnapshot[];
}

const TrendChart: React.FC<TrendChartProps> = ({ trendData }) => {
  const data = {
    labels: trendData.map((d) => `${d.month}/${d.year}`).reverse(),
    datasets: [
      {
        label: "Beneficiaries",
        data: trendData.map((d) => d.metrics.beneficiaries).reverse(),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Funds Released (Cr)",
        data: trendData.map((d) => d.metrics.fundsReleased).reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={data} />;
};

export default TrendChart;
