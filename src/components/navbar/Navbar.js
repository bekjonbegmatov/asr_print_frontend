/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Navbar.css";
import React, { useState, useEffect } from 'react';

import avatar from "../../assets/avatar.svg";

const Navbar = ({ sidebarOpen, openSidebar, sendSearch, pval }) => {
  const [sval, setSval] = useState('')

  function get_val(event) {
    const str = event.target.value;
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    setSval(str2)
  }
  return (
    <div className="">
      <nav className="navbar shadow-md">
        <div className="nav_icon" onClick={() => openSidebar()}>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="navbar__left">
          <a className="active_link" href="#">
            {pval}
          </a>
        </div>
        <div className="navbar__right">
          <div className="input-group">
           
              <div className="form-outline">
                <input id="search-focus" type="search" itemID="form1" className="form-control" placeholder="Поиск" onKeyUp={() => sendSearch(sval)} onChange={get_val} value={sval} />
              </div>
            
          </div>
        </div>
      </nav>
      <br />
    </div >


  );
};

export default Navbar;