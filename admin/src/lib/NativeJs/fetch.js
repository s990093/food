import { SessionController } from "./session";
/**
 *
 * @class Fetch class for performing HTTP requests.
 */
export class Fetch {
    constructor({ traget } = {}) {
        this.sessionController = new SessionController();
        this.traget = traget;
    }

    _get_session(name) {
        return this.sessionController.get({ item: name });
    }

    _get_cookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    /**
    * @method GET - 发送 GET 參數
    * @example  params = {
                               param1: 'value1',
                               param2: 'value2',
                               param3: 'value3'
                               };
    * 
    * @param {string} target  url
    * @param {Object} params - 参数对象
    * @returns {Promise<Response>} - 返回包含响应数据的 Promise 对象
    */
    async GET(target) {

        //console.log(target)
        return new Promise((resolve, reject) => {
            fetch(target)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    async POST({ target, params = null }) {

        try {
            const response = await fetch(target, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this._get_session('csrf_token'),
                    'sessionId': this._get_session('sessionId')
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error('Failed with status code: ' + response.status);
            }


            const cookies = document.cookie;
            //console.log(cookies);

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Request failed: ' + error.message);
        }
    }
}