import React, { useState, useEffect } from "react";
import "./action.css";
import List_user from "./list_user/list_user";
// import Actionitem from "./action item/actionitem";
import Duty_action_item from "./duty_action_item/duty_action_item";
import { data } from "jquery";
function Duty_action(props) {
  const [dana, setDana] = useState([]);

  const [total_quantity, setTotal_quantity] = useState(0)
  const [total_price, setTotal_price] = useState(0)
  const [total_selling_price, setTotal_selling_price] = useState(0)
  const [total_paid, setTotal_paid] = useState(0)
  const [pribl, setPribl] = useState(0)
  const [dolg, setDolg] = useState(0)
  const [spend, setSpend] = useState(0)
  const [fp, setFp] = useState(0)
  const [f_users, setF_users] = useState([])

  useEffect(() => {
    fetch(`${props.IP_ADRESS}kredit/all`)
      .then((response) => response.json())
      .then((data) => {
        setDana(data);
        // console.log(data)
        getAll(data)
        test(data)

      });
  }, []);
  function getAll(data) {
    let temp_quantity = 0
    let temp_price = 0
    let temp_selling_price = 0
    let temp_paid = 0
    let pribl = 0
    let temp_spend = 0
    let temp_final_price = 0
    let dolg = 0
    data.forEach(element => {
      temp_quantity += element.quantity
      temp_price += parseFloat(element.del_price)
      temp_selling_price += parseFloat(element.selling_price)
      temp_paid += parseFloat(element.paid)
      temp_spend += parseFloat(element.body_price)

      pribl += parseFloat((element.selling_price * element.quantity) - (element.del_price * element.quantity))
      dolg -= parseFloat(parseFloat(element.final_price)-parseFloat(element.paid))
      temp_final_price += parseFloat(element.final_price)
    });
    // alert(temp_quantity)
    setTotal_quantity(temp_quantity)
    setTotal_price(temp_price)
    setTotal_selling_price(temp_selling_price)
    setTotal_paid(temp_paid)
    setPribl(pribl)
    setSpend(temp_spend)
    setDolg(dolg)
    setFp(temp_final_price)
  }
  function test(par) {
    let data = par
    let users = []
    data.forEach(element => {
      users.push(element.client)
    });
    let filter_users = [...new Set(users)];
    // console.log(filter_users)
    setF_users(filter_users)
  }
  return (
    <div className="inven1">

      <div className="ml-11 mr-4">
          {f_users.map((val , i) => {
            if (val.toLowerCase().includes(props.sendSearch.toLowerCase())) {
              return <List_user IP_ADRESS={props.IP_ADRESS} data={dana} id={i} name={val} />
            }
          })}
      </div>
      <div className='flex justify-between mt-2 '>
        <td> общее количество : {total_quantity}</td>
        <td> общее Цена : {fp}</td>
        <td> общее Цена продажи : {total_selling_price}</td>
        <td> общее Оплачено : {total_paid}</td>
        <td> {pribl > 0 && <p className="text-lime-500"> прибыл : {Number((pribl).toFixed(2))}</p>}{pribl <= 0 && <p className="text-red-500"> прибыл : {pribl}</p>}</td>
        <td> На Долг : {dolg}</td>
      </div>

    </div>
  );
}

export default Duty_action;
