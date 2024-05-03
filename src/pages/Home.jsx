import React from "react";
import BarChartt from "../components/BarChartt";
import Box from "../components/Box";
import ChartArea from "../components/ChartArea";
import PieChartelement from "../components/PieChartelement";
import DisplayUsers from "../components/DisplayUsers";
import "../styles/home.css";
import { monthlyUsers, soldProducts, goodReviews, newProducts } from "../../data/data";


function Home() {
  return (
    <div className="grid-container home">
      <Box givenData={monthlyUsers}
      title="Monthly Users"/>
      <Box givenData={soldProducts}
      title="Products Sold"/>
      <div className="box box3">
        <DisplayUsers />
      </div>
      <div className="box box4">
        <PieChartelement />
      </div>
      <Box title="New Products" givenData={newProducts} />
      <Box title="Reviews Given" givenData={goodReviews}/>
      <div className="box box7">
        <ChartArea />
      </div>
      <div className="box box8">
        <BarChartt />
      </div>
      <div className="box box9">
        <BarChartt />
      </div>
    </div>
  );
}

export default Home;
