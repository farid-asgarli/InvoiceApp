import { useField } from "formik";
import React from "react";
import { Label } from "semantic-ui-react";
import "./InputField.css";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
  onChange?:any;
  value?:any
}

export default function InputField(props: Props) {
  const [field, meta] = useField(props.name);
  return (
    <div className="form-control-custom is-expanded">
      <input className="input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label
          basic
          color="red"
          style={{ marginTop: 10 }}
          content={meta.error}
        />
      ) : null}
    </div>
  );
}
