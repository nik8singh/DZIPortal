import SessionHandler from "./utils/sessionHandler.js";

export let sessionHandler = new SessionHandler();
$(document).ready(function () {

    $.get("header.html", function (data) {
        $('body').prepend(data);

        if (typeof $.cookie('TSS') !== 'undefined') {
            $("#loginLink").hide();
            $("#accountOptions").show();
            let fn = localStorage.getItem("FN");
            if (fn !== null)
                $("#userFN").text(localStorage.getItem("FN").toUpperCase());
        } else {
            $("#loginLink").show();
            $("#accountOptions").hide();
        }
    });

    $('#footer').load('footer.html');
    const scale = 'scale(1)';
    document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
    document.body.style.msTransform = scale;       // IE 9
    document.body.style.transform = scale;     // General

});
$(document).on("click", "#logout", function () {
    sessionHandler.logoutUser();
});

$(document).on("click", "#menuButton", function (e) {
    closeSideMenu("100%", "80%", "10px", 'hidden', "block");
});

$(document).on("click", "#menuClose", function (e) {
    closeSideMenu("0", "0", "0", 'scroll', "none");
});

$(document).on("click", "#sideMenuBk", function (e) {
    closeSideMenu("0", "0", "0", 'scroll', "none");
});

function closeSideMenu(sideMenuBkWidth, sideMenuWidth, sideMenuPadding, bodyOverflow, sideMenuDisplay) {
    let $sideMenu = $("#sideMenu")
    let $sideMenuBk = $("#sideMenuBk")
    $sideMenuBk.css("width", sideMenuBkWidth);
    $sideMenu.css("width", sideMenuWidth);
    $sideMenu.css("padding", sideMenuPadding);
    $('body').css('overflow', bodyOverflow);
    $sideMenu.css("display", sideMenuDisplay);
}
