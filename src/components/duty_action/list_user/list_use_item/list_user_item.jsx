import React, { useState, useEffect } from 'react';

function List_user_item(props) {
    const [is_pay, setIs_pay] = useState(false)
    const [paid, setPaid] = useState(0)

    function delet() {
        let id = props.data.id
        const ok = window.confirm("Вы действительно хотите удалить ?")
        if (ok) {
            fetch(`${props.IP_ADRESS}kredit/${id}`, {
                method: 'DELETE'
            })
                .catch(err => console.log(err))
            window.location.reload()
        }
    } function get_pay(event) {
        let temp = parseFloat(event.target.value)
        let paaid = parseFloat(props.data.paid)

        setPaid(parseFloat(temp+paaid))
    } function send_pay() {
        let c = props.data.c
        if (parseFloat(paid) == parseFloat(props.data.final_price)) {
            c = false
        }
        fetch(`${props.IP_ADRESS}kredit/${props.data.id}`, {
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
    return (
        <React.Fragment>
            <tr>
                <td className='border'>{props.data.product_name}</td>
                <td className='border'>{(props.data.created).slice(0, 10)}</td>
                <td className='border'>{props.data.barcode}</td>
                <td className='border'>{props.data.paid}</td>
                <td className='border'>{parseFloat(props.data.final_price) - parseFloat(props.data.paid)}</td>
                <td className='border'>{props.data.birlik}</td>
                <td className='border'>{props.data.quantity}</td>
                <td className='border'>{props.data.selling_price}</td>
                <td className='border'>{props.data.final_price}</td>
                <td className='border'>
                    {!is_pay &&
                        <button className='btn btn-success text-xl' onClick={() => { setIs_pay(true) }} >Oплатить</button>
                    }
                    {is_pay &&
                        <div>
                            <input type="number" placeholder='сумма' onChange={get_pay} className='form form-control' />
                            <div className='flex mt-1'>
                                <button className='btn btn-success ' onClick={send_pay}>Oплатить</button>
                                <button className='btn btn-danger' onClick={() => { setIs_pay(false) }}>отмена</button>
                            </div>
                        </div>
                    }
                </td>
                <td className='border'>
                    <button className='btn btn-danger text-xl' onClick={delet}>удалить</button>
                </td>
            </tr>
        </React.Fragment>
    );
}

export default List_user_item;