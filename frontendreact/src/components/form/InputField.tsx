import React, { useLayoutEffect, useRef, useState } from 'react'

interface Props {
  value: string;
  errors: any[];
  placeholder: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

function InputField(props: Props) {

  const { value, errors, placeholder, name, onChange, children } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
		const currentInput = inputRef.current;

    if (errors.length > 0){
      for (let error of errors) {
        if (error.field === name) {
          currentInput?.classList.add("is-invalid");
        }
      }
    }
    else {
      currentInput?.classList.remove("is-invalid");
    }
    
    return () => {
      currentInput?.classList.remove("is-invalid");
    }
	}, [ errors ]);
  
  return (
    <div>
      <label>
        {children}
        <input
          className="form-control"
          type="text"
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          onChange={event => onChange(event)}
          name={name}
        >
        </input>
      </label>
    </div>
  )
}

export default InputField

