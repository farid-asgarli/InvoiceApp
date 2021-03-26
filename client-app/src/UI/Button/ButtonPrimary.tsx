import React from 'react'
import './ButtonPrimary.css';

interface Props{
  text:string,
  clickEvent?:()=>void;
  type:"submit"|"button"
  style?:React.CSSProperties | undefined;
}


export default function ButtonPrimary({text,type,clickEvent,style}:Props) {
    return (
        <button style={style} type={type} className="button" onClick={clickEvent}>
        <span>{text}</span>
        
      </button>
    )
}
