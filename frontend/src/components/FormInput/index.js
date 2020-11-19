import React from "react";

const FormInput = (props) => {
  return (
    <div className="formInput">
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        {...props}
      />
    </div>
  );
};

export default FormInput;
