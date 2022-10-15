import React from "react";
import "./SquareStyle.css"

export default function Square({value, onClick, className}) {
    return (
        <button className={"square " + (className)} onClick={onClick}>
            {value}
        </button>
    );
}