function Nav() {
  return (
    <div className="nav">
      <div className="nav-logo">
        <img src="/vite.svg" alt="" />
        <span>Dashboard</span>
      </div>
      <div className="nav-links">
        <i className="fa-solid fa-magnifying-glass"></i>
        <div className="bell">
          <i className="fa-regular fa-bell"></i>
          <span className="notification-count">3</span>
        </div>
        <i className="fa-solid fa-gear"></i>
        <div className="account">
          <img src="/stark.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
