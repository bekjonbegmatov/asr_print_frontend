import React, { useState, useEffect } from 'react';
import { FaCheckSquare } from "react-icons/fa";

function New_selling_item(props) {

    const [dana, setDana] = useState([])
    const [product, setProduct] = useState({})
    // Bools 
    const [is_selected, setISelected] = useState(false)
    const [is_bougth, setIS_Bougth] = useState(false)
    // Varebles
    const [quantity, setQuantiry] = useState(0)
    const [selling_price, setSelling_prise] = useState(0)
    const [id, setId] = useState(0)
    const [total_price, setTotalPrice] = useState(0)

    useEffect(() => {
        fetch(`${props.IP_ADRESS}inventory/all?barcode`)
            .then(response => response.json())
            .then(data => {
                setDana(data)
            })
    }, [])
    function get_product_details(event) {
        let id = event.target.value
        id = parseInt(id)
        setProduct(dana[id])
        setISelected(true)
        set_params(id)
        setId(id)
    } function set_params(id) {
        let quantity = 0
        let selling_price = dana[id].selling_price
        setSelling_prise(selling_price)
    } function get_quantity(event) {
        let qunatity = event.target.value
        setQuantiry(qunatity)
    } function get_selling_price(event) {
        let selling_prise = event.target.value
        setSelling_prise(selling_prise)
    } function bought() {
        if (quantity != 0 && quantity > 0) {
            fetch(`${props.IP_ADRESS}action/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    barcode: dana[id].barcode,
                    product_name: dana[id].product_name,
                    quantity: quantity,
                    selling_price: selling_price,
                    paid: total_price,
                    del_price: dana[id].del_price,
                    body_price: dana[id].body_price,
                    birlik: dana[id].birlik,
                    empty: "empty",
                    empty_number: 0
                }),
            });
            setIS_Bougth(true)

        }
    } function math() {
        let q = parseFloat(quantity)
        let sp = parseFloat(selling_price)
        let tp = parseFloat(sp * q)
        setTotalPrice(parseFloat(tp.toFixed(2)))
    }
    return (
        <div className='border flex justify-between p-2'>
            <select className='btn btn-warning' onChange={get_product_details}>
                <option value="" selected>Выбирите товар</option>
                {dana.map((val, i) => {
                    return (<option value={i}>{val.product_name}</option>)
                })}
            </select>
            {is_selected && <p>Цена приход: {product.del_price}</p>}
            {is_selected &&
                <div className='flex justify-between'>
                    <div>
                        <p>Количество</p>
                        <input type="number" onKeyUp={math} onChange={get_quantity} placeholder='Del price' value={quantity} />
                    </div>
                    <div className='ml-2'>
                        <p>Цена (продажа)</p>
                        <input type="number" onKeyUp={math} onChange={get_selling_price} placeholder='Selling Prise' value={selling_price} />
                    </div>
                </div>
            }
            {is_selected && <p>Цена : {total_price.toFixed(2)}</p>}
            {is_selected &&
                <div>
                    {!is_bougth &&
                        <button className='btn btn-success mt-3' onClick={() => { bought(); props.final_price(total_price) }}>продать</button>
                    }
                    {is_bougth &&
                        <button className='btn btn-success mt-3' ><FaCheckSquare /></button>
                    }
                </div>
            }
        </div>
    );
}

export default New_selling_item;