import { Alert } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import './add_form.css'

function Addproduct(props) {
    const [btnclick, setBtnclick] = useState(true)
    const [product_name, setProduct_name] = useState('')
    const [del_quantity, setDel_quantity] = useState(0)
    const [del_price, setDel_price] = useState("")
    const [del_currency, setDel_currency] = useState("TJS")
    const [remained, setRemained] = useState(0)
    const [percent, setPercent] = useState(0)
    const [body_price, setBody_price] = useState(0)
    const [barcoe, setBarcodee] = useState(0)
    const [selling_price, setSelling_price] = useState(0)
    const [err, setErr] = useState('')

    const [birlik_one, setBirlik_one] = useState('')
    const [birlik, setBirlik] = useState('')

    const [arr_brlik, setArr_brlik] = useState([])
    useEffect(() => {
        fetch(`${props.IP_ADRESS}brlik/all`)
            .then(response => response.json())
            .then(data => {
                setArr_brlik(data)
            })
    }, [])
    function add_product() {
        setBtnclick(false)
    }
    function exit() {
        setBtnclick(true)
    }
    function submit() {
        let url = `${props.IP_ADRESS}inventory/create`
        if (check()) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    barcode: barcoe,
                    product_name: product_name,
                    quantity: del_quantity,
                    remained: remained,
                    sales: 0,
                    del_price: del_price,
                    selling_price: selling_price,
                    body_price: 0 , //percent,
                    birlik: birlik_one,
                    empty: "empty",
                    empty_number: 0,
                }),
            })
            window.location.reload()
        }

    }
    function math() {
        let sarf = parseFloat(percent)
        let price = parseFloat(del_price)
        let quantity = parseFloat(del_quantity)

        let asl_narh = parseFloat((sarf + (price * quantity)) / quantity).toFixed(2)

        setBody_price(asl_narh)
        setPercent(asl_narh)

        console.log(asl_narh)

        return true
    } function check() {
        if (toString(product_name).length == 0) {
            alert('Vedite nazvanie producta !')
            return false
        } else if (del_price.length == 0) {
            alert('Vadite Senu !')
            return false
        } else if (birlik_one.length == 0) {
            alert('Vibirite Izmirenie !')
            return false
        } else if (toString(barcoe).length == 0) {
            alert('Vedite Qr Qode !')
            return false
        } else if (toString(del_quantity).length == 0){
            alert('Vedite Kolochestvo !')
            return false
        } else if (toString(remained).length == 0) {
            alert('Vedite ostatok !')
            return false
        } else if (toString(percent).length == 0) {
            alert('Vedite rshod !')
            return false
        }
        return true
    } function getName(event) {
        let name = event.target.value
        setProduct_name(name)
    } function get_quantity(event) {
        let del_quantity = event.target.value
        setDel_quantity(del_quantity)
    } function get_remained(event) {
        let remained = event.target.value
        setRemained(remained)
    } function get_price(event) {
        let del_price = event.target.value
        setDel_price(del_price)
    } function get_currency(event) {
        let get_currency = event.target.value
        setDel_currency(get_currency)
    } function get_birlik_one(event) {
        let temp = event.target.value
        setBirlik_one(temp)
    }
    function get_percent(event) {
        let sarf = parseInt(event.target.value)

        let price = parseFloat(del_price)
        let quantity = parseFloat(del_quantity)

        let asl_narh = parseFloat((sarf + (price * quantity)) / quantity).toFixed(2)

        setPercent(asl_narh)
    }
    function getBarcode(event) {
        let store = event.target.value
        setBarcodee(store)
    }
    function get_selling_price(event) {
        let store = event.target.value
        setSelling_price(store)
    }

    function add_birlik() {
        let url = `${props.IP_ADRESS}brlik/create`
        if (birlik.length != 0) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: birlik
                }),
            })
            window.location.reload()
        } else {
            console.log("ERRRRROOOOOOORRRRR!!!!!!")
            alert('Пожалуйста заполните поле !')
        }
    } function get_birlik(event) {
        let bir = event.target.value
        setBirlik(bir)
    }

    return (

        <div className='top-50 start-50'>
            <div>
                <form id='form'>
                    <h1 className='text-xl font-bold'>Добавить товар</h1>
                    {err}
                    <input type="text" className='form form-control' placeholder='Название товара' onChange={getName} />
                    <input type="number" className='form form-control' placeholder='Qr code' onChange={getBarcode} />
                    <input type="number" className='form form-control' placeholder='Количество' onChange={get_quantity} />
                    <input type="number" className='form form-control' placeholder='Осталось' onChange={get_remained} />
                    <select class="form form-control vibor " aria-label="Default select example" onChange={get_birlik_one}>
                        <option value="none" selected>Измирение</option>
                        {arr_brlik.map((val, i) => {
                            return (<option value={val.name}>{val.name}</option>)
                        })}
                    </select>
                    <input type="number" className='form form-control' placeholder='Цена' onChange={get_price} />
                    <input type="number" className='form form-control' placeholder='Цена (продажа)' onChange={get_selling_price} />
                    <br />
                    <button type="button" onClick={submit} className='btn btn-warning'>Добавить</button>
                </form>
            </div>
            <br />
            <div id='form'>
                <h1 className='text-xl font-bold'>Добавить Единицу</h1>
                <input type="text" onChange={get_birlik} placeholder='Единица' className='form form-control' />
                <br />
                <button className='btn btn-warning' onClick={add_birlik}>
                    Добавить
                </button>
            </div>
        </div>
    );
}


export default Addproduct;
