import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Menu from "./components/menu";

function App() {
  return (
    <main className="layout">
      <Nav />
      <div className="mid-layer">
        <Menu />
        <div style={{width: "100%",}}>
          <Outlet />
        </div>
      </div>

      {/* <Footer /> */}
    </main>
  );
}

export default App;
