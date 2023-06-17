import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
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

export default function GenderPie({ data }) {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  const pie_data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "# of Total Patients",
        data: [maleCount, femaleCount],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setMaleCount(data.filter((c) => c.gender == "Male").length);
    setFemaleCount(data.filter((c) => c.gender == "Female").length);
  }, [data]);

  return (
    <>
      <div className="relative h-[40vh] w-[80vw] overflow-auto">
        <Pie options={options} data={pie_data} />
      </div>
    </>
  );
}
