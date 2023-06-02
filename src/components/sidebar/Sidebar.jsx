/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Sidebar.css";
import logo from "../../assets/logo.png";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { FaRegListAlt , FaChalkboardTeacher , FaStickyNote , FaCommentDots, FaRegCalendarPlus, FaCreativeCommonsZero, FaShoppingCart, FaFileInvoiceDollar, FaHistory, FaDollarSign, FaFileInvoice } from 'react-icons/fa';


const Sidebar = ({ sidebarOpen, closeSidebar, clicked }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Inventory</h1>
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <h2>Склад</h2>
        <div className="sidebar__link">
          {/* <i className="fa fa-book" aria-hidden="true"></i> */}
          <FaRegListAlt className="logo_menu" />
          <NavLink to="inventory"><b onClick={() => clicked("Товары")}>Товары</b></NavLink>
        </div>
        <div className="sidebar__link">
          {/* <i className="fa fa-cart-arrow-down" aria-hidden="true"></i> */}
          <FaRegCalendarPlus className="logo_menu" />
          <NavLink to="add_inventory_product"><b onClick={() => clicked("Добавить товары на склад")}>Добавить товары на склад</b></NavLink>
        </div>
        <div className="sidebar__link">
          {/* <i className="fa fa-cart-arrow-down" aria-hidden="true"></i> */}
          <FaCreativeCommonsZero className="logo_menu" />
          <NavLink to="remaned_products"><b onClick={() => clicked("Мало осталось")}>Мало осталось</b></NavLink>
        </div>

        <h2>Отправка</h2>
        <div className="sidebar__link">
          {/* <i className="fa fa-cart-plus"></i> */}
          <FaShoppingCart className="logo_menu" />
          <NavLink to="sale_product"><b onClick={() => clicked("Продажа продукта")}>Продажа продукта</b></NavLink>
        </div>

        <h2>История</h2>
        <div className="sidebar__link">
          {/* <i className="fa fa-calendar-check-o"></i> */}
          <FaHistory className="logo_menu" />
          <NavLink to="history_sales"><b onClick={() => clicked("История продаж")}>История продаж</b></NavLink>
        </div>

        <div className="sidebar__link">
          {/* <i className="fa fa-money"></i> */}
          <FaFileInvoice className="logo_menu" />
          <NavLink to="report"><b onClick={() => clicked("Очёт")}>Очёт</b></NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;