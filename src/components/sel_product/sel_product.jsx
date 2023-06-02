import React, { useState , useEffect } from 'react';
import Sel_product_item from './sel_product_item/sel_product_item';
import "./sel_product.css"

function Sel_product(props) {
    const [dana , setDana] = useState([])
    const [trash , setTrash] = useState([])
    const [trash_prod , setTrash_prod] = useState([])
    useEffect(()=>{
        fetch("http://127.0.0.1:8000inventory/all")
        .then(response => response.json())
        .then(data=>{
            // console.log(data)
            setDana(data)
            setTrash_prod(data)
        })
    },[])
    function cliced(id) {
        let temp = trash;
        let check = true;
        for (let i = 0; i < temp.length; i++) {
            if(temp[i] == id){
                alert('Вы уже добавили этот продукт !');
                check = false;
            }
        }
        if(check){
            temp.push(id)
            setTrash(temp)
            // console.log(trash);
            // add(id)
        }
    }
    function add(id){
        let res = trash_prod;
        let temp = []
        dana.forEach(element => {
            if (element.id == id){
                res.push(element)
            }
        });
        // res.push(temp)
        setTrash_prod(res)
        console.log(trash_prod)
    }
    return ( 
        <div className="row">
            <div className='col-4'>
                <table className='product_list_table table'>
                    <thead>
                        <tr id='heade'>
                            <td>Продукты</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {dana.map((val , i)=>{
                            if (val.product_name.toLowerCase().includes(props.sendSearch.toLowerCase())
                            ) {
                                return (<tr><td >{val.product_name}</td><td className='add' onClick={()=>cliced(val.id)} ><i class="fa fa-plus"></i></td></tr>)
                            } else if (val.barcode.toString().toLowerCase().includes(props.sendSearch.toLowerCase())
                            ) {
                                return (<tr><td >{val.product_name}</td><td className='add' onClick={()=>cliced(val.id)} ><i class="fa fa-plus"></i></td></tr>)
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div className='col-8 trash'>
                <h1 id='main_text'>Корзина<i class="fa fa-cart-plus"></i></h1>
                <hr />

                <Sel_product_item valu={dana} data={trash}/>

            </div>
        </div>
    );
}

export default Sel_product;