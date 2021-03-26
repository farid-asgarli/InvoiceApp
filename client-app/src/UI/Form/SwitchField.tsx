import React, { ChangeEvent } from "react";
import "./SwitchField.css";

interface Props {
  onChange?: { (e: ChangeEvent<any>): void };
  value?: any;
  name: string;
  label?: string;
}

export default function SwitchField(props: Props) {
  return (
    <div className="switch-field">
      <label htmlFor={props.label}>{props.label} </label>
      <label className="switch">
        <input {...props} type="checkbox"  checked={props.value===true} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}
