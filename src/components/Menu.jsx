import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [selected, setSelected] = useState("home");

  function handleClick(name) {
    setSelected(name);
  }

  return (
    <div className="menu">
      <div className="menu-div ">
        <h3>MAIN</h3>
        <ul>
          <li
            onClick={() => handleClick("home")}
            className={`${selected === "home" ? "text-green-700" : ""}`}
          >
            <Link to="" className="link">
              <i className="fa-solid fa-house"></i>Home page
            </Link>
          </li>
          {/* <li>
            <i className="fa-regular fa-user"></i>Profile
          </li> */}
        </ul>
      </div>

      <div className="menu-div">
        <h3>SECTION</h3>
        <ul>
          {/* <li>
            <i className="fa-solid fa-cart-shopping"></i>Users
          </li> */}
          <li
            onClick={() => handleClick("products")}
            className={`${selected === "products" ? "text-green-700" : ""}`}
          >
            <Link to="/products" className="link">
              <i className="fa-solid fa-user"></i>Products
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
