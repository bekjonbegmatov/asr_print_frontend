import React, { useState, useEffect } from 'react';
import './ended_products.css'
import Ended_item from './ended_item/ended_item';

function Ended_products(props) {
    const [dana, setDana] = useState([])

    useEffect(() => {
        fetch(`${props.IP_ADRESS}inventory/all`)
            .then(response => response.json())
            .then(data => {
                // setDana(data)
                filterrr(data)
            })

    }, [])
    function filterrr(data) {
        let dat = data
        let fil = []
        for (let n = 0; n < 4; n++) {
            for (let i = 0; i < dat.length; i++) {
                if (dat[i].remained == n){
                    fil.push(dat[i])
                }
            }
        }
        setDana(fil)

    }
    return (
        <div>
            <table className='mt-2 ml-10'>
                <thead>
                    <th className='border'>№</th>
                    <th className='border'>Название</th>
                    <th className='border'>Кол-ва</th>
                    <th className='border'>Oстаток товара</th>
                </thead>
                <tbody>

                    {dana.map((val, i) => {
                        if (val.product_name.toLowerCase().includes(props.sendSearch.toLowerCase()) && val.remained <= 3) {
                            return (
                                <Ended_item IP_ADRESS={props.IP_ADRESS} id={i} data={val} key={i} />
                            )
                        }
                        else if (val.barcode.toString().toLowerCase().includes(props.sendSearch.toLowerCase()) && val.remained <= 3) {
                            return (
                                <Ended_item IP_ADRESS={props.IP_ADRESS} data={val} id={i} key={i} />
                            )
                        }

                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Ended_products;