let apiDomain = "";
//if (process.env.NODE_ENV === "production") {
//  apiDomain = "https://mi-url.com/";
//} else {
//  apiDomain = "http://localhost:3333/";
//}
apiDomain = "http://localhost:3333/"

class UserService {
    static loginUrl() {
        return apiDomain + 'api/users/login'
    }
}

export default UserService;