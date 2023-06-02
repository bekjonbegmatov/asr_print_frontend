import React, { useState, useEffect } from "react";
import "./action.css";
import Actionitem from "./action item/actionitem";
import { data } from "jquery";
function Actions(props) {
  const [dana, setDana] = useState([]);

  const [total_quantity , setTotal_quantity] = useState(0)
  const [total_price , setTotal_price] = useState(0)
  const [total_selling_price , setTotal_selling_price] = useState(0)
  const [total_paid , setTotal_paid] = useState(0)
  const [pribl , setPribl] = useState(0)
  const [spend , setSpend] = useState(0)

  useEffect(() => {
    let time = new Date()

    let month = ((time.getMonth()+1)%12).toFixed()
    // month = ((12+1)%13).toFixed()
    if (month.length == 1){
      month = '0' + month
    }if(month == '00'){
      month = '01'
    }
    console.log(month)
    fetch(`${props.IP_ADRESS}actions/all?months=${month}&year=${time.getFullYear()}`)
      .then((response) => response.json())
      .then((data) => {
        setDana(data);
        // console.log(data)
        getAll(data)
      });

  }, []);
  function getAll(data) {
    let temp_quantity = 0 
    let temp_price = 0
    let temp_selling_price = 0
    let temp_paid = 0
    let pribl = 0
    let temp_spend = 0
    data.forEach(element => {
      temp_quantity += element.quantity
      temp_price += parseFloat(parseFloat(element.del_price) * parseFloat(element.quantity))
      temp_selling_price += parseFloat(parseFloat(element.selling_price) * parseFloat(element.quantity))
      temp_paid += parseFloat(element.paid)
      temp_spend +=parseFloat(element.body_price)

      pribl +=parseFloat((element.selling_price * element.quantity ) - (element.del_price * element.quantity))
    });
    // alert(temp_quantity)
    setTotal_quantity(temp_quantity)
    setTotal_price(temp_price)
    setTotal_selling_price(temp_selling_price)
    setTotal_paid(temp_paid)
    setPribl(pribl)
    setSpend(temp_spend)
  }
  return (
   <div className="inven1">
    <div className="row text-right py-2">
        <div className="col">
        </div>
      </div>
      <hr />
      <table className="mt-2 tab">
        <thead className="shapka">
          <th className="border">№</th>
          <th className="border">Qr code</th>
          <th className="border">Название</th>
          <th className="border">Кол-ва</th>
          <th className="border">Eдиница</th>
          <th className="border">Цена</th>
          <th className="border">Цена(продажа)</th>
          <th className="border">Оплачено</th>

          <th className="border">Cозданo</th>
          <th  className="border">Общая сумма</th>
          {/* <th></th> */}
        </thead>
        <tbody  className="border">
          {dana.map((val, i) => {
            if (val.product_name.toLowerCase().includes(props.sendSearch.toLowerCase())
            ) {
              return <Actionitem IP_ADRESS={props.IP_ADRESS} data={val} id={i+1} />;
            } else if (val.barcode.toString().toLowerCase().includes(props.sendSearch.toLowerCase())
            ) {
              return <Actionitem IP_ADRESS={props.IP_ADRESS} data={val} id={i+1} />;
            }
          })}
        </tbody>
      </table>
      <div className='ml-7'>
        <td> общее количество : {(total_quantity).toFixed(2)}</td>
        <td> общее Цена : {(total_price).toFixed(2)}</td>
        <td> общее Цена продажи : {(total_selling_price).toFixed(2)}</td>
        <td> общее Оплачено : {(total_paid).toFixed(2)}</td>
        <td> прибыл : {(total_paid - total_price).toFixed(2)}</td>
      </div>
   </div>
  );
}

export default Actions;
