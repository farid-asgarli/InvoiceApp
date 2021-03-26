import React from "react";
import "./InputField.css";
import DatePicker from 'react-datepicker';
import "./InputField.css";
interface Props {
  name: string;
  type?: string;
  onChange?:any;
  value?:Date;
  error?:any;
  isStart?:boolean;
  isEnd?:boolean;
}

export default function DateInputField({name,error,isEnd=false,isStart=false,onChange,type,value}: Props) {
 
  return (
    <div className="form-control-custom is-expanded">
    <DatePicker name={name} showFullMonthYearPicker selectsStart={isStart} selectsEnd={isEnd} onChange={onChange}  selected={(value&& new Date(value))||null}/>
    {error ? <div>{error}</div> : null}
    </div>
          
  );
}
