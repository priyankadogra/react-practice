import {useState} from "react";

type InputWithLabelProps = {
    id: string;
    name: string;
    value: string;
    type: string;
    error: string;
    label: string;
    onChange: (val: string) => void;
    onBlur: (val: string) => void;
}


export default function InputWithLabel({id, name, value, type, error, label, onChange, onBlur}: InputWithLabelProps){

    return (
       <div className="input-with-label">
            <label htmlFor={id}>{label}</label>
            <input type={type} value={value} name={name} onChange={(e) => {                
                onChange(e.target.value)
            }}
            onBlur={(e) => {
                onBlur(e.target.value)
            }}
            />
            {error && <p>{error}</p>}
        </div>
    );

}