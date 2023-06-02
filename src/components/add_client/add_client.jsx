import { useState } from 'react';

function Add_client(props) {
    const [client , setClient] = useState('')
    const [phone_number , setPhone_number] = useState('')
    function add_client_to_the_data_base() {
        if (client.length == 0){
            alert('Vadite FOI Clienta !')
        }else if (phone_number.length == 0){
            alert('Vedite nomer telefona !')
        }
        fetch(`${props.IP_ADRESS}client/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client : client,
                phone_number : phone_number,
            }),
        });
        window.location.reload()
    }
    function get_client(event) {
        let temp = event.target.value
        setClient(temp)
    } function get_phone_number(event) {
        let temp = event.target.value
        setPhone_number(temp)
    }
    return (  
        <div>
            <div className="header text-center text-bold border border-purple-800 ">
                <h1>Добавит Клиента</h1>
            </div>
            <div className="main m-4">
                <input type="text" className='form form-control' placeholder='ФИО Клиента' onChange={get_client} />
                <input type="text" className='form form-control' placeholder='Телефон' onChange={get_phone_number} />
                <br />
                <button className='btn btn-success' onClick={add_client_to_the_data_base}>Добавит</button>
            </div>
        </div>
    );
}

export default Add_client;