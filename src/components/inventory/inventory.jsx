import React, { useState, useEffect } from 'react';
import Product from './product/product';
import "./inventory.css"


function Inventory(props) {
    const [dana, setDana] = useState([])
    const [t_remained , setT_remained] = useState(0)
    const [t_price , setT_price] = useState(0)

    useEffect(() => {

        let url = `${props.IP_ADRESS}inventory/all`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dataa(data)
                math(data)
            })

    }, [])
    function dataa(data) {
        setDana(data)
    } function math(data){
        let d = data
        let temp_remained = 0
        let temp_price = 0
        d.forEach(element => {
            temp_remained += parseFloat(parseFloat(element.del_price) * parseFloat(element.remained))

            temp_price += parseFloat((element.selling_price) * element.remained)
        });
        setT_remained(temp_remained)
        setT_price(temp_price)
    }
    return (
// shadow-md
        <div className='inven'>
            <div className='flex justify-between shadow-xl'>
                <p className='text-bold border p-3 btn btn-success shadow-md'>Общая сумма приход товаров : {t_remained.toFixed(2)}</p> 
                <p className='text-bold border p-3 btn btn-success shadow-md'>Общая цена товаров : {(t_price).toFixed(2)} </p>      
            </div>
            <table className='m-2'>
                <thead className='tabTitle'>
                    <th className='border'>Название</th>
                    <th className='border'>Кол-ва (шт)</th>
                    <th className='border'>Oстаток товара</th>
                    <th className='border'>продано</th>
                    <th className='border'>Измирение</th>
                    <th className='border'>Цена (приход)</th>
                    <th className='border'>Цена (продажа)</th>
                    {/* <th className='border'>цена (тела)</th> */}
                    <th className='border'>Cозданo</th>
                    <th className='border'>Штрих код</th>
                    <th className='border'>Общая сумма товара</th>
                    <th className='border'></th>
                </thead>
                <tbody>
                    {dana.map((val, i) => {
                        if (val.product_name.toLowerCase().includes(props.sendSearch.toLowerCase())) {
                            return (
                                <Product IP_ADRESS={props.IP_ADRESS} index={i} data={val} key={i} />
                            )
                        }
                        else if (val.barcode.toString().toLowerCase().includes(props.sendSearch.toLowerCase())) {
                            return (
                                <Product IP_ADRESS={props.IP_ADRESS} index={i} data={val} key={i} />
                            )
                        }

                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Inventory;