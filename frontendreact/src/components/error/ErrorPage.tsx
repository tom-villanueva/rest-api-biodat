import { render } from '@testing-library/react';
import React, { Component } from 'react'

interface Props {
  errorStatusCode : number
  // errors: []
} 

const ErrorPage = (props: Props) => {

  // const renderErrors = () => {
  //   return props.errors.map((error, index) => {
  //     return (
  //       <p>{error}</p>
  //     );
  //   });
  // };

  return (
    <div>
      <h3>HUBO UN ERROR/ES</h3>
      <h3>{props.errorStatusCode}</h3>
      {/* {props.errors && 
        renderErrors()
      } */}
    </div>
  )
};
export default ErrorPage;
