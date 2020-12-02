let apiDomain = "";
//if (process.env.NODE_ENV === "production") {
//  apiDomain = "https://mi-url.com/";
//} else {
//  apiDomain = "http://localhost:3333/";
//}
const API_URL = "http://localhost:3333/"

class ApiService {
    static loginUrl() {
        return API_URL + 'api/users/login'
    }
}

export default ApiService;