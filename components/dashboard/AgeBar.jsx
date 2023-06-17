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
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Patients by Age Category",
    },
  },
};

export default function AgeBar({ data }) {
  const [cat1MCount, setCat1MCount] = useState(0);
  const [cat2MCount, setCat2MCount] = useState(0);
  const [cat3MCount, setCat3MCount] = useState(0);
  const [cat4MCount, setCat4MCount] = useState(0);
  const [cat5MCount, setCat5MCount] = useState(0);
  const [cat1FCount, setCat1FCount] = useState(0);
  const [cat2FCount, setCat2FCount] = useState(0);
  const [cat3FCount, setCat3FCount] = useState(0);
  const [cat4FCount, setCat4FCount] = useState(0);
  const [cat5FCount, setCat5FCount] = useState(0);

  const labels = ["0-14", "15-24", "25-54", "55-64", "65>"];

  const bar_data = {
    labels,
    datasets: [
      {
        label: "Male",
        data: [cat1MCount, cat2MCount, cat3MCount, cat4MCount, cat5MCount],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Female",
        data: [cat1FCount, cat2FCount, cat3FCount, cat4FCount, cat5FCount],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    setCat1MCount(
      data.filter((c) => c.age >= 0 && c.age <= 14 && c.gender == "Male").length
    );
    setCat2MCount(
      data.filter((c) => c.age >= 15 && c.age <= 24 && c.gender == "Male")
        .length
    );
    setCat3MCount(
      data.filter((c) => c.age >= 25 && c.age <= 54 && c.gender == "Male")
        .length
    );
    setCat4MCount(
      data.filter((c) => c.age >= 55 && c.age <= 64 && c.gender == "Male")
        .length
    );
    setCat5MCount(data.filter((c) => c.age >= 65 && c.gender == "Male").length);
    setCat1FCount(
      data.filter((c) => c.age >= 0 && c.age <= 14 && c.gender == "Female")
        .length
    );
    setCat2FCount(
      data.filter((c) => c.age >= 15 && c.age <= 24 && c.gender == "Female")
        .length
    );
    setCat3FCount(
      data.filter((c) => c.age >= 25 && c.age <= 54 && c.gender == "Female")
        .length
    );
    setCat4FCount(
      data.filter((c) => c.age >= 55 && c.age <= 64 && c.gender == "Female")
        .length
    );
    setCat5FCount(
      data.filter((c) => c.age >= 65 && c.gender == "Female").length
    );
  }, [data]);

  return (
    <>
      <div className="relative h-[40vh] w-[80vw] overflow-auto">
        <Bar options={options} data={bar_data} />
      </div>
    </>
  );
}
