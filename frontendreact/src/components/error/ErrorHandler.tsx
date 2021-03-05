import React from 'react';
import { useLocation } from 'react-router-dom';
import { get } from 'lodash';
import ErrorPage from './ErrorPage';

export const ErrorHandler = ({ children }) => {
  const location = useLocation();
  const errorStatusCode = get(location.state, 'errorStatusCode')
  if(errorStatusCode > 400) {
    return <ErrorPage errorStatusCode = { errorStatusCode }/>
  }
  else {
    return children
  }
};