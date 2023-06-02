import React, { useState, useEffect } from 'react';
import "./product.css";




function Store_Product(props) {
    const [product_name, setProduct_name] = useState('')
    const [del_quantity, setDel_quantity] = useState(0)
    const [del_price, setDel_price] = useState("")
    const [del_currency, setDel_currency] = useState("")
    const [remained, setRemained] = useState(0)
    const [percent, setPercent] = useState("")
    const [cost, setCost] = useState(0)
    const [costpro, setCostpro] = useState(0)

    useEffect(() => {
        let data = props.data
        // console.log(data)
        setProduct_name(data.product_name)
        setDel_quantity(data.del_quantity)
        setDel_price(data.del_price)
        setDel_currency(data.del_currency)
        setRemained(data.remained)
        setPercent(data.percent)

        math()
    },[])
    function math() {
        let money = parseFloat(del_price);
        let pros = parseFloat(percent);
        let result = money / 100 * pros;
        setCostpro((result + money))
        setCost(((result + money) * remained).toFixed(2))

    }

    return (
        <div className='card ml-5 mt-3.5'>
            <div>
                <div className="row">
                    <div className="col">
                        <p className="text-primary-p tovar"> Название : {product_name}</p>
                    </div>
                    <div className="col">
                        <p className="text-primary-p"> Кол-ва (шт) : {del_quantity}</p>
                    </div>
                    <div className="col">
                        <p className="text-primary-p"> цена (продажа) : {costpro}</p>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="text-primary-p"> валюта : {del_currency}</p>
                    </div>
                    <div className="col">

                    </div>
                    <div className="col">
                        
                    </div>
                </div>

            </div>
            <p>Общая сумма товара : {cost} {del_currency}</p>

        </div>
    );
}

export default Store_Product;