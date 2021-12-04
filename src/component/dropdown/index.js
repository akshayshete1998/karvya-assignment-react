import React from 'react'
import './style.css'
export const Dropdown = ({selectedValue, data}) =>{
    return(
        <div className="dropdownWrapper">
            <select className="selectedDropdown" onChange={(value) => selectedValue(value)}>
                <option value="value" selected>Countrie Options</option>
                {data.map((value, index) =>(
                <option key={index} value={value.name}>{value.name}</option>
                ))}
            </select>
        </div>
    )
}