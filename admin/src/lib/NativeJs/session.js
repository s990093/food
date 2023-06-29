
/**
 * SessionController class for managing session data using sessionStorage.
 */
export class SessionController {
    /**
     * Create a new instance of SessionController.
     * @constructor
     * @param {Object} options - Optional configuration options.
     */
    constructor({ test = false } = {}) {
        this.test = test;

        // 物件宣告
        this.checkSession()
        //監聽
        this._listener();
    }

    checkSession() {

        let session = JSON.parse(sessionStorage.getItem("session"));

        if (this.test) {
            console.log("Session", session);
        }

        if (session === undefined || session === null) {
            session = [];
            sessionStorage.setItem("session", JSON.stringify(session));
        }

    }

    _listener() {
        // const self = this;
        // $('#logout').on("click", function () {
        //     self.clear();
        // });
    }

    /**
     * Add an item to the session.
     * @param {object} item - The item to be added to the session
     * @param {any} title - The session title
     * .
     */
    add = ({ title, item }) => {
        this.checkSession();
        let session = JSON.parse(sessionStorage.getItem("session"));

        // Check if title already exists in session
        if (session.includes(title)) {
            this.update({ title: title, item: item });
            return; // Exit the function if title already exists
        }

        // Add item to the session array
        session.push(title);

        // Update session data in sessionStorage
        sessionStorage.setItem("session", JSON.stringify(session));

        // Store item separately in sessionStorage using its value as the key
        if (typeof item === 'object') {
            sessionStorage.setItem(title, JSON.stringify(item));
        } else {
            sessionStorage.setItem(title, item);
        }
    }


    /**
     * Update the value of a specific item in the session.
     * @param {any} item - The item to be updated in the session.
     */
    update = ({ title, item }) => {
        let session = JSON.parse(sessionStorage.getItem("session"));
        //console.log(session);

        // Find the matching item in the session array
        const matchingItem = session.find((it) => it === title);

        if (matchingItem) {
            // Update the value of the item in sessionStorage
            sessionStorage.setItem(title, JSON.stringify(item));
        } else {
            // Handle the case when no matching item is found
            this.add({ title: title, item: item });
        }
    };



    /**
     * Get the value of a specific item in the session.
     * @param {string} item - The key of the item to retrieve.
     * @returns {any} The value of the requested item.
     */
    get = ({ item }) => {
        try {
            return JSON.parse(sessionStorage.getItem(item));
        } catch (error) {
            //console.log(error);
            return sessionStorage.getItem(item)
        }
    }

    /**
     * Show all items in the session.
     */
    show = () => {
        const session = JSON.parse(sessionStorage.getItem("session"));
        var count = 0;
        if (Array.isArray(session)) {
            session.forEach((item) => {
                count += 1;
                const value = sessionStorage.getItem(item);
                console.log(count, item, value);
            });
        }
    }



    /**
     * Clear the session by removing all items
     */
    clear = () => {
        let session = JSON.parse(sessionStorage.getItem("session"));

        // Remove each item from sessionStorage
        session.forEach((item) => {
            sessionStorage.removeItem(item);
        });

        // Clear the session array from sessionStorage
        sessionStorage.removeItem("session");
        console.log("remove session done!")
    }

    // refresh = () => {
    //     fetch.GET("/user/save_session/");
    // }

    setSessionItemWithExpiry({ title, item, hour }) {
        const expirationMs = hour * 60 * 60 * 1000;
        const expirationTime = Date.now() + expirationMs;
        const data = {
            item: item,
            expiresAt: expirationTime
        };

        this.checkSession();

        let session = JSON.parse(sessionStorage.getItem("session"));

        if (!Array.isArray(session)) {
            session = [];
        }

        if (session.includes(title)) {
            return;
        }

        session.push(title);

        sessionStorage.setItem("session", JSON.stringify(session));

        sessionStorage.setItem(title, JSON.stringify(data));
    }

    isSessionItemExpired({ title }) {
        const sessionData = sessionStorage.getItem(title);

        if (sessionData) {
            const data = JSON.parse(sessionData);
            const currentTime = Date.now();

            return currentTime > data.expiresAt;
        }

        // null
        return null;
    }
}

