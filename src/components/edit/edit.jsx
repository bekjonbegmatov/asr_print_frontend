import React, { useState, useEffect } from 'react';


function Edit(props) {
    const [product_name, setProduct_name] = useState('')
    const [del_quantity, setDel_quantity] = useState(0)
    const [del_price, setDel_price] = useState(0)
    const [body_price, setBody_price] = useState(0)
    const [remained, setRemained] = useState(0)
    const [sales, setSales] = useState(0)
    const [barcode, setBarcode] = useState(0)
    const [selling_price, setSelling_price] = useState(0)
    
    const [arr_brlik , setArr_brlik] = useState([])
    const [birlik_one, setBirlik_one] = useState('')

    useEffect(() => {
        fetch(`${props.IP_ADRESS}brlik/all`)
        .then(response => response.json())
        .then(data =>{
            setArr_brlik(data)
        })
    }, [])
    useEffect(() => {
        setBirlik_one(props.name)
        let data = props.data
        setProduct_name(data.product_name)
        setDel_quantity(data.quantity)
        setDel_price(parseFloat(data.del_price))
        setBody_price(data.body_price)
        setRemained(data.remained)
        setBarcode(data.barcode)
        setSales(data.sales)
        setSelling_price(data.selling_price)
    }, [])
    function submit() {
        let id = props.data.id
        let chec = check()
            if (chec) {
                fetch(`${props.IP_ADRESS}inventory/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        barcode: parseInt(barcode),
                        product_name: product_name,
                        quantity: parseFloat(del_quantity),
                        remained: parseFloat(remained),
                        sales: parseFloat(sales),
                        del_price: parseFloat(del_price),
                        selling_price: parseFloat(selling_price),
                        body_price: parseInt(body_price),
                        birlik : birlik_one,
                        empty: "empty",
                        empty_number: 0,
                    }),
                })
                window.location.reload()
            }
    }
    function check() {
        let correct = true
        if (remained < 0) {
            alert('Видите положительные числа !')
            correct = false
        }
        return correct
    }
    function getName(event) {
        const str = event.target.value;
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        setProduct_name(str2)
    }
    function get_quantity(event) {
        let del_quantity = event.target.value
        setDel_quantity(del_quantity)
    }
    function get_remained(event) {
        let remained = event.target.value
        setRemained(remained)
    }
    function get_barcode(event) {
        let code = event.target.value
        setBarcode(code)
    }
    function get_sales(event) {
        let sales = event.target.value
        setSales(sales)
    }
    function get_selling_price(event) {
        let selling_price = event.target.value
        setSelling_price(selling_price)
    }
    function get_del_price(event) {
        let del_price = event.target.value
        setDel_price(del_price)
    }
    function get_body_price(event) {
        let body_price = event.target.value
        setBody_price(body_price)
    }function get_birlik_one(event) {
        let temp = event.target.value
        setBirlik_one(temp)
    }
    return (
        <div className='top-50 start-50'>
            <div>
                <form action={props.action} id='form'>
                    <h1 className='text-3xl font-bold'>Редактировать</h1>
                    <label htmlFor="produkt_name" className='mt-2 text-green-600'>Название товара</label>
                    <input type="text" id='produkt_name' className='form form-control' placeholder='Название товара' onChange={getName} value={product_name} />
                    <label className='mt-2  text-green-600' htmlFor="produktdel_quantity">Количество</label>
                    <input type="number" className='form form-control' id='del_quantity' placeholder='Количество' onChange={get_quantity} value={del_quantity} />
                    <label className='mt-2  text-green-600' htmlFor="produktdel_quantity">Осталось</label>
                    <input type="number" className='form form-control' placeholder='Осталось' onChange={get_remained} value={remained} />
                    <label className='mt-2  text-green-600' htmlFor="produktdel_quantity">Продано</label>
                    <input type="number" className='form form-control' placeholder='Осталось' onChange={get_sales} value={sales} />

                    <select class="form form-control vibor " aria-label="Default select example" onChange={get_birlik_one}>
                        {arr_brlik.map((val, i) => {
                            if (val.name == props.name) {

                                return(<option value={val.name} selected>{val.name}</option>)
                            }else{
                                return(<option value={val.name}>{val.name}</option>)
                            }
                        })}
                    </select>

                    <label className='mt-2 text-green-600' htmlFor="produktdel_quantity">Цена(продажа)</label>
                    <input type="text" className='form form-control' placeholder='Цена' onChange={get_selling_price} value={selling_price} />
                    <label className='mt-2 text-green-600' htmlFor="produktdel_quantity">Цена(приход)</label>
                    <input type="text" className='form form-control' placeholder='Цена' onChange={get_del_price} value={del_price} />
                    <label className='mt-2 text-green-600' htmlFor="produktdel_quantity">Цена(тело)</label>
                    <input type="text" className='form form-control' placeholder='Цена' onChange={get_body_price} value={body_price} />
                    <label className='mt-2 text-green-600' htmlFor="produktdel_quantity">Штрих код</label>
                    <input type="number" className='form form-control' placeholder='Qr Код' onChange={get_barcode} value={barcode} />
                    <br />
                    <button type="button" onClick={submit} className='btn btn-warning'>Сохранить</button>
                    <button type='button' className='btn btn-danger' onClick={() => props.onEdit(false)}>Назад</button>
                </form>
            </div>
        </div>
    );
}


export default Edit;