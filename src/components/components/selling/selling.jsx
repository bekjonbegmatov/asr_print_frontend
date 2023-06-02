import React, { Component } from 'react';
import Sellig_item from './selling_item/selling_item';
import "./selling.css"
import { useState } from 'react';
import { FaShoppingCart, FaRegPlusSquare } from "react-icons/fa";



function Selling(props) {
    const [list, setList] = useState([])
    const [tp, setTP] = useState(0)
    const [barcode, setBarcode] = useState('')
    function add(r) {
        let temp = []
        for (let i = 0; i < r; i++) {
            temp.push(i)
        }
        setList(temp)
    }
    function mat(id, quantity) {

    }
    function price(final_price) {
        let t = tp
        t += parseFloat(final_price)
        setTP(t)
    }function getBarcode(event){
        let bar = event.target.value
        setBarcode(bar)
    }
    return (
        <div>
            <div className='header'>
                <h1 className='trash flex justify-center'>Корзина <FaShoppingCart /></h1>
                <div className="flex justify-between">
                    <p> Oбщая сумма : {tp}</p>
                    <div className="form-outline">
                        <input id="search-focus" type="search" itemID="form1" className="form-control" placeholder="QR CODE" onChange={getBarcode} value={barcode} />
                    </div>
                </div>
                <hr />
            </div>
            <div>
                {list.map((i) => {
                    return (<Sellig_item take_prise={mat} final_price={price} search={barcode} key={i} />)
                })}
                <div className='button_add_product'>
                    <br />
                    <button className='btn btn-success flex justify-start' onClick={() => { add(list.length + 1) }}>Добавит +</button>
                </div>
            </div>
        </div>
    );
}

export default Selling;