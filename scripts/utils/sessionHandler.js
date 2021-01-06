export default class SessionHandler {

    logoutUser() {
        $.removeCookie('TSS', {path: '/'});
        localStorage.removeItem("UE");
        localStorage.removeItem("FN");
        window.location.replace("login.html");
    }
}