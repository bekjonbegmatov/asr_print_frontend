import React, { useState, useEffect } from 'react';

function Ended_item(props) {
    return (  
        <React.Fragment>
            <tr>
                <td className='border'>{props.id}</td>
                <td className='border'>{props.data.product_name}</td>
                <td className='border'>{props.data.barcode}</td>
                <td className='border '>{parseFloat(props.data.remained) == 0 && <p className="text-red-500">Товар закончен
                </p>}
                {parseFloat(props.data.remained) != 0 && <p className="text-grean-500">{props.data.remained}</p>}
                </td>
            </tr>
        </React.Fragment>
    );
}

export default Ended_item;