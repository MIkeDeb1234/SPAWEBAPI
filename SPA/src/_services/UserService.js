
export class UserService {
    apiUrl = "http://localhost:5000/api/";
    async login(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };

        const response = await fetch(this.apiUrl + 'user/login', requestOptions);
        const data = await response.json();
        if (data.status == false) {
            alert("Wrong username / password")
            return false;
        }
        else {
            localStorage.setItem("token1", data.token);
            if (data.lastclock) {
                localStorage.setItem("clock", data.lastclock);
            }
            else
                localStorage.setItem("clock", "");

            return true;

        }

    }
    async register(registerModal) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: registerModal.username, password: registerModal.password })
        };

        const response = await fetch(this.apiUrl + 'user/register', requestOptions);
        const data = await response.json();
        return data;
    }
    async logout() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem("token1") })
        };

        const response = await fetch(this.apiUrl + 'user/logout', requestOptions);
        const data = await response.json();
        localStorage.setItem("token1", "");
    }
    isLoggedIn() {
        return localStorage.getItem("token1") != "";
    }
    async stopClock() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token1") },
            body: JSON.stringify({ token: localStorage.getItem("token1") })
        };
        var res;
        const response = await fetch(this.apiUrl + 'user/stopclock', requestOptions).then(async (ress) => {
            await ress.json().then((re) => {
                res = re;
            });
        }).catch((err) => {
            console.log("Error");
            res = { err: 401 };
            return res;
        });
        
        localStorage.setItem("clock", "");
        return res;
    }
    async startClock() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token1") },
            body: JSON.stringify({ token: localStorage.getItem("token1") })
        };
        var res;
        const response = await fetch(this.apiUrl + 'user/startclock', requestOptions).then(async (ress) => {
            await ress.json().then((re) => {
                res = re;
            });
        }).catch((err) => {
            console.log("Error");
            res = { err: 401 };
            return res;
        });
        return res;

    }
    async changePassword(newPassword, currentPassword) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token1") },
            body: JSON.stringify({ token: localStorage.getItem("token1"), currentPassword: currentPassword, newPassword: newPassword })
        };

        var res;
        const response = await fetch(this.apiUrl + 'user/changepassword', requestOptions).then(async (ress) => {
            await ress.json().then((re) => {
                res = re;
            });
        }).catch((err) => {
            res = { err: 401 };
            return res;
        });
        return res;
    }
}