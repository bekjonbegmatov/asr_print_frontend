import React, { useState, useEffect } from 'react';
import Result_report from './result report/result_report';
function Report(props) {
    const [datel, setDate] = useState('')
    const [isReport, setReport] = useState("false")
    const [reports, setReports] = useState([])
    const [totalprice, setTotalprice] = useState(0)
    const [datatime1, setDatatime1] = useState("")
    const [datatime2, setDatatime2] = useState("")
    const [to_dete, setTodate] = useState("")

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
        localStorage.setItem("date", dat)
        setDate(dat)
    }
    function report() {
        let output
        let from_date = datel
        setReport("true")
        localStorage.setItem("isReport", "true")
        if (to_dete == "") {
            let date = new Date();
            output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
        } else {
            output = to_dete
        }
        let rout = "http://127.0.0.1:8000inventory/all?from_date=" + from_date + "&to_date=" + output;
        setDatatime1(from_date)
        setDatatime2(output)
        find(rout)
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
        localStorage.setItem("date", dat)
        setTodate(dat)
    }
    function find(rout) {
        fetch(rout)
            .then(response => response.json())
            .then(data => {
                setReports(data)
                console.log(reports);
            })
        reports.forEach(element => {
            let one = parseFloat(element.del_price)
            setTotalprice(totalprice + one)
        });
    }
    function quit() {
        setReport("false")
        localStorage.setItem("isReport", "false")
    }
    return (
        <div className="content">

            {isReport == "false" &&
                <div>
                    <div className="control mx-5 p-2 border-">
                        <h1 className='text-5xl text-bold'>Выберите дату :</h1>
                        <h1 className='ml-2 text-2xl text-bold'>С :</h1>
                        <input type="date" className='form form-control w-2/3' onChange={get_date} />
                        <h1 className='ml-2 text-2xl'>До :</h1>
                        <input type="date" className='form form-control w-2/3' onChange={to_dat} />
                        <button className='btn btn-warning mt-3 hover:bg-yellow-500  bg-white' onClick={report}>Отчет</button>
                    </div>
                </div>
            }
            {isReport == "true" &&
                <div className='m-3 text-center'>
                    <button className='btn btn-warning' onClick={quit}>Назад</button>
                    <h1 className='text-5xl text-bold pt-3 pb-2'>Результаты</h1>
                    <hr />
                    <span>{datatime1} - {datatime2}</span>
                    <hr />
                    <thead className='tabTitle mt-2'>
                        <th>Склад</th>
                        <th>Название</th>
                        <th>Oстаток товара</th>
                        <th>Кол-ва (шт)</th>
                        <th>Цена (приход)</th>
                        {/* <th>Цена (продажа)</th> */}
                        <th>Валюта</th>
                        <th>Cозданo</th>
                        <th>Oбновленo</th>
                        <th>Место</th>
                        <th>Штрих код</th>
                        <th>Общая сумма товара</th>
                    </thead>
                    <tbody>
                        {reports.map((val, i) => {
                            if (val.product_name.toLowerCase().includes(props.sendSearch.toLowerCase())) {
                                return <Result_report data={val} key={i} />
                            }
                            else if (val.barcode.toString().toLowerCase().includes(props.sendSearch.toLowerCase())) {
                                return <Result_report data={val} key={i} />
                            }
                        })}
                    </tbody>
                </div>
            }
        </div >
    );
}

export default Report;