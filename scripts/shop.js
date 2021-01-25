import {parameterFromURL} from "./utils/commonFunctions.js"
import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";
import ProductPanelGenerator from "./utils/productPanelGenerator.js";

let threeFiltersPopulatedFlag = 0;
$(document).ready(function () {
    callToPopulateFilters();
});

function callToPopulateFilters() {

    new AjaxCall(new ApiUrls().jt_url + "vis/list/active/-1", 'GET').makeCall(populateFilters, filtersCompleted);
    new AjaxCall(new ApiUrls().gemstone_url + "vis/list/active/-1", 'GET').makeCall(populateFilters, filtersCompleted);
    new AjaxCall(new ApiUrls().metal_url + "vis/list/active/-1", 'GET').makeCall(populateFilters, filtersCompleted);

}

function populateFilters(data) {
    let $optionsClass = null, selectCheckbox = decodeURI(parameterFromURL("s")), checkedflag = false;
    $.each(data, function (key, elementParent) {
        if ($.isArray(elementParent)) {
            $optionsClass = $("." + key + " .filterDivBoth");
            let i = 0;
            $.each(elementParent, function (index, element) {
                let value = null;
                $.each(element, function (index, key) {

                    if (index.includes("jewelryTypeId"))
                        value = key

                    if (index.includes("Name")) {

                        let hide = "", checkorNot = "";

                        if (value == null)
                            value = key;

                        if (value.toString() === selectCheckbox) {
                            checkorNot = "checked"
                            checkedflag = true;
                        }

                        if (i > 3)
                            hide = "hidden";

                        let check = "<label class=\"checkbox\" " + hide + ">" +
                            "               <input type=\"checkbox\"  value=\"" + value + "\" " + checkorNot + "/>" +
                            "                <span>" + key + "</span>" +
                            "            </label>";

                        $optionsClass.append(check);

                        return false;
                    }

                });

                i++;

            });
        }
    });

    if (checkedflag)
        toggleSeeMoreFilter($optionsClass.parent().find('.seeFilter'));

}

function filtersCompleted() {
    threeFiltersPopulatedFlag++;
    if (threeFiltersPopulatedFlag === 3)
        callToPopulate();//(decodeURI(parameterFromURL("s")), parameterFromURL("t"));
}

function callToPopulate() {

    let ajaxCall, data = createFilterJSON();
    let url = new ApiUrls().product_url + "vis/list/shopFilter/1";

    ajaxCall = new AjaxCall(url, 'POST', 'json', data, 'application/json');
    $(".product-list-panel").append("" +
        "<div id='loadingParent' style='width: 100%; height: 50%; position: relative'><div id=\"loading\">\n" +
        "    <img alt=\"Loading...\" id=\"loading-image\" src=\"assets/Ripple-loading.gif\"/>\n" +
        "</div></div>")
    ajaxCall.makeCall(populate, ajaxCallCompleted);
}

$(document).on("click", ".filterOptions :checkbox", function () {
    callToPopulate();
});

function ajaxCallCompleted() {
    $("#loadingParent").remove();
}

function populate(data) {
    const productHtmlGenerator = new ProductPanelGenerator();
    let $popularProductColumn = $(".product-list-panel");
    $popularProductColumn.empty();
    let products;
    if (data.productMinimumDTOS !== undefined)
        products = data.productMinimumDTOS;
    else
        products = data.productsDtos;

    $(".totalNumberOfItems").text("Showing " + products.length + " out of " + data.count);
    if (products.length === 0) {
        $popularProductColumn.append("<div class=\"noMatchFoundMessage\" >Sorry, but nothing matched your filters. " +
            "<ul><li>Try again with different filters</li> " +
            "<li>Change search type under Stone or Metal to \"At least selected\" instead of \"Exact match\"</li> " +
            "<li>Request a custom design, <a href=\"customize.html\">click here</a></li>" +
            "</ul></div>");
        return;
    }

    $.each(products, function (index, element) {
        let productHtml = productHtmlGenerator.generate(element, true);
        $popularProductColumn.append(productHtml);
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

$(document).on("click", ".clearFilters", function (e) {
    $(whichFilterPanelIsUsed()).find(":checkbox").prop('checked', false);
    $(whichFilterPanelIsUsed()).find(":radio[value=false]").prop('checked', true);
    $(".activePrice").removeClass("activePrice");


    $("#low-price").val("");
    $("#high-price").val("");
    $(".currentSort").text("Relevance");
    if (whichFilterPanelIsUsed() === ".sideMenuOptions")
        closeOpenFilterMenu("0", "0", "0", 'scroll', "none");
    callToPopulate();
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
        $filterOptionsSideMenu.find(".checkbox").show();
        self.find('i').removeClass("fa-plus").addClass("fa-minus");
    } else {
        $filterOptionsSideMenu.hide();
        self.find('i').removeClass("fa-minus").addClass("fa-plus");
    }
});

$(document).on("click", ".seeFilter", function (e) {
    toggleSeeMoreFilter($(this));
});

function toggleSeeMoreFilter(self) {
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

}

function whichFilterPanelIsUsed() {
    if (!$('#filterMenuPanel').is(':visible')) {
        return ".filter-panel";
    } else { // mobile view
        return ".sideMenuOptions";
    }
}

$(document).on("click", ".dropdown-content a", function (e) {
    let self = $(this);
    $(".currentSort").text((self.text()));
    callToPopulate();
});

$(document).on("click", ".priceType a", function (e) {
    let self = $(this);
    $(".activePrice").removeClass("activePrice");
    self.addClass("activePrice");
    $("#low-price").val("");
    $("#high-price").val("");
    callToPopulate();
});

$(document).on("click", ".customPriceRange", function (e) {
    let self = $(this);
    let error = $(".customPriceError");
    error.hide();
    let min = parseInt($("#low-price").val());
    let max = parseInt($("#high-price").val());
    if (min > max) {
        error.show();
    } else {
        $(".activePrice").removeClass("activePrice");
        self.parent().addClass("activePrice");
        callToPopulate();
    }
});

$(document).on("click", ".searchType :radio", function () {
    callToPopulate();
});

$(document).on("click", ".applyFilters", function (e) {

    $(".filterOptionsSideMenu .currentSort").text($(".sideMenuOptions input:radio[name=sort]:checked").parent().find("span").text());
    $(".sideMenuOptions input:radio[name=price]").parent().find("span").removeClass("activePrice");
    $(".sideMenuOptions input:radio[name=price]:checked").parent().find("span").addClass("activePrice");
    closeOpenFilterMenu("0", "0", "0", 'scroll', "none");
    callToPopulate();
    createFilterJSON();
});

function createFilterJSON() {
    let item = {}, jts = [], gems = [], mets = [];
    let checkedBoxes = $(whichFilterPanelIsUsed()).find(":checkbox:checked");

    checkedBoxes.each(function () {
        let $filterParentDiv = $(this).parent().parent().parent();

        let filterValue = $(this).val();
        console.log(filterValue, $filterParentDiv)

        if ($filterParentDiv.hasClass("metalsDtos")) {
            let materialItem = {};
            materialItem["metalName"] = filterValue;
            mets.push(materialItem);
        } else if ($filterParentDiv.hasClass("gemstones")) {
            let materialItem = {};
            materialItem["gemstoneName"] = filterValue;
            gems.push(materialItem);

        } else if ($filterParentDiv.hasClass("jewelryTypes")) {
            let materialItem = {};
            materialItem["jewelryTypeId"] = filterValue;
            jts.push(materialItem);
        }

    });

    if (jts.length > 0)
        item['productJewelryTypes'] = jts;
    if (gems.length > 0)
        item['productGemstones'] = gems
    if (mets.length > 0)
        item['productMetals'] = mets;

    switch ($(whichFilterPanelIsUsed() + " .currentSort").text()) {
        case "Price: Low to High":
            item['sortBy'] = "pricelowToHigh";
            break;
        case "Price: High to Low":
            item['sortBy'] = "priceHighToLow";
            break;
        case "Newest Arrivals":
            item['sortBy'] = "newest";
            break;
        default:
            item['sortBy'] = "relevance";
    }
    let min = 0, max = -1, selectedPrice = $(whichFilterPanelIsUsed() + " .activePrice");
    switch (selectedPrice.text()) {
        case "Under $25" :
            max = 25;
            break;
        case "$25 to $50" :
            min = 25;
            max = 50;
            break;
        case "$50 to $100" :
            min = 50;
            max = 100;
            break;
        case "$100 to $200" :
            min = 100;
            max = 200;
            break;
        case "$200 & Above" :
            min = 200;
            break;
        default:
            if (selectedPrice.hasClass("priceCustom")) {
                min = $("#low-price").val();
                max = $("#high-price").val();
            } else {
                min = 0;
                max = -1;
            }
    }
    item['min'] = min;
    item['max'] = max;
    item['exactGT'] = $(whichFilterPanelIsUsed() + " .gemstones").find(":radio:checked").val();
    item['exactMT'] = $(whichFilterPanelIsUsed() + " .metalsDtos").find(":radio:checked").val();
    return JSON.stringify(item);

}