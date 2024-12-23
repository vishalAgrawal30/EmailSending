import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? "→" : "←"}
      </button>
      <div className="sidebar-content">
        <h3 className="brand">Admin Panel</h3>
        <ul className="menu">
          <li className="menu-item">
            <i className="icon home-icon"></i> {!isCollapsed && "Dashboard"}
          </li>
          <li className="menu-item">
            <i className="icon layout-icon"></i> {!isCollapsed && "Page Layouts"}
          </li>
          <li className="menu-item">
            <i className="icon widget-icon"></i> {!isCollapsed && "Widgets"}
          </li>
          <li className="menu-item">
            <i className="icon ui-icon"></i> {!isCollapsed && "UI Elements"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
