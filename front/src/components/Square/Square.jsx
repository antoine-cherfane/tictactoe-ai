import React from 'react';
import './SquareStyle.css'

export default function Square({value, onclick, className}) {
    return (
        <button className={'square ' + (className)} onClick={onclick}>
            {value}
        </button>
    );
}