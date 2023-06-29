import { SessionController } from "./NativeJs/session";
import { Fetch } from "./NativeJs/fetch";

export class CsrfToken {
    constructor() {
        this.fetch = new Fetch();
        this.sessionController = new SessionController();
        this.target = "http://localhost/food/api.php/user?getToken=true";
        this.csrf_token = this.sessionController.get({ item: 'csrf_token' });
    }

    async initial() {
        this.csrf_token = this.sessionController.get({ item: 'csrf_token' });

        //console.log('token', this.csrf_token);
        if (this.csrf_token === undefined || this.csrf_token === null) {
            const csrf_token = await this.getToken();
            //console.lgo(csrf_token)
            //this.sessionController.show();
        }


        //this.sessionController.clear();
        await this.checkToken();

    }

    async getToken() {
        const response = await this.fetch.GET(this.target);
        //console.log(response)
        this.sessionController.add({ title: 'csrf_token', item: response.data.csrf_token });
        this.sessionController.add({ title: 'sessionId', item: response.data.sessionId });
        return response.data.csrf_token;
    }

    async checkToken() {
        //const params = {};
        const response = await this.fetch.POST({ target: this.target });
        if (response !== undefined || response !== null) {
            //console.log(response)
            if (response.status === 205) {
                console.log('get new token')
                await this.getToken();
            }
        }
    }
}
