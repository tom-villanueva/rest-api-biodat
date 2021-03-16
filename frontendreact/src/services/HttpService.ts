import axios, { AxiosResponse } from "axios";
import CookieService from "./CookieService";
import { useHistory } from 'react-router-dom';
import AxiosOptionsInterface from '../interfaces/AxiosOptionsInterface';
import { useState, useEffect } from "react";

export default axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    Authorization: "Bearer " + CookieService.get("access_token"),
  },
});
// const useHttpService = async (options: AxiosOptionsInterface) => {
//   const [response, setResponse] = useState({} as AxiosResponse<any>);
//   const at = CookieService.get("access_token");
//   const history = useHistory();
//   const config = {
//     url : options.url,
//     method : options.method,
//     headers: {
//       Authorization: "Bearer " + at,
//     },
//     data: options.data,
//   };

//   const makeRequest = async () => {
//     try {
//       const response: AxiosResponse<any> = await axios.request(config);
//       setResponse(response);
//     } catch (error) {
//       history.replace(history.location.pathname, { 
//         errorStatusCode: error.response.status 
//       });
//       console.error("No fue posible conseguir los datos", error);
//       // return error.response !== undefined ? error.response : error;
//     }
//   }
//   makeRequest();
  
//   return response;
// };

// export default useHttpService; 