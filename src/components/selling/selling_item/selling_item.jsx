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

    const [id_prod, SetId_prod] = useState(0)

    useEffect(() => {
        let bar = props.search
        if (bar.length == 0) {
            bar = '0'
        }
        if (props.data.length == 0) {
            console.log('404 result not find');
        } else {
            // get_params(props.data)
        }
    },[])
    function saled() {
        if (quantity != 0 && quantity > 0) {
            fetch(`${props.IP_ADRESS}action/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    barcode: dana[id_prod].barcode,
                    product_name: dana[id_prod].product_name,
                    quantity: quantity,
                    selling_price: selling_price,
                    paid: total_price,
                    del_price: dana[id_prod].del_price,
                    body_price: dana[id_prod].body_price,
                    birlik: dana[0].birlik,
                    empty: "empty",
                    empty_number: 0
                }),
            });
            setPn(dana[id_prod].product_name)
            setIsSaled(true)
        } else {
            alert("Error !!!")
        }

    } function get_params(data) {
        if (isSaled == false) {
            setPn(data[id_prod].product_name)
            setDel_price(data[id_prod].del_price)
            console.log(dana[id_prod].del_price);
            // setSelling_price(parseFloat(data[0].selling_price))
            // setDana(data)
            setID(data[id_prod].id)
            one_range(data)
        }
    } function one_range(data) {
        if (isTest) {
            setSelling_price(parseFloat(data[id_prod].selling_price))
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
        setDel_price(dana[id_prod].del_price)
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
    } function searched(event) {
        alert('URAAAAA!!!')
    } function change_id_product(event) {
        // console.log(event);
        let temp = event.target.value
        // alert(temp)
        SetId_prod(parseInt(temp))
        get_params(props.data)
        // setBirlik_one(temp)
    }
    return (
        <div className='sele'>
            <div className='btn btn-warning mr-10'>
                <select name="" onChange={change_id_product} className='form form-select w-12' id="">
                    <option value="" selected>товары</option>
                    {props.data.map((val, i) => {
                        return (<option value={i}>{val.product_name}</option>)
                    })}
                </select>
                {/* <p className='btn btn-warning w-72 mr-10 pt-2' >{pn}</p> */}
            </div>
            <div>цена приход: {del_price}</div>
            <div>
                <p className='text-center text-gray-800'>количество</p>
                <input type="number" className='inputla' placeholder='количество' onKeyUp={math} onChange={get_quantity} value={quantity} />
            </div>
            <div>
                <p className='text-center text-gray-800'>Цена (продажа)</p>
                <input type="number" className='inputla' placeholder='Цена (продажа)' onKeyUp={math} onChange={get_selling_price} value={selling_price} />
            </div>
            <p id='price' className='w-14'>цена : {(total_price).toFixed(2)}</p>
            {isSaled == false &&
                <button className='btn btn-success navbar__right ml-12' onClick={() => { saled(); props.final_price(total_price) }}>продать</button>
            }{isSaled == true &&
                <button className='btn btn-success navbar__right ml-12' ><FaCheckSquare /></button>
            }
        </div>
    );
}

export default Sellig_item;