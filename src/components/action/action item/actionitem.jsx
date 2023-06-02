import React, { useState, useEffect } from "react";
import "../action.css"
function Actionitem(props) {
  useEffect(() => {
    // console.log(props[8])
    // console.log(props.data.del_price);

  }, [])
  function delet() {
    let id = props.data.id
    const ok = window.confirm("Вы действительно хотите удалить ?")
    if (ok) {
      fetch(`${props.IP_ADRESS}action/${id}`, {
        method: 'DELETE'
      })
        .catch(err => console.log(err))
      window.location.reload()
    }
  }
  function return_product() {
    const ok = window.confirm("Вы действительно хотите Возврат ?")
    if (ok){
      fetch(`${props.IP_ADRESS}refund`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.data.id,
          barcode: props.data.barcode,
          product_name: props.data.product_name,
          quantity: props.data.quantity,
        }),
      });
      window.location.reload()
    }
  }
  return (
    <React.Fragment >
      <tr className="carda ml-5 mt-3.5">
        <td className="border">{props.id}</td>
        <td className="border">{props.data.barcode}</td>
        <td className="border">{props.data.product_name}</td>
        <td className="border">{props.data.quantity}</td>
        <td className="border">{props.data.birlik}</td>
        <td className="border">{props.data.del_price}</td>
        <td className="border">{props.data.selling_price}</td>
        {/* <td className="border">{(props.data.body_price)}</td> */}
        <td className="border">{props.data.paid}</td>
        <td className="border">{props.data.created.slice(0, 10)}</td>
        <td className="border">{((props.data.quantity) * (props.data.selling_price)).toFixed(2)}</td>
        <td className="border">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id='dropbut' aria-expanded="false"></button>
            <ul className="dropdown-menu">
              <li><button className='dropdown-item' id='delite' onClick={delet} >Удалить</button></li>
              <li><button className='dropdown-item' id='edit' onClick={return_product} >Возврат</button></li>
            </ul>
          </div>
        </td>
      </tr>

    </React.Fragment>

  );
}

export default Actionitem;
