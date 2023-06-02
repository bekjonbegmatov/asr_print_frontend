import React, { useState, useEffect } from 'react';
import List_user_item from './list_use_item/list_user_item';
import './list_user.css'

function List_user(props) {
    const [dana, setDana] = useState([])
    const [fnal_quantity, setFinal_quantity] = useState(0)
    const [fnal_price, setFinal_price] = useState(0)
    const [fnal_paid, setFinal_paid] = useState(0)
    const [phone_number, setPhone_number] = useState([])
    const [flag, setFlag] = useState(false)
    const [pay_mone, setPay_mone] = useState(0)

    const [is_more_info, setIs_more_info] = useState(false)
    const [is_pay, setIs_pay] = useState(false)

    useEffect(() => {
        let user = props.name
        let data = props.data
        let new_filtred_arr = []
        more_info_about_user()
        data.forEach(element => {
            if (element.client == user) {
                new_filtred_arr.push(element)
            }
        });
    }, [])
    function more_info_about_user(params) {
        fetch(`${props.IP_ADRESS}kredit/all?user=${props.name}`)
            .then(response => response.json())
            .then(data => {
                math(data)
                setDana(data)
            })
    } function math(data) {
        let dat = data
        let temp_quantity = 0
        let temp_final_price = 0
        let temp_paid = 0
        let temp_phone_numbers = []

        dat.forEach(element => {
            temp_quantity += element.quantity
            temp_final_price += parseFloat(element.final_price)
            temp_paid += parseFloat(element.paid)
            temp_phone_numbers.push(element.phone_number)
        });
        let filtred_numbers = [...new Set(temp_phone_numbers)];
        let phone_number = ''

        filtred_numbers.forEach(element => {
            phone_number += element + ' '
        })
        setPhone_number(phone_number)
        setFinal_quantity(temp_quantity)
        setFinal_price(temp_final_price)
        setFinal_paid(temp_paid)
    } function open_or_close() {
        let fla = flag
        if (fla == false) {
            fla = true
        } else if (fla == true) {
            fla = false
        }
        setFlag(fla)
    } function pay(event) {
        let temp = event.target.value
        setPay_mone(temp)
    } function del(){
        const ok = window.confirm("Вы действительно хотите удалить ?")
        if (ok){
            dana.forEach(element=>{
                let id = element.id
                fetch(`${props.IP_ADRESS}kredit/${id}` , {
                    method : 'DELETE'
                })
                    .catch(err => console.log(err))
            })
            window.location.reload()
        }
    }
    return (
        <div className='border pl-3'>
            <div className="display flex justify-between p-1 ">
                <b className='text-2xl mr-2 '>{(props.id)+1} |</b>
                <b onClick={() => { open_or_close() }} className='text-2xl button_hower'>{props.name}</b>
                <p className='text-xl ml-2'>{(fnal_price - fnal_paid) > 0 && <i className='text-red-600'>Не оплачено</i>} {(fnal_price - fnal_paid) == 0 && <i className='text-green-500'>Оплачено</i>}</p>
                {flag &&
                    <div>
                        <button className='btn btn-danger' onClick={del} >удалить</button>
                    </div>
                }
            </div>

            <div>
                {flag &&
                    <div>
                        <table className='mt-2'>
                            <thead>
                                <th className='border'>Название</th>
                                <th className='border'>Создано</th>
                                <th className='border'>Qr-code</th>
                                <th className='border'>Оплачено</th>
                                <th className='border'>Осталось</th>
                                <th className='border'>Единица</th>
                                <th className='border'>Количество</th>
                                <th className='border'>Цена продаж</th>
                                <th className='border'>Oбщее сумма</th>
                                <th className='border'></th>
                                <th className='border'></th>
                            </thead>
                            <tbody>
                                {dana.map((val, i) => {
                                    return <List_user_item IP_ADRESS={props.IP_ADRESS} data={val} key={i} />
                                })}
                            </tbody>
                        </table>
                        <br />
                        <div>
                            <p>имя клиента : {props.name}</p>
                            <p>номер телефона : {phone_number}</p>
                            <p>оплачено : {fnal_paid}</p>
                            <p>статус : {(fnal_price - fnal_paid) > 0 && <i className='text-red-600'>Не оплачено</i>} {(fnal_price - fnal_paid) <= 0 && <i className='text-green-500'>Оплачено</i>}</p>
                        </div>
                        <div className='flex border'>
                            <p>Oбщее количество : {fnal_quantity} </p>
                            <p className='ml-2'>Oбщее сумма: {fnal_price} </p>
                            <p className='ml-2'>На долге : <i className='text-red-500'> {fnal_price - fnal_paid}</i> </p>
                        </div>
                    </div>

                }

            </div>

        </div>
    );
}

export default List_user;