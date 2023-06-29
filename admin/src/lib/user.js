import { SessionController } from "./NativeJs/session";
import { Fetch } from "./NativeJs/fetch";

export class User {
    constructor({ username }) {
        this.sessionController = new SessionController();
        this.fetch = new Fetch();
        this.target = 'http://localhost/food/api.php/user';
        this.username = username;
    }

    async getUserProfile() {
        const params = { username: this.username };
        const reponse = await this.fetch.POST({ target: this.target, params: params });
        console.log(reponse);
    }

    deleteUserProfile() { }
}