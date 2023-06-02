import React, { useState, useEffect } from 'react';
import Sel_for_duty_item from './sel_for_duty_item/sel_for_duty_item';
import './sel_for_duty_item.css'
import { FaShoppingCart } from "react-icons/fa";


import { FaTools } from "react-icons/fa";

function Sell_for_duty(props) {
    const [dana, setDana] = useState([])
    const [list, setList] = useState([])
    const [tp, setTP] = useState(0)
    const [isDuty, setIsDuty] = useState(true)

    const [user_name, setUser_name] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [paid, setPaid] = useState(0)
    const [barcode, setBarcode] = useState('')


    function add(r) {
        if (user_name.length == 0) {
            alert('Vedite imya clienta !')
        } else if (phone_number.length == 0 || phone_number <= 7) {
            alert('Vedite nomer +992 XX XXX XX XX !')
        } else {
            let temp = []
            for (let i = 0; i < r; i++) {
                temp.push(i)
            }
            setList(temp)
        }
    }
    useEffect(() => {
        fetch()
            .then(response => response.json())
            .then(data => {
                setDana(data)
            }, [])
    })
    function mat(id, quantity) {

    }
    function for_duty(bol) {
        setIsDuty(bol)
    }
    function get_user_name(event) {
        let user_name = event.target.value
        setUser_name(user_name)
    } function get_phone_number(event) {
        let phone_number = event.target.value
        setPhone_number(phone_number)
    } function get_paid(event) {
        let paid = event.target.value
        setPaid(paid)
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

            <div>
                <div className='header'>
                    <h1 className='trash flex justify-center'>Корзина на долг <FaShoppingCart /></h1>
                    <div className="flex justify-between">
                        <p> Oбщая сумма : {tp} </p>
                        <div className="form-outline">
                            <input id="search-focus" type="search" itemID="form1" className="form-control" placeholder="QR CODE" onChange={getBarcode} value={barcode} />
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='user_audentificate'>
                    {isDuty == true &&
                        <div className='clnt_form'>
                            <input type="text" className='form form-select clint' placeholder='Имя клиента' onChange={get_user_name} />
                            <input type="text" className='form form-select clint' placeholder='Номер телефона' onChange={get_phone_number} />
                        </div>
                    }
                </div>
                <div>
                    {list.map((i) => {
                        return (<Sel_for_duty_item final_price={price} search={barcode} key={i} client={user_name} phone={phone_number} />)
                    })}
                    <div className='button_add_product'>
                        <br />
                        <button className='btn btn-success ' onClick={() => { add(list.length + 1) }}>Добавит <i className='fa fa-calendar-plus-o'></i></button>
                    </div>

                </div>
            </div>
            {false &&
                <div className='flex justify-center '>
                    <div className='text-center'>
                        <FaTools className='text-9xl text-green-600' />
                        <p className='text-4xl'>Это страницa находится в режиме разработки !</p>
                    </div>
                </div>
            }
        </div>
    );
}
export default Sell_for_duty;