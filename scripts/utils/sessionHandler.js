import AjaxCall from "./ajaxCall.js";
import ApiUrls from "./../domains/apiUrls.js";

export default class SessionHandler {
    keep = $.cookie("KP");
    refresh;
    idleInterval;
    idleTime = 0;

    startRefreshInterval() {
        let self = this;
        self.refreshTheToken();
        //set interval for new token
        this.refresh = window.setInterval(function () {
            self.refreshTheToken();
        }, 600000);//10 min
    }

    refreshTheToken() {
        const ajaxCall = new AjaxCall(new ApiUrls().auth_url + "cus/refresh-token", 'GET');
        ajaxCall.makeCall(this.setCookie);

    }

    setCookie(response) {
        $.cookie("TSS", response, {path: '/'})

        console.log("cookie refreshed");
    }

    inactivityChecker() {
        let self = this;
        this.idleInterval = window.setInterval(function () {
            //Increment the idle time counter every minute.
            self.idleTime++;
            console.log(self.idleTime);

            if (self.idleTime === 15) {
                self.startRefreshInterval();
            } else if (self.idleTime > 29) {
                self.logoutUser();

            }
        }, 60000); // 1 min
    }

    logoutUser() {
        $.removeCookie('TSS', {path: '/'});
        $.removeCookie('KP', {path: '/'});
        localStorage.removeItem("UE");
        localStorage.removeItem("FN");
        clearInterval(this.refresh);
        clearInterval(this.idleInterval);
        window.location.replace("login.html");
    }
}