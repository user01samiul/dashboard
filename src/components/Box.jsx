import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import LineeChart from "./LineeChart";

function Box({ givenData, title }) {
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);

  //percentage calc
  // eslint-disable-next-line react/prop-types
  const arrayBeforeLast = givenData[givenData.length - 2];
  // eslint-disable-next-line react/prop-types
  const arrayLast = givenData[givenData.length - 1];
  const percentageDifference =
    // eslint-disable-next-line react/prop-types
    (arrayLast.value / arrayBeforeLast.value) * 100 - 100;
  const integerPercentage = parseInt(percentageDifference);

  useEffect(() => {
    setPercentage(`${integerPercentage > 0 ? "+" : " "} ${integerPercentage}%`);
  }, [integerPercentage]);

  // --------------------

  useEffect(() => {
    givenData &&
      givenData.forEach((object, index, arr) => {
        setTotal((prevTotal) => prevTotal + object.value);
      });
  }, [givenData]);

  return (
    <div className="box box1">
      <div className="chartText">
        <span>{title}</span>
        <span>
          <CountUp start={0} end={total} duration={1}>
            {({ countUpRef }) => (
              <div>
                <span
                  style={{ fontSize: "24px" }}
                  className="counter"
                  ref={countUpRef}
                />
              </div>
            )}
          </CountUp>
        </span>
        <span>
          <a href="#" className="viewAll">
            View all
          </a>
        </span>
      </div>
      <div className="chartContainer">
        <LineeChart givenData={givenData} />
        <div className="chartContainerText">
          <span
            style={{
              color:
                percentageDifference < 0
                  ? "red"
                  : percentageDifference === 0
                  ? "white"
                  : "limegreen",
            }}
          >
            {percentage}
          </span>
          <span>last month</span>
        </div>
      </div>
    </div>
  );
}

export default Box;
