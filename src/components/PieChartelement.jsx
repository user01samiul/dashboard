import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import '../styles/pieChartelement.css'

const data = [
  { name: "Android", value: 600 },
  { name: "Desktop", value: 300 },
  { name: "Iphone", value: 400 },
  { name: "Linux", value: 200 },
];
const COLORS = ["red", "#00C49F", "limegreen", "#FF8042"];

export default function PieChartelement() {

  return (
<div className="pieChartelement">
<ResponsiveContainer width="100%" height="80%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="70%"
          startAngle={180}
          endAngle={0}
          innerRadius="50%"
          outerRadius="70%"
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <div className="pieChartText">
      <ul>
        <li ><span style={{background: "red"}}></span>Android</li>
        <li> <span style={{background: "#00c49f"}}></span>Desktop</li>
        <li><span style={{background: "#32cd32"}}></span>Iphone</li>
        <li><span style={{background: "#ff8042"}}></span>Linux</li>
      </ul>
    </div>
</div>
  );
}
