import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Patients by Gender",
    },
  },
};

export default function GenderBar({ data }) {
  const [highRiskMaleCount, setHighRiskMaleCount] = useState(0);
  const [highRiskFemaleCount, setHighRiskFemaleCount] = useState(0);
  const [lowRiskMaleCount, setLowRiskMaleCount] = useState(0);
  const [lowRiskFemaleCount, setLowRiskFemaleCount] = useState(0);
  const [notTestedMaleCount, setNotTestedMaleCount] = useState(0);
  const [notTestedFemaleCount, setNotTestedFemaleCount] = useState(0);

  const labels = ["Male", "Female"];

  const bar_data = {
    labels,
    datasets: [
      {
        label: "High Risk",
        data: [highRiskMaleCount, highRiskFemaleCount],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Low Risk",
        data: [lowRiskMaleCount, lowRiskFemaleCount],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Not Tested",
        data: [notTestedMaleCount, notTestedFemaleCount],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    setHighRiskMaleCount(
      data.filter((c) => c.result?.result == "High Risk" && c.gender == "Male")
        .length
    );
    setHighRiskFemaleCount(
      data.filter(
        (c) => c.result?.result == "High Risk" && c.gender == "Female"
      ).length
    );
    setLowRiskMaleCount(
      data.filter((c) => c.result?.result == "Low Risk" && c.gender == "Male")
        .length
    );
    setLowRiskFemaleCount(
      data.filter((c) => c.result?.result == "Low Risk" && c.gender == "Female")
        .length
    );
    setNotTestedMaleCount(
      data.filter((c) => c.result == null && c.gender == "Male").length
    );
    setNotTestedFemaleCount(
      data.filter((c) => c.result == null && c.gender == "Female").length
    );
  }, [data]);

  return (
    <>
      <div className="w-[40%]">
        <Bar options={options} data={bar_data} />
      </div>
    </>
  );
}