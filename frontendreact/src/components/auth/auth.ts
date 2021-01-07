import CookieService from '../../services/CookieService'

class auth {
    authenticated: boolean;
    constructor(){
        this.authenticated = false;
    }
    isAuthenticated() {
        const token = CookieService.get("access_token");
        token ? (this.authenticated = true) : (this.authenticated = false);
        return this.authenticated;
    }
}

export default new auth();