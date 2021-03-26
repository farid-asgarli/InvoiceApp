import "./InputField.css";
import React from "react";

interface Props {
    placeholder?:string;
  name: string;
  type?: string;
  onChange: any;
  value: any;
  children:any;
  defaultValue?:any;
  onClick?:any;
}

export default function SelectField(props: Props) {
  return (
    <div className="form-control-custom is-expanded">
      <select
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        onClick={props.onClick}
      >
        {props.children}
      </select>
    </div>
  );
}
