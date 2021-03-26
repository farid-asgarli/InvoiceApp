import React from "react";
import "./InputField.css";

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  onChange?:any;
  value?:any;
  error?:any;
}

export default function InputFieldSecondary(props: Props) {
 
  return (
    <div className="form-control-custom is-expanded">
      <input className="input"  {...props} />
      {props.error ? <div>{props.error}</div> : null}
    </div>
  );
}
