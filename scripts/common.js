import SessionHandler from "./utils/sessionHandler.js";
import {updateBagCountDisplay} from "./utils/commonFunctions.js";

export let sessionHandler = new SessionHandler();

$(document).ready(function () {

    $.get("header.html", function (data) {
        $('body').prepend(data);
        let $sidemenuList = $(".sideMenuOptions ul");
        let prependOptions;

        if (typeof $.cookie('TSS') !== 'undefined') {
            $("#loginLink").hide();
            $("#accountOptions").show();
            let fn = localStorage.getItem("FN");
            if (fn !== null) {
                $("#userFN").text(localStorage.getItem("FN").toUpperCase());
                prependOptions = "<li class=\"sideMenu-login-name\" style=\"border-bottom: rgba(255,255,255,0.5) 1px solid; margin-left: 5px; margin-bottom: 10px; margin-top: 0; color: lightblue; max-width: 80%\">" + localStorage.getItem("FN").toUpperCase() + "</li>";
                prependOptions += "<li><a>My Account</a></li>";
                prependOptions += "<li><a>My Orders</a></li>";
                prependOptions += "<li><a>My Wishlist</a></li>";
            }
            $sidemenuList.append("<li style=\"border-top: rgba(236,93,93,0.5) 1px solid; margin-top: 5px; margin-left: 5px; margin-bottom: 100px\"><a class='logMeOut'>Logout</a></li>");

            /** ******************************
             * Refresh Token
             ****************************** **/
            sessionHandler.startRefreshInterval();

            /** ******************************
             * Idle user
             ****************************** **/
            if (!sessionHandler.keep) {
                sessionHandler.inactivityChecker();
                //Zero the idle timer on mouse movement.
                $(this).mousemove(function (e) {
                    sessionHandler.idleTime = 0;
                });
                $(this).keypress(function (e) {
                    sessionHandler.idleTime = 0;
                });
            }
        } else {
            $("#loginLink").show();
            $("#accountOptions").hide();
            prependOptions = "<li class=\"sideMenu-login-name\" style=\"border-bottom: rgba(255,255,255,0.5) 1px solid; margin-bottom: 10px; margin-top: 20px; color: lightblue\"><a href=\"login.html\">Login / Sign up</a></li>";
        }

        $sidemenuList.prepend(prependOptions);
        updateBagCountDisplay();

    });

    $('#footer').load('footer.html');
    const scale = 'scale(1)';
    document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
    document.body.style.msTransform = scale;       // IE 9
    document.body.style.transform = scale;     // General

});

/* Anything that gets to the document
   will hide the dropdown */
$(document).click(function () {
    $(".dropdown-content").hide();
});
$(document).on("click", ".dropdown", function (e) {

    let dropdownContent = $(this).find(".dropdown-content");
    if (dropdownContent.is(":visible"))
        dropdownContent.hide();
    else
        dropdownContent.show();
    e.stopPropagation();
});

$(document).on("click", ".logMeOut", function () {
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

