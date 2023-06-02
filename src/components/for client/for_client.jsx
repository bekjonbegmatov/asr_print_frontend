import { data } from 'jquery';
import React, { useState, useEffect } from 'react';
import Sell_For_Client from './sell_item.jsx/sell_for_client';


function For_Client(props) {
    const [dana, setDana] = useState([])
    const [list, setList] = useState([])
    const [tp, setTP] = useState(0)
    const [user_name, setUser_name] = useState('')
    const [barcode, setBarcode] = useState('')

    useEffect(() => {
        fetch(`${props.IP_ADRESS}client/all`)
            .then(response => response.json())
            .then(data => {
                setDana(data)
            })
    }, [])
    function add(r) {
        if (user_name.length == 0) {
            alert('Vebirite clienta !')
        } else {
            let temp = []
            for (let i = 0; i < r; i++) {
                temp.push(i)
            }
            setList(temp)
        }
    }
    function price(final_price) {
        let t = tp
        t += parseFloat(final_price)
        setTP(t)
    }
    function get_client_name(event) {
        let temp = event.target.value
        setUser_name(temp)
    } function getBarcode(event) {
        let bar = event.target.value
        setBarcode(bar)
    }function searched(event){
        let bar = event.target.value
        if (bar.length == 0){
            bar = '0'
        }
        fetch(`${props.IP_ADRESS}inventory/all?barcode=${bar}`)
        .then(response => response.json())
        .then(data => {
            setDana(data)
        })
    }
    return (
        <div>
            <div className="header flex justify-between">
                <p> Oбщая сумма : {tp}</p>
                {/* <div className="form-outline">
                    <input id="search-focus" type="search" itemID="form1" className="form-control" placeholder="QR CODE" onChange={getBarcode} value={barcode} />
                </div> */}
                <div className='button_add_product fixed'>
                    <br />
                    {/* <button className='btn btn-success flex justify-start' onClick={() => { add(list.length + 1) }}>Добавит +</button> */}
                </div>
                <div className="form-outline">
                <input id="search-focus" type="search" itemID="form1" className="form-control fixed poisk shadow-md shadow-lime-300 hover:shadow-lime-200" placeholder="QR CODE" onChange={searched} /><br /><br /><br />
                <button className='btn btn-success flex justify-start fixed poisk shadow-md shadow-lime-300' onClick={() => { add(list.length + 1) }}>Добавит +</button>
                </div>
            </div>
            <div className="user_audentificate">
                <select name="" id="" className='form form-control' onChange={get_client_name}>
                    <option value="">Выберите Клиента</option>
                    {dana.map((val, i) => {
                        return (<option value={val.id}>{val.client}</option>)
                    })}
                </select>
            </div>
            <div>
                {list.map((i) => {
                    return (<Sell_For_Client IP_ADRESS={props.IP_ADRESS} data={dana} final_price={price} search={barcode} key={i} client={user_name} />)
                })}
                {/* <div className='button_add_product'>
                    <br />
                    <button className='btn btn-success ' onClick={() => { add(list.length + 1) }}>Добавит <i className='fa fa-calendar-plus-o'></i></button>
                </div> */}
            </div>
        </div>
    );
}

export default For_Client;