import React, { useState, useEffect } from 'react';
import "./product.css";
import Edit from '../../edit/edit';


function Product(props) {
    const [product_name, setProduct_name] = useState('')
    const [del_quantity, setDel_quantity] = useState(0)
    const [sales, setSales] = useState(0)
    const [del_price, setDel_price] = useState("")
    const [remained, setRemained] = useState(0)
    const [r, setR] = useState(0)

    const [isEdit, setEdit] = useState(false)
    const [isRemained, setIsRemained] = useState(false)

    const [body_price, setBody_price] = useState(0)
    const [barcode, setBarcode] = useState(0)
    const [costpro, setCostpro] = useState(0)
    const [created, setCreated] = useState('')

    useEffect(() => {
        let data = props.data
        setBarcode(data.barcode)
        setProduct_name(data.product_name)
        setDel_quantity(data.quantity)
        setDel_price(data.del_price)
        setSales(data.sales)
        setRemained(data.remained)
        setBody_price(data.body_price)
        setCostpro(data.selling_price)
        setCreated(data.created.slice(0, 10))
    })
    function delite() {
        let id = props.data.id
        const ok = window.confirm("Вы действительно хотите удалить ?")
        if (ok) {
            fetch(`${props.IP_ADRESS}inventory/${id}`, {
                method: 'DELETE'
            })
                .catch(err => console.log(err))
            window.location.reload()
        }
    }
    function onEdit(par) {
        setEdit(par)
    } function onremained(par) {
        setIsRemained(par)
    } function add_remained() {
        let id = props.data.id
        fetch(`${props.IP_ADRESS}inventory/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barcode: parseInt(barcode),
                product_name: product_name,
                quantity: parseFloat(del_quantity) + parseFloat(r),
                remained: parseFloat(remained) + parseFloat(r),
                sales: parseFloat(sales),
                del_price: parseFloat(del_price),
                selling_price: parseFloat(costpro),
                body_price: parseInt(body_price),
                birlik: props.data.birlik,
                empty: "empty",
                empty_number: 0,
            }),
        })
        window.location.reload()

    } function get_remained(event) {
        let r = event.target.value
        setR(r)
    }
    return (

        <React.Fragment>
            {isEdit == false &&
                <tr>
                    <td className='border'>{product_name}</td>
                    <td className='border'>{del_quantity}</td>
                    <td className='border'>{remained != 0 && remained} {remained == 0 && <p className='product_end'>Товар закончен</p>}</td>
                    <td className='border'>{sales}</td>
                    <td className='border'>{props.data.birlik}</td>
                    <td className='border'>{del_price}</td>
                    <td className='border'>{costpro}</td>
                    <td className='border'>{created}</td>
                    <td className='border'>{barcode}</td>
                    <td className='border'>{(costpro * remained).toFixed(2)}</td>
                    <td className='border'>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id='dropbut' aria-expanded="false"></button>
                            <ul className="dropdown-menu">
                                <li><button className='dropdown-item' id='edit' onClick={() => { onEdit(true) }} >Редактировать</button></li>
                                <li><button className='dropdown-item' id='edit' onClick={() => { onremained(true) }} >Добавить</button></li>
                                <li><button className='dropdown-item' id='delite' onClick={delite}>Удалить</button></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            }
            {isEdit == true &&
                <div>
                    <Edit IP_ADRESS={props.IP_ADRESS} data={props.data} name={props.data.birlik} onEdit={onEdit} isDeliver={false} store={false} />
                </div>
            }
            {isRemained &&
                <div className='m-3 p-2 border'>
                    <input type="number" onChange={get_remained} placeholder='Количество' className='form form-select' />
                    <div className='flex mt-1'>
                        <button type="button" onClick={add_remained} className='btn btn-warning'>Добавить</button>
                        <button type='button' className='btn btn-danger' onClick={() => onremained(false)}>Назад</button>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default Product;