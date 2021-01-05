export default class SessionHandler {

    logoutUser() {
        $.removeCookie('TSS', {path: '/'});
        localStorage.removeItem("UE");
    }
}