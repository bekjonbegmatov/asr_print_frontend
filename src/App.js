import { useState } from "react";
import Report from "./components/report/report";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Inventory from "./components/inventory/inventory";
import Actions from "./components/action/action"
import Addproduct from "./components/inventory/product/form_add_product/add_product";
import Selling from "./components/selling/selling";
import Ended_products from "./components/ended_products/ended_products";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'

import './main_menu.css'

const App = () => {
  const [pval, setPval] = useState('')
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const [search, setSearch] = useState('')

  const [IP_ADRESS , setIp_adress] = useState('http://127.0.0.1:8000/')

  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };
  const click = (n) => {
    setPval(n)
  }
  const sendSearch = (val) => {
    setSearch(val)
  }
  return (
    <div className="container">
      <Router>
        <Navbar sidebarOpen={sidebarOpen} pval={pval} sendSearch={sendSearch} openSidebar={openSidebar} />
        <div className="main_menu">
          <Switch>
            <Route path="/inventory"><Inventory IP_ADRESS={IP_ADRESS} sendSearch={search} /></Route>
            <Route path="/add_inventory_product"><Addproduct IP_ADRESS={IP_ADRESS} /></Route>
            <Route path="/history_sales"><Actions IP_ADRESS={IP_ADRESS} sendSearch={search} /></Route>
            <Route path="/report"><Report IP_ADRESS={IP_ADRESS} sendSearch={search} /></Route>
            <Route path="/sale_product"><Selling IP_ADRESS={IP_ADRESS} sendSearch={search} /></Route>
            <Route path="/remaned_products"><Ended_products IP_ADRESS={IP_ADRESS} sendSearch={search} /></Route>
          </Switch>
        </div>
        <Sidebar sidebarOpen={sidebarOpen} clicked={click} closeSidebar={closeSidebar} />
      </Router>
    </div>
  );
};

export default App;