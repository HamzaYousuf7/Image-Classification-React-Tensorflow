import React from "react";

const navbar = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand ">Image Classification</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active">
            <a>Home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
