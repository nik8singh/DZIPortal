import {parameterFromURL} from "./utils/commonFunctions.js"
import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";
import ProductPanelGenerator from "./utils/productPanelGenerator.js";

$(document).ready(function () {

    callToPopulate(parameterFromURL("s"), parameterFromURL("t"));
    callToPopulateFilters();
});

function callToPopulateFilters() {

    new AjaxCall(new ApiUrls().jt_url + "vis/list/active/-1", 'GET').makeCall(populateFilters);
    new AjaxCall(new ApiUrls().gemstone_url + "vis/list/active/-1", 'GET').makeCall(populateFilters);
    new AjaxCall(new ApiUrls().metal_url + "vis/list/active/-1", 'GET').makeCall(populateFilters);
}

function populateFilters(data) {
    console.log(data)
    let $optionsClass, $optionsSideMenuClass;
    $.each(data, function (key, elementParent) {
        if ($.isArray(elementParent)) {
            $optionsClass = $("." + key + " .filterOptions");
            $optionsSideMenuClass = $("." + key + " .filterOptionsSideMenu");

            let i = 0;
            $.each(elementParent, function (index, element) {

                $.each(element, function (index, key) {
                    if (index.includes("Name")) {
                        let hide = "";
                        if (i > 3)
                            hide = "hidden";
                        let check = "<label class=\"checkbox\" " + hide + ">" +
                            "               <input type=\"checkbox\"  value=\"" + key + "\"/>" +
                            "                <span>" + key + "</span>" +
                            "            </label>";

                        $optionsClass.append(check);
                        $optionsSideMenuClass.append(check);
                        return false;
                    }

                });

                i++;

            });
        }
    });

}

function callToPopulate(filterTo, filterType) {
    let ajaxCall, url, data;
    switch (filterType) {
        case "all":
            url = new ApiUrls().product_url + "vis/list/published/1";
            break;
        case "stone":
            url = new ApiUrls().product_url + "vis/list/filtered/1";
            break;
        case "metal":
            url = new ApiUrls().product_url + "vis/list/filtered/1";
            break;
        case "jt":
            url = new ApiUrls().product_url + "vis/list/filtered/1";
            break;
        default:
    }
    ajaxCall = new AjaxCall(new ApiUrls().product_url + "vis/list/published/1", 'GET');
    ajaxCall.makeCall(populate);
}

function populate(data) {
    console.log(data)
    const productHtmlGenerator = new ProductPanelGenerator();
    let $popularProductColumn = $(".product-list-panel");
    $.each(data, function (index, elementParent) {
        if ($.isArray(elementParent)) {
            $.each(elementParent, function (index, element) {
                let productHtml = productHtmlGenerator.generate(element, true);
                $popularProductColumn.append(productHtml);
            });
        }
    });
}


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

$(document).on("click", ".sideMenuPanelHeader", function (e) {
    let self = $(this);
    let $filterOptionsSideMenu = self.parent().find(".filterOptionsSideMenu");
    if ($filterOptionsSideMenu.is(":hidden")) {
        $filterOptionsSideMenu.css("display", "flex");
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
        $filterOptions.find(".checkbox").show();


    } else {
        $filterOptions.removeClass("filterOptionsLong").addClass("filterOptionsShort");
        self.html("<i class=\"fas fa-sort-down\"></i> See More");
        $filterOptions.find(".checkbox:gt(3)").hide();
    }
});

function createFilterJSON() {
    let item = {}, jt = [], gems = [], mets = [];

    $('.filterJT:checkbox:checked').each(function () {
        console.log($(this).val());
    });

    // let jewelryType["jewelryTypeId"] = 1;
    // item['productJewelryTypes'] = ;
    // item['productGemstones'] = ;
    // item['productMetals'] = ;

}