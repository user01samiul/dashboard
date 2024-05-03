import React from "react";
import { users } from "../../data/data.js";
import '../styles/users.css'


function Users() {

  return (
    <div className="users-container">
      <ul>
        {users.map((item) => {
          return (
            <li key={item.id}>
              <div className="users-image">
                <img src={item.img} alt="profile picture" />
              </div>

              <div className="users-text">
                <h2>{item.username}</h2>
                <span className="users-email">{item.email}</span>
              </div>
              <span className="price">{`$ ${item.amount}`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;
