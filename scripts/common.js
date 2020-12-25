$(document).ready(function () {

    $('#header').load('header.html');
    $('#menuNav').load('navMenu.html');
    $('#footer').load('footer.html');
    var scale = 'scale(1)';
    document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
    document.body.style.msTransform = scale;       // IE 9
    document.body.style.transform = scale;     // General
});

$(document).on("click", "#emptydiv", function (e) {
    closeSideMenu("100%", "50%", "10px", 'hidden');
});

$(document).on("click", "#menuClose", function (e) {
    closeSideMenu("0", "0", "0", 'scroll');
});

$(document).on("click", "#sideMenuBk", function (e) {
    closeSideMenu("0", "0", "0", 'scroll');
});

function closeSideMenu(sideMenuBkWidth, sideMenuWidth, sideMenuPadding, bodyOverflow) {
    let $sideMenu = $("#sideMenu")
    let $sideMenuBk = $("#sideMenuBk")
    $sideMenuBk.css("width", sideMenuBkWidth);
    $sideMenu.css("width", sideMenuWidth);
    $sideMenu.css("padding", sideMenuPadding);
    $('body').css('overflow', bodyOverflow);
}