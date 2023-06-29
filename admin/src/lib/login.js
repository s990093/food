import { Fetch } from '../lib/NativeJs/fetch.js';
import { SessionController } from '../lib/NativeJs/session.js';
import { CsrfToken } from './csrf.js';
/**
 * 创建一个登录对象
 * @param {Object} options - 包含用户名和密码的选项
 * @param {string} options.username - 用户名
 * @param {string} options.password - 密码          
 */
export class LoginController {
    constructor({ test } = { test: false }) {
        this.test = test;
        //宣告物件
        this.sessionController = new SessionController(test);
        this.fetch = new Fetch();
        this.csrfToken = new CsrfToken();

        this.target = "http://localhost/food/api.php/user";
        this.username = "";
        this.password = "";
        this.session_key = this.sessionController.get({ item: 'session_key' });
    }

    async checkLogin() {
        const isLogin = this.sessionController.get({ item: 'isLogin' });
        if (isLogin === true) {
            return true;
        }
        const islogin = await this.checkSessionKey();
        this.setisLogin({ isLogin: islogin });
        return islogin;
    }

    async login({ username, password }) {
        this.username = username;
        this.password = password;

        const params = {
            username: this.username,
            password: this.password,
            session_key: this.session_key,
            action: "login"
        };

        const response = await this.fetch.POST({
            target: this.target,
            params: params
        });
        console.log(response);
        this.setisLogin({ isLogin: response.data.isLogin });
        if (response.data.isLogin) {

            // this.sessionController.add({
            //     title: "session_key",
            //     item: response.data.session_key
            // });
            this.sessionController.setSessionItemWithExpiry({
                title: "session_key",
                item: response.data.session_key,
                hour: 24
            });

            this.sessionController.add({
                title: "username",
                item: response.data.username
            });
            this.sessionController.show();
            return true;
        } else {
            return false;
        }
    }


    async handleRegister({ username, password, email }) {
        this.username = username;
        this.password = password;

        const params = {
            username: this.username,
            password: this.password,
            session_key: this.session_key,
            email: email,
            action: "register"
        };
        //console.log(params);

        const response = await this.fetch.POST({ target: this.target, params: params });

        if (this.test) {
            console.log(response);
        }

        this.setisLogin({ isLogin: response.data.isRegister });

        return response.data.isRegister
    }

    async handleLogout() {
        this.session_key = this.sessionController.get({ item: 'session_key' });
        this.sessionController.clear();

        const params = {
            session_key: this.session_key,
            action: "logout"
        };
        const response = await this.fetch.POST({ target: this.target, params: params });
        this.consoleTest({ data: response });

        return response.ogout;
    }


    async checkSessionKey() {
        if (!this.session_key) {
            return false;
        }

        if (this.sessionController.isSessionItemExpired({ title: this.session_key })) {
            return true;
        }

        const params = {
            session_key: this.session,
            action: "check_session_key"
        };

        const response = await this.fetch.POST({ target: this.target, params });

        return response.session_key_status === 'ok';
    }

    consoleTest({ data }) {
        if (this.test) {
            console.log(data);
        }
    }

    setisLogin({ isLogin }) {
        const session_isLogin = this.sessionController.get({ item: 'isLogin' });
        if (session_isLogin !== undefined && session_isLogin !== null) {
            this.sessionController.update({ title: 'isLogin', item: isLogin });
        } else {
            this.sessionController.add({ title: 'isLogin', item: isLogin });
        }

        const settingIsLogin = this.sessionController.get({ item: 'isLogin' })

    }
}
