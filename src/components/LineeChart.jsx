import React from "react";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

function LineeChart({ givenData }) {
  const data = givenData;
  // console.log(givenData)

  
  return (
    <div className="lineChart">
      {" "}
      {/*declaring height width is a must*/}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1abc9c"
            strokeWidth={1}
            dot={false}
          />
          <Tooltip
            labelStyle={{ display: "none" }}
            contentStyle={{
              background: "transparent",
              border: "none",
              color: "white",
            }}
            itemStyle={{ color: "white", fontSize: "12px" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineeChart;
