import React, { useState, useEffect } from 'react';
import './report.css'
import Result_report from './result_report/result_report';
import Actionitem from '../action/action item/actionitem';

function Report(props) {
    const [isReport, setReport] = useState(false)
    const [result_report, setResult_Report] = useState([])
    const [result_report_action_client, setResult_Report_Acction_client] = useState([])
    const [result_report_kredit, setResult_Report_kredit] = useState([])
    const [result_finish_report, setResult_Finish_Report] = useState([])


    const [month, setMonth] = useState('')       
    const [to_date, setTodate] = useState('')
    const [datel, setDate] = useState('')
    const [y, setY] = useState('')
    // Action   http://127.0.0.1:8000/report/export/excel?from_date=01-06-2023&to_date=30-06-2023

    const [total_quantity, setTotal_quantity] = useState(0)                           //  Общее количество
    const [total_price, setTotal_price] = useState(0)                                 //  Общая цена
    const [total_selling_price, setTotal_selling_price] = useState(0)                 //  Общая цена Продаж 
    const [total_paid, setTotal_paid] = useState(0)                                   //  Общая оплачено

    // Kredit 

    const [total_kredit_quantity, setTotal_kredit_quantity] = useState(0)             //  Общее количество Долгa
    const [total_kredit_price, setTotal_kredit_price] = useState(0)                   //  Общая цена Долгa
    const [total_kredit_selling_price, setTotal_kredit_selling_price] = useState(0)   //  Общая цена Продаж Долгa
    const [total_kredit_paid, setTotal_kredit_paid] = useState(0)                     //  Общая оплачено Долгa
    const [remained_pay , setRemained_pay] = useState(0)                              //  obshi narh - tulangan narh = qolgan narh // shunaqa shkilig da

    // Client actions

    const [total_client_quantity, setTotal_client_quantity] = useState(0)             //  Общее количество client
    const [total_client_price, setTotal_client_price] = useState(0)                   //  Общая цена client
    const [total_client_selling_price, setTotal_client_selling_price] = useState(0)   //  Общая цена Продаж client
    const [total_client_paid, setTotal_client_paid] = useState(0)                     //  Общая оплачено client

    // ------------------------ //
    const [pribl, setPribl] = useState(0)                               
    const [spend, setSpend] = useState(0)                               

    const [fb , setFB ] = useState(0)
    const [tb , setTB ] = useState(0)

    function get_date(event) {
        let date = event.target.value
        let dat
        let year, month, day
        for (let i = 0; i < date.length; i++) {
            if (i == 8 || i == 9) {
                day += date[i]
            } else if (i == 5 || i == 6) {
                month += date[i]
            } else if (i == 0 || i == 1 || i == 2 || i == 3) {
                year += date[i]
            }
        }
        dat = day.slice(9, 11) + "-" + month.slice(9, 11) + "-" + year.slice(9, 14);
        setDate(dat)
    }
    function to_dat(event) {
        let date = event.target.value
        let dat
        let year, month, day
        for (let i = 0; i < date.length; i++) {
            if (i == 8 || i == 9) {
                day += date[i]
            } else if (i == 5 || i == 6) {
                month += date[i]
            } else if (i == 0 || i == 1 || i == 2 || i == 3) {
                year += date[i]
            }
        }
        dat = day.slice(9, 11) + "-" + month.slice(9, 11) + "-" + year.slice(9, 14);
        setTodate(dat)
    } function get_fb(event){
        let temp = event.target.value
        setFB(temp)
    } function get_tb(event){
        let temp = event.target.value
        setTB(temp)
    }
    function quit() {
        setReport(false)
    } function report() {
        fetch(`${props.IP_ADRESS}actions/all?from_date=${datel}&to_date=${to_date}&from_barcode=${fb}&to_barcode=${tb}`)
            .then(response => response.json())
            .then(data => {
                setResult_Report(data)
                getAll(data)
            })
        fetch(`${props.IP_ADRESS}kredit/all?from_date=${datel}&to_date=${to_date}&from_barcode=${fb}&to_barcode=${tb}`)
            .then(response => response.json())
            .then(data => {
                setResult_Report_kredit(data)
                getKredits(data)
            })
        fetch(`${props.IP_ADRESS}client/action/all?from_date=${datel}&to_date=${to_date}&from_barcode=${fb}&to_barcode=${tb}`)
            .then(response => response.json())
            .then(data => {
                setResult_Report_Acction_client(data)
                getClients(data)
            })
        setReport(true)

    } function get_montch(event) {
        let time = event.target.value
        // 2022-01
        setY((time).slice(0, 4))
        setMonth((time).slice(5, 7))

    } function report_month() {
        fetch(`${props.IP_ADRESS}actions/all?months=${month}&year=${y}&from_barcode=${fb}&to_barcode=${tb}`)
            .then(response => response.json())
            .then(data => {
                setResult_Report(data)
                getAll(data)
            })
        fetch(`${props.IP_ADRESS}kredit/all?months=${month}&year=${y}&from_barcode=${fb}&to_barcode=${tb}`)
            .then(response => response.json())
            .then(data => {
                setResult_Report_kredit(data)
                getKredits(data)
            })
        fetch(`${props.IP_ADRESS}client/action/all?months=${month}&year=${y}&from_barcode=${fb}&to_barcode=${tb}`)
            .then(response => response.json())
            .then(data => {
                setResult_Report_Acction_client(data)
                getClients(data)
            })
        setReport(true)
    } function getAll(data) {
        let temp_quantity = 0
        let temp_price = 0
        let temp_selling_price = 0
        let temp_paid = 0
        let pribl = 0
        let temp_spend = 0
        data.forEach(element => {
            temp_quantity += element.quantity
            temp_price +=  parseFloat(parseFloat(element.del_price) * parseFloat(element.quantity))
            temp_selling_price +=  parseFloat(parseFloat(element.selling_price) * parseFloat(element.quantity))
            temp_paid += parseFloat(element.paid)
            temp_spend += parseFloat(element.body_price)

            pribl += parseFloat((element.selling_price - element.del_price) * element.quantity)
        });
        // alert(temp_quantity)
        setTotal_quantity(temp_quantity)
        setTotal_price(temp_price)//
        setTotal_selling_price(temp_selling_price)
        setTotal_paid(temp_paid)
        setPribl(pribl)
        setSpend(temp_spend)
    } function getKredits(data) {
        let temp_quantity = 0
        let temp_price = 0
        let temp_selling_price = 0
        let temp_paid = 0
        let temp_remained_pay = 0
        let pribl = 0
        let temp_spend = 0
        data.forEach(element => {
            temp_quantity += element.quantity
            temp_price +=  parseFloat(parseFloat(element.del_price) * parseFloat(element.quantity))
            temp_selling_price +=  parseFloat(parseFloat(element.selling_price) * parseFloat(element.quantity))
            temp_paid += parseFloat(element.paid)
            temp_spend += parseFloat(element.body_price)
            temp_remained_pay += parseFloat((parseFloat(element.selling_price) * parseFloat(element.quantity)) - parseFloat(element.paid))
            pribl += parseFloat((element.selling_price - element.del_price) * element.quantity)
        });
        setTotal_kredit_quantity(temp_quantity)
        setTotal_kredit_paid(temp_paid)
        setTotal_kredit_price(temp_price)
        setTotal_kredit_selling_price(temp_selling_price)
        setRemained_pay(temp_remained_pay.toFixed(2))
    
    } function getClients(data) {
        let temp_quantity = 0
        let temp_price = 0
        let temp_selling_price = 0
        let temp_paid = 0
        let pribl = 0
        let temp_spend = 0
        data.forEach(element => {
            temp_quantity += element.quantity
            temp_price +=  parseFloat(parseFloat(element.del_price) * parseFloat(element.quantity))
            temp_selling_price +=  parseFloat(parseFloat(element.selling_price) * parseFloat(element.quantity))
            temp_paid += parseFloat(element.paid)
            temp_spend += parseFloat(element.body_price)

            pribl += parseFloat((element.selling_price - element.del_price) * element.quantity)
        });
        setTotal_client_quantity(temp_quantity)
        setTotal_client_paid(temp_paid)
        setTotal_client_price(temp_price)
        setTotal_client_selling_price(temp_selling_price)
    }
    return (
        <div>
            {isReport == false &&
                <div className='row'>
                    <div className="control mx-5 p-2 col ">
                        <h1 className='text-5xl text-bold'>Выберите дату :</h1>
                        <h1 className='ml-2 text-2xl text-bold'>С :</h1>
                        <input type="date" className='form form-control w-2/3' onChange={get_date} />
                        <h1 className='ml-2 text-2xl'>До :</h1>
                        <input type="date" className='form form-control w-2/3' onChange={to_dat} />
                        <input type="numser" placeholder='qr code' onChange={get_fb} className='form form-control'/>
                        <input type="numser" placeholder='qr code' onChange={get_tb} className='form form-control'/>
                        <button className='btn btn-warning mt-3 hover:bg-yellow-500  bg-white' onClick={report}>Отчет</button>
                    </div>
                    <div className='col'>

                    </div>
                </div>
            }{isReport == true &&
                <div>
                    <div className='m-3 text-center'>
                        <button className='btn btn-warning' onClick={quit}>Назад</button>
                        <a href={`${props.IP_ADRESS}report/export/excel?from_date=${datel}&to_date=${to_date}`} className='btn btn-warning' download>download exsel</a>
                        <h1 className='text-5xl text-bold pt-3 pb-2'>Результаты</h1>
                        <hr />
                        <span>{datel} - {to_date}</span>
                        <hr />
                        <br />
                        <table className='ml-10'>
                            <thead className='tabTitle mt-2 border'>
                                <th>№</th>
                                <th>Qr code</th>
                                <th>Название</th>
                                <th>Кол-ва</th>
                                <th>Eдиница</th>
                                <th>Цена</th>
                                <th>Цена(продажа)</th>
                                <th>Оплачено</th>
                                <th>Cозданo</th>
                                <th>Общая сумма</th>
                            </thead>
                            <tbody>
                                {result_report.map((val, i) => {
                                    if (val.product_name.toLowerCase().includes(props.sendSearch.toLowerCase())) {
                                        return <Actionitem IP_ADRESS={props.IP_ADRESS} data={val} id={i + 1} key={i} />
                                    }
                                    else if (val.barcode.toString().toLowerCase().includes(props.sendSearch.toLowerCase())) {
                                        return <Actionitem IP_ADRESS={props.IP_ADRESS} data={val} id={i + 1} key={i} />
                                    }
                                })}
                            </tbody>
                        </table>
                        <div className='ml-7'>
                            <td> общее количество : {(total_quantity + total_client_quantity + total_kredit_quantity ).toFixed(2)}</td>
                            <td> общее Цена : {(total_price + total_client_price + total_kredit_price ).toFixed(2)}</td>
                            <td> общее Цена продажи : {(total_selling_price + total_client_selling_price + total_kredit_selling_price ).toFixed(2)}</td>
                            <td> общее Оплачено : {(total_paid + total_client_paid + total_kredit_paid).toFixed(2)}</td>
                            <td> прибыл : {((total_paid - total_price) + (total_client_paid - total_client_price) + ((total_kredit_paid - total_kredit_price) - remained_pay) ).toFixed(2)}</td>
                            <td> на долге : {remained_pay}</td>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}

export default Report;