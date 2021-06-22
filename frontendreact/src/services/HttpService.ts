import axios, { AxiosResponse } from "axios";
import CookieService from "./CookieService";

export default axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    Authorization: "Bearer " + CookieService.get("access_token"),
  },
});
