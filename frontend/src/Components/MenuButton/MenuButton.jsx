import React from "react";
import "./MenuButton.css";

function MenuButton({ className = "", ...props }) {
  return (
    <div className={`${className} `}>
      <input id="burger-checkbox" type="checkbox" {...props}/>
      <label className="burger" htmlFor="burger-checkbox">
        <span className="dark:bg-slate-300"></span>
        <span className="dark:bg-slate-300"></span>
        <span className="dark:bg-slate-300"></span>
      </label>
    </div>
  );
}

export default MenuButton;
