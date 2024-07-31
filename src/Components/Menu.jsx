import React from "react";
import icon from "/icon.png";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="flex items-center justify-between w-full p-6">
      <div className="flex items-center gap-1">
        <img src={icon} className="h-10 w-10" />
        <h1 className="text-3xl cursor-pointer">
          Let's<span className="text-orange-400">Talk</span>
        </h1>
      </div>
      <Link to="/register">
        {" "}
        <button className="btn btn-primary md:px-8">Get Started</button>
      </Link>
    </div>
  );
};

export default Menu;
