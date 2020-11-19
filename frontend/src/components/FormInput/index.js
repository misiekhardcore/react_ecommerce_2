import React from "react";

const FormInput = (props) => {
  return (
    <div className={props.type === "radio" ? "formInput" : "formInput normal"}>
      {props.label && props.type !== "radio" && (
        <label htmlFor={props.name}>{props.label}</label>
      )}
      <input {...props} />
      {props.label && props.type === "radio" && (
        <label htmlFor={props.id}>{props.label}</label>
      )}
    </div>
  );
};

export default FormInput;
