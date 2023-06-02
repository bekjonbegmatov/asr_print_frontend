import React, { Component, useEffect } from 'react';
import Sellig_item from './selling_item/selling_item';
import "./selling.css"
import { useState } from 'react';
import { FaShoppingCart, FaRegPlusSquare } from "react-icons/fa";
import { event } from 'jquery';
import New_selling_item from './new_selling_item/new_selling_item';



function Selling(props) {
    const [list, setList] = useState([])
    const [tp, setTP] = useState(0)
    const [barcode, setBarcode] = useState('')

    const [dana , setDana] = useState([])

    useEffect (()=>{

    })

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
    } function getBarcode(event) {
        let bar = event.target.value
        setBarcode(bar)
    } function searched(event){
        let bar = event.target.value
        if (bar.length == 0){
            bar = ' '
        }
        fetch(`${props.IP_ADRESS}inventory/all?barcode=${bar}`)
        .then(response => response.json())
        .then(data => {
            setDana(data)
        })
    }
    return (
        <div>
            <div className='header'>
                <h1 className='trash flex justify-center'>Корзина <FaShoppingCart /></h1>
                <div className="flex justify-between">
                    <p> Oбщая сумма : {tp}</p>
                    <div className='button_add_product fixed'>
                        <br />
                        {/* <button className='btn btn-success flex justify-start' onClick={() => { add(list.length + 1) }}>Добавит +</button> */}
                    </div>
                    <div className="form-outline">
                        {/* <input id="search-focus" type="search" itemID="form1" className="form-control fixed poisk shadow-md shadow-lime-300 hover:shadow-lime-200" placeholder="QR CODE" onChange={getBarcode} value={barcode} /> */}
                        {/* <input id="search-focus" type="search" itemID="form1" className="form-control fixed poisk shadow-md shadow-lime-300 hover:shadow-lime-200" placeholder="QR CODE" onChange={searched} /><br /><br /><br /> */}
                        <button className='btn btn-success flex justify-start fixed poisk shadow-md shadow-lime-300' onClick={() => { add(list.length + 1) }}>Добавит +</button>

                    </div>
                </div>
                <hr />
            </div>
            <div>
                {list.map((i) => {
                    return (<New_selling_item IP_ADRESS={props.IP_ADRESS} take_prise={mat} data={dana} final_price={price} search={barcode} key={i} />)
                })}

            </div>
        </div>
    );
}

export default Selling;