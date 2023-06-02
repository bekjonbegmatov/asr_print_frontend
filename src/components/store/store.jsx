import React, { useState, useEffect } from 'react';
import Store_Product from './store_products/store_products';
import Addproduct from '../inventory/product/form_add_product/add_product';
import './store.css'

function Store() {
    const [list_data, setList_data] = useState([])
    const [action , setAction] = useState('http://127.0.0.1:8000store/create') 
    useEffect(() => {
        let url = 'http://127.0.0.1:8000store/all'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setList_data(data)
            })

    }, [])
    return (
        <div className='inven'>
            <div>
                {list_data.map((val, i) => {
                    return (
                        <Store_Product index={i} data={val} key={i} />
                    )
                })}
            </div>
            <div className='form_add_product'>
                <Addproduct action={action} store={true}/>
            </div>
        </div>
    );
}

export default Store;
