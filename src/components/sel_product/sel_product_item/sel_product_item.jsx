import { get } from 'jquery';
import React, { useState , useEffect } from 'react';

function Sel_product_item(props) {
    const [korzina , setKorzina] = useState([])
    useEffect(()=>{
        console.log(props.data)
        get(props.valu)
    })
    function get(arr) {
        let kval = props.data
        let res = []
        let temp = []
        for (let i = 0; i < arr.length; i++) {
            
            for (let n = 0; n < kval.length; n++) {
                if (arr[i]==kval[n]){
                    temp.push(arr[i])
                }
            }
        }
        res.push(temp)
        console.log(res)
        setKorzina(res)
    }
    return ( 
        <div>
            {korzina.map((val , i) => {
                return(<h1>{val.product_name}</h1>)
            })}
        </div>
        
    );
}
export default Sel_product_item;