import React, { useState, useEffect } from "react";
import "../action.css"
function Duty_action_item(props) {
  const [isPaid, setIsPaid] = useState(false)
  const [paid, setPaid] = useState(0)

  useEffect(() => {
    setPaid(props.data.paid)
  }, [])
  function get_paid(event) {
    let temp = event.target.value

    setPaid(temp)
  }
  function send_paid() {
    let c = props.data.c
    if (parseFloat(paid) == parseFloat(props.data.final_price)) {
      c = false
    }
    fetch(`http://127.0.0.1:8000kredit/${props.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: props.data.client,
        phone_number: props.data.phone_number,
        barcode: props.data.barcode,
        product_name: props.data.product_name,
        quantity: props.data.quantity,
        selling_price: props.data.selling_price,
        paid: paid,
        del_price: props.data.del_price,
        body_price: props.data.body_price,
        birlik: props.data.birlik,
        c: c,
        final_price: props.data.final_price,
      }),
    });
    window.location.reload()
  }
  function delet() {
    let id = props.data.id
    const ok = window.confirm("Вы действительно хотите удалить ?")
    if (ok) {
      fetch(`http://127.0.0.1:8000kredit/${id}`, {
        method: 'DELETE'
      })
        .catch(err => console.log(err))
      window.location.reload()
    }
  }
  return (
    <React.Fragment className="carda ml-5 mt-3.5">
      <tr >
        <td className="border">{props.data.client}</td>
        <td className="border">{props.data.phone_number}</td>
        <td className="border">{props.data.barcode}</td>
        <td className="border">{props.data.product_name}</td>
        <td className="border">{(props.data.created).slice(0, 10)}</td>
        <td className="border">{(props.data.paid)}</td>
        <td className="border">{(props.data.final_price) - (props.data.paid)}</td>
        <td className="border">{props.data.quantity}</td>
        <td className="border">{props.data.birlik}</td>
        <td className="border">{props.data.c == true &&
          <p className="text-red-500">Да</p>}{props.data.c == false &&
            <p className="text-green-500">Нет</p>}</td>
        <td className="border">{(props.data.final_price)}</td>
        <td className="border">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id='dropbut' aria-expanded="false"></button>
            <ul className="dropdown-menu">
              <li><button className='dropdown-item' id='edit' onClick={() => { setIsPaid(true) }} > Oплатить</button></li>
              <li><button className='dropdown-item' id='delite' onClick={delet} >Удалить</button></li>
            </ul>
          </div>
        </td>
      </tr>
      {isPaid == true &&
        <div>
          <input type="number" onChange={get_paid} value={paid} />
          <button className="btn btn-danger" onClick={() => { setIsPaid(false) }}> отмена</button>
          <button className="btn btn-success" onClick={send_paid}> оплатить</button>
        </div>
      }


    </React.Fragment>

  );
}

export default Duty_action_item;
