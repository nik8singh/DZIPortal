import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";

$(document).ready(function () {
    let ajaxCall = new AjaxCall(new ApiUrls().gemstone_url + "vis/list/active/-1", 'GET');
    ajaxCall.makeCall(populate);
    ajaxCall = new AjaxCall(new ApiUrls().jt_url + "vis/list/active/-1", 'GET');
    ajaxCall.makeCall(populate);
    ajaxCall = new AjaxCall(new ApiUrls().metal_url + "vis/list/active/-1", 'GET');
    ajaxCall.makeCall(populate);

});

function populate(data) {
    console.log(data);
    let $categoryTypeClass = $(".list_jt");
    let nameVar = "jewelryTypeName";
    if (data.hasOwnProperty('gemstones')) {
        $categoryTypeClass = $(".list_stone");
        nameVar = "gemstoneName";
    } else if (data.hasOwnProperty('metalsDtos')) {
        $categoryTypeClass = $(".list_metal");
        nameVar = "metalName";
    }

    $.each(data, function (index, elementParent) {
        if ($.isArray(elementParent)) {
            $.each(elementParent, function (index, element) {
                $categoryTypeClass.append(" <div class=\"category_pane shop_product_pane \">" +
                    "                    <a href=\"shop.html\">" +
                    "                        <img alt=\"product img\" src=\"assets/prod2.jpg\">" +
                    "                        <div class=\"category_name product_name\">" + element[nameVar] +
                    "                        </div>" +
                    "                    </a>" +
                    "                </div>");
            });
        }
    });

}

$(document).on("click", ".category_title", function (e) {
    let icon = $(this).find("i"), listDiv = $(this).next(".category-list-panel");

    if (icon.hasClass("fa-plus")) {
        icon.removeClass("fa-plus").addClass("fa-minus")
        listDiv.css("display", "flex");
    } else {
        icon.removeClass("fa-minus").addClass("fa-plus");
        listDiv.css("display", "none");
    }

});