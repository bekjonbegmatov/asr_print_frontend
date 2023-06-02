import React, { useState } from 'react';
import { useEffect } from 'react';
import "./sellig_item.css"
import { FaCheckSquare } from "react-icons/fa";

function Sellig_item(props) {
    const [dana, setDana] = useState([])
    const [id, setID] = useState(0)
    const [pn, setPn] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [total_price, setTotalPrice] = useState(0)
    const [del_price, setDel_price] = useState(0)
    const [isSaled, setIsSaled] = useState(false)
    const [isTest, setTest] = useState(true)

    const [selling_price, setSelling_price] = useState(0)
    useEffect(() => {
        let bar = props.search
        if (bar.length == 0){
            bar = '0'
        }

        fetch(`http://127.0.0.1:8000inventory/all?barcode=${bar}`)
            .then(response => response.json())
            .then(data => {
                // setDana(data)
                // console.log(data)
                get_params(data)
            })
    })
    function saled() {
        if (quantity != 0 && quantity > 0) {
            fetch("http://127.0.0.1:8000action/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    barcode: dana[0].barcode,
                    product_name: dana[0].product_name,
                    quantity: quantity,
                    selling_price: selling_price,
                    paid: total_price,
                    del_price: dana[0].del_price,
                    body_price: dana[0].body_price,
                    birlik: dana[0].birlik,
                    empty: "empty",
                    empty_number: 0
                }),
            });
            setPn(dana[0].product_name)
            setIsSaled(true)
        } else {
            alert("Error !!!")
        }

    } function get_params(data) {
        if (isSaled == false) {
            setPn(data[0].product_name)
            setDel_price(data[0].del_price)
            // setSelling_price(parseFloat(data[0].selling_price))
            setDana(data)
            setID(data[0].id)
            one_range()
        }
    }function one_range (){
        if (isTest){
            setSelling_price(parseFloat(dana[0].selling_price))
            setTest(false)
        }
    }
    function get_selected_product_id(event) {

        let id = event.target.value
        setDel_price(dana[id].del_price)
        setSelling_price(parseFloat(dana[id].selling_price))
        setID(id)
    }
    function an_other(i) {
        let id = i
        // setID(id)
        an_other_too(i)
    }
    function an_other_too(i) {
        setDel_price(dana[i].del_price)
        setSelling_price(parseFloat(dana[i].selling_price))
        setID(i)
    }
    function get_quantity(event) {
        let q = event.target.value
        setQuantity(q)

    } function get_price() {
        let narh = parseFloat(selling_price) * parseFloat(quantity)
        setTotalPrice(narh)
    } function get_selling_price(event) {
        let temp = event.target.value
        setSelling_price(temp)

    } function new_method() {
        let nath = (dana[id].selling_price) * (quantity)
        setSelling_price(dana[id].selling_price)
    } function math() {
        let q = parseFloat(quantity)
        let sp = parseFloat(selling_price)
        let tp = parseFloat(sp * q)
        setTotalPrice(tp)
    }
    function retur(i) {
        let id = i
        setDel_price(dana[id].del_price)
        setSelling_price(parseFloat(dana[id].selling_price))
        setID(id)
        // return (<option value={i} selected >{dana[id].product_name}</option>)
    }
    return (
        <div className='sele'>
            {/* {!isSaled &&
                <select class="form-select vibor " aria-label="Default select example" onChange={get_selected_product_id}>
                    <option selected>Выберите товар</option>
                    {dana.map((val, i) => {
                        if (val.product_name.toLowerCase().includes(props.search.toLowerCase())
                        ) {
                            return (<option value={i}>{val.product_name}</option>)
                        } else if (val.barcode.toString().toLowerCase().includes(props.search.toLowerCase())
                        ) {
                            return (<option value={i}>{val.product_name}</option>)
                        }
                    })}
                </select>
            }
            {isSaled && 
                <p className='btn btn-success w-72 mr-10 pt-2' >{pn}</p>
            }

            <div>цена приход: {del_price}</div>
            <input type="number" className='form form-select' placeholder='количество' onKeyUp={math} onChange={get_quantity} />
            <input type="number" className='form form-select' placeholder='Цена (продажа)' onKeyUp={math} onChange={get_selling_price} value={selling_price} />
            <p id='price' className='w-14'>цена : {(total_price).toFixed(2)}</p>
            {isSaled == false &&
                <button className='btn btn-success navbar__right' onClick={() => { saled(); props.final_price(total_price) }}>продать</button>
            }{isSaled == true &&
                <button className='btn btn-success navbar__right' ><FaCheckSquare /></button>
            } */}
            <div>
                <p className='btn btn-warning w-72 mr-10 pt-2' >{pn}</p>
            </div>
            <div>цена приход: {del_price}</div>
            <input type="number" className='form form-select' placeholder='количество' onKeyUp={math} onChange={get_quantity} value={quantity} />
            <input type="number" className='form form-select' placeholder='Цена (продажа)' onKeyUp={math} onChange={get_selling_price} value={selling_price} />
            <p id='price' className='w-14'>цена : {(total_price).toFixed(2)}</p>
            {isSaled == false &&
                <button className='btn btn-success navbar__right' onClick={() => { saled(); props.final_price(total_price) }}>продать</button>
            }{isSaled == true &&
                <button className='btn btn-success navbar__right' ><FaCheckSquare /></button>
            }
        </div>
    );
}

export default Sellig_item;