import axios from "axios";
import ApiService from "./ApiService";
import CookieService from "./CookieService";

interface Credentiales {
    email: string
    password: string
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
          const options = { path: "/" };
          CookieService.set("access_token", response.token, options);
          return true;
        }
    
        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        const options = { path: "/", expires: date };
        CookieService.set("access_token", response.token, options);
        return true;
    }


}
export default new AuthService();