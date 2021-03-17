import React, { Component } from 'react'

interface Props {
  errorStatusCode : number
} 

const ErrorPage = (props: Props) => {
  return (
    <div>
      <h1>HUBO UN ERROR</h1>
      <h1>{props.errorStatusCode}</h1>
    </div>
  )
};
export default ErrorPage;
