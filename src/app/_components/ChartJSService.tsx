"use client";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  PointElement,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  Legend,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";

interface ChartJSServiceProps {
  data: any;
  type: string;
}

ChartJs.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ChartJSService = ({ data, type }: ChartJSServiceProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && Object.keys(data).length) setLoading(false);
  }, [data]);

  return (
    <>
      {type === "line" && !loading && <Line data={data}></Line>}
      {type === "bar" && !loading && <Bar data={data}></Bar>}
    </>
  );
};

export default ChartJSService;
