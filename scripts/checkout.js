import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";

$(document).ready(function () {
    if (typeof $.cookie('TSS') !== 'undefined') {
        let userId = $.cookie('UI');
        let ajaxCall = new AjaxCall(new ApiUrls().cart_url + "cus/list/" + userId, 'GET', 'json');
        ajaxCall.makeCall(beforePopulate);
        $(".checkoutType").remove();
        $(".checkoutTypeBC").remove();
    } else {
        let bag = JSON.parse(localStorage.getItem("bagContent"));
        let bagItems = {};
        bagItems["cartItemDTOS"] = bag;
        let ajaxCall = new AjaxCall(new ApiUrls().order_url + "vis/subtotal", 'POST', 'text', JSON.stringify(bagItems), 'application/json');
        ajaxCall.makeCall(displaySubTotal);
        populateOrderSummary(bag);
    }
});

function beforePopulate(data) {
    populateOrderSummary(data.cartItemDTOS);
    displaySubTotal(displaySubTotal(data.cartCost));
}

function displaySubTotal(subTotal) {
    $(".showMore-Price span").text("$" + subTotal);
}

function populateOrderSummary(data) {
    console.log(data)

    $.each(data, function (key, value) {
        $(".summaryItemsContainer").append("" +
            "               <div class=\"summaryItem\">" +
            "                    <div class=\"itemName\">" +
            "                        <img src=\"" + value.image_secure_url + "\">" +
            value.productName + "</div>" +
            "                    <div class=\"itemPrice\">$" +
            +value.productPrice + " x " + value.itemQuantity +
            "                    </div>" +
            "                </div>");
    });
}

$(document).on("click", ".showMoreText", function (e) {
    let container = $(".summaryItemsContainer");
    let self = $(this);
    container.toggle();
    if (container.is(":visible")) {
        self.html("<i class=\"fas fa-shopping-bag\"></i> Hide Order Summary <i class=\"fas fa-chevron-up\"></i>");
    } else {
        self.html("<i class=\"fas fa-shopping-bag\"></i> Show Order Summary <i class=\"fas fa-chevron-down\"></i>");
    }

});