$(document).ready(function () {


});


$(document).on("click", "#filterMenuButton", function (e) {
    closeOpenFilterMenu("100%", "50%", "10px", 'hidden', "block");
});

$(document).on("click", "#filterMenuClose", function (e) {
    closeOpenFilterMenu("0", "0", "0", 'scroll', "none");
});

$(document).on("click", "#sideMenuBk", function (e) {
    closeOpenFilterMenu("0", "0", "0", 'scroll', "none");
});

function closeOpenFilterMenu(sideMenuBkWidth, sideMenuWidth, sideMenuPadding, bodyOverflow, sideMenuDisplay) {
    let $sideMenu = $("#filterMenu")
    let $sideMenuBk = $("#sideMenuBk")
    $sideMenuBk.css("width", sideMenuBkWidth);
    $sideMenu.css("width", sideMenuWidth);
    $sideMenu.css("padding", sideMenuPadding);
    $('body').css('overflow', bodyOverflow);
    $sideMenu.css("display", sideMenuDisplay);
}

$(document).on("click", ".filterParent", function (e) {
    let self = $(this);
    let $filterOptionsSideMenu = self.find(".filterOptionsSideMenu");
    if ($filterOptionsSideMenu.is(":hidden")) {
        $filterOptionsSideMenu.show();
        self.find('i').removeClass("fa-plus").addClass("fa-minus");
    } else {
        $filterOptionsSideMenu.hide();
        self.find('i').removeClass("fa-minus").addClass("fa-plus");
    }
});

$(document).on("click", ".seeFilter", function (e) {
    let self = $(this);
    let $filterOptions = self.parent().find(".filterOptions");
    if ($filterOptions.hasClass("filterOptionsShort")) {
        $filterOptions.removeClass("filterOptionsShort").addClass("filterOptionsLong");
        self.html("<i class=\"fas fa-sort-up\"></i> See Less");
    } else {
        $filterOptions.removeClass("filterOptionsLong").addClass("filterOptionsShort");
        self.html("<i class=\"fas fa-sort-down\"></i> See More");
    }
});