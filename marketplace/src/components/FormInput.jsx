import React from 'react';

const FormInput = ({ label, type, name, placeholder, optional }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        className="form-control" 
        required={!optional} 
      />
    </div>
  );
};

export default FormInput;

