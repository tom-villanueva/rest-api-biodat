import axios from "axios";
import UserService from "./UserService";
//import CookieService from "./CookieService";

interface Credentiales {
    username: string
    password: string
}

class AuthService {
    async doUserLogin(credentials: Credentiales) {
        try {
            const response = await axios.post(UserService.loginUrl(), credentials)
            return response.data
        }
        catch(error){
            console.error(error.response)
            return false;
        }
    }


}
export default new AuthService();