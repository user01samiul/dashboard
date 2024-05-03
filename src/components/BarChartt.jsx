import React from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";

function BarChartt() {
  const data = [
    {
      name: "Jan",

      users: 2400,
    },
    {
      name: "Feb",

      users: 1398,
    },
    {
      name: "Mar",

      users: 9800,
    },
    {
      name: "Apr",

      users: 3908,
    },
    {
      name: "May",

      users: 4800,
    },
    {
      name: "Jun",

      users: 3800,
    },
    {
      name: "Jul",

      users: 4300,
    },
  ];
  return (
    // <div className="barChart">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Tooltip
          labelStyle={{ display: "none" }}
          contentStyle={{ background: "transparent", border: "none" }}
          itemStyle={{ color: "yellow", fontSize: "10px", fontWeight: "normal" }}
        />
        <XAxis dataKey='name' style={{fontSize: '10px',
      margin: '0px'}}/>
        <Bar
        
          dataKey="users"
          fill="#16a085"
          activeBar={<Rectangle fill="yellow" stroke="transparent" />}
        />
      </BarChart>
    </ResponsiveContainer>
    // </div>
  );
}

export default BarChartt;
