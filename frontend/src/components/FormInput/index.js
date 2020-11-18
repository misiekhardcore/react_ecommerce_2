import React from "react";

const FormInput = (props) => {
  return (
    <div className="formInput">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required={props.required && "true"}
      />
    </div>
  );
};

export default FormInput;
