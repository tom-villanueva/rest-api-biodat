import axios from "axios";
import ApiService from "./ApiService";
import CookieService from "./CookieService";

interface Credentiales {
    email: string
    password: string
}

interface RegistrationCredentiales {
    email: string
    password: string
    password_confirmation: string
}

const expiresAt = 60 * 24;

class AuthService {
    async doUserLogin(credentials: Credentiales) {
        try {
            const response = await axios.post(ApiService.loginUrl(), credentials)
            return response.data
        }
        catch(error){
            console.error(error.response)
            return false;
        }
    }

    handleLoginSuccess(response: any, remember: boolean) {
        if (!remember) {
          console.log("ENTRE");
          const options = { path: "/" };
          CookieService.set("access_token", response.token, options);
          return true;
        }
    
        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        console.log(date);
        const options = { path: "/", expires: date };
        CookieService.set("access_token", response.token, options);
        return true;
    }

    async handleLogout() {
        const response = await axios.post(ApiService.logoutUrl());
        if (response) {
            CookieService.remove("access_token");
        } else {
            alert("No se pudo desloguear");
        }
    }

    async doUserRegistration(credentials: RegistrationCredentiales){
        try {
            const response = await axios.post(ApiService.registrationUrl(), credentials, { withCredentials: true})
            return response.data
        }
        catch(error){
            console.error(error.response)
            return false;
        }
    }

}
export default new AuthService();