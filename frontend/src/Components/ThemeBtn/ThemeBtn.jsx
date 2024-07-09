import React, { useState, useEffect } from "react";
import "./ThemeBtn.css";

function ThemeBtn({ label, className = "" }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const themeRoot = document.getElementById("root");

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      themeRoot.setAttribute("data-theme", "dark");
      themeRoot.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      themeRoot.setAttribute("data-theme", "light");
      themeRoot.classList.add("light");
      setIsDarkTheme(false);
    }
  }, []);

  const themeHandler = () => {
    const themeRoot = document.getElementById("root");

    if (isDarkTheme) {
      themeRoot.setAttribute("data-theme", "light");
      themeRoot.classList.remove("dark");
      themeRoot.classList.add("light");
      setIsDarkTheme(false);
    } else {
      themeRoot.setAttribute("data-theme", "dark");
      themeRoot.classList.remove("light");
      themeRoot.classList.add("dark");
      setIsDarkTheme(true);
    }
  };

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          onChange={themeHandler}
          id={label}
          className={className}
          checked={isDarkTheme}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default ThemeBtn;
