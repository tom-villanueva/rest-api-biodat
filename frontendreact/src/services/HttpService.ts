import axios from "axios";
import CookieService from "./CookieService";

class HttpService {
  async get(url) {
    const at = CookieService.get("access_token");
    const options = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    try {
      return await axios.get(url, options);
    } catch (error) {
      console.error("No fue posible conseguir los datos", error);
      return error.response !== undefined ? error.response : error;
    }
  }

  async post(url, data, options = null) {
    const at = CookieService.get("access_token");
    const postOptions = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    const finalOptions = Object.assign(postOptions, options);
    try {
      return await axios.post(url, data, finalOptions);
    } catch (error) {
      console.error("No fue posible conseguir los datos", error);
      return error.response !== undefined ? error.response : error;
    }  
  }

  async delete(url) {
    const at = CookieService.get("access_token");
    const options = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    try {
      return await axios.delete(url, options);
    } catch (error) {
      console.error("No fue posible eliminar", error);
      return error.response !== undefined ? error.response : error;
    }
  }

  async put(url, data, options = null) {
    const at = CookieService.get("access_token");
    const putOptions = {
      headers: {
        Authorization: "Bearer " + at,
      },
    };
    const finalOptions = Object.assign(putOptions, options);
    try {
        return await axios.put(url, data, finalOptions);
    } catch (error) {
      console.error("No fue posible actualizar", error);
      return error.response !== undefined ? error.response : error;
    }
  }

}

export default new HttpService();