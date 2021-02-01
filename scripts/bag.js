import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";

$(document).ready(function () {
    if (typeof $.cookie('TSS') !== 'undefined') {
        let userId = $.cookie('UI');
        let ajaxCall = new AjaxCall(new ApiUrls().cart_url + "cus/list/" + userId, 'GET', 'json');
        ajaxCall.makeCall(populatePage);
    } else {
        let bag = JSON.parse(localStorage.getItem("bagContent"));
        populatePage(bag);
    }
});

function populatePage(data) {
    console.log(data)
    let subTotal = null;
    let tq = null;


    if (typeof $.cookie('TSS') !== 'undefined') {
        tq = data.totalQuantity;
        subTotal = data.cartCost;
        data = data.cartItemDTOS;

    }
    addItemRow(data, subTotal, tq);
}


function addItemRow(data, subTotal, totalQuantity) {
    let bagSide = $(".bagSide")
    let st = 0, tq = 0;

    if (data.length === 0) {
        bagSide.append("<div style=\"margin: 20px\">\n" +
            "                Your bag is empty. Explore our <a href=\"shop.html?s=rdm&t=all\" style=\"color: #003bff; text-decoration: underline\">shop</a> or make a <a style=\"color: #003bff; text-decoration: underline\"href=\"customize.html\">custom order</a>\n" +
            "            </div>");
        $(".checkoutButton").remove();
    }

    $.each(data, function (key, value) {
        if (subTotal === null) {
            st += parseFloat(value.productPrice);
            tq += parseInt(value.itemQuantity);
        }
        let bagItem = "<div class=\"bagItem\" id=\"" + value.cartItemId + "\">\n" +
            "                <img src=\"" + value.image_secure_url + "\" class=\"cart-product-image\">\n" +
            "                <div class=\"bag-item-details\">\n" +
            "                    <div class=\"bag-item-info\">\n" +
            "                        <a class=\"bag-item-title\" href=\"product.html?p=4\" id=\"" + value.productId + "\">\n" +
            value.productName +
            "                        </a>\n" +
            "                        <div class=\"bag-item-options\">\n" +
            "                            <div class=\"dropdown quantityDP\">\n" +
            "                                <a>Qty: <span class=\"quantity\">" + value.itemQuantity + "</span> <i class=\"fas fa-sort-down\"></i></a>\n" +
            "                                <div class=\"dropdown-content\">\n" +
            "                                    <a>1</a>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                            <div class=\"delete-from-bag\">\n" +
            "                                <a class=\"deleteFromBag\">Delete</a>\n" +
            "                            </div>\n" +
            "                            <div class=\"wish-from-bag\">\n" +
            "                                <a>Move to Wishlist</a>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                    <div class=\"bag-item-price\">\n" +
            "$" + value.productPrice +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";

        bagSide.append(bagItem);
    });

    if (subTotal === null) {
        subTotal = st;
        totalQuantity = tq;
    }
    $(".totalItems").text("(" + totalQuantity + " items)");
    $(".subtotalPrice").text("$" + subTotal);
}

$(document).on("click", ".deleteFromBag", function (e) {
    let item = {};
    item["cartItemId"] = $(this).closest(".bagItem").prop("id");
    item["productId"] = $(this).parent().parent().parent().find(".bag-item-title").prop("id");
    console.log(item["productId"])

    if (typeof $.cookie('TSS') !== 'undefined') {
        item["userId"] = $.cookie('UI');
        let ajaxCall = new AjaxCall(new ApiUrls().cart_url + "cus/delete", 'POST', 'json', JSON.stringify(item), 'application/json');
        ajaxCall.makeCall(showBagCount);

    } else {

        let count = parseInt(localStorage.getItem("bagCount"));
        let bag = JSON.parse(localStorage.getItem("bagContent"));
        let minusCount = 0;

        $.each(bag, function (key, value) {
            console.log(value.productId, item["productId"])
            if (value.productId === item["productId"]) {
                minusCount = parseInt(value.itemQuantity);
                bag.splice(key, 1);
                return false;
            }
        });
        count -= minusCount;
        console.log(bag);

        localStorage.setItem("bagContent", JSON.stringify(bag));
        localStorage.setItem("bagCount", count.toString());
        location.reload();
    }
});

function showBagCount(data) {
    localStorage.setItem("bagCount", data.totalQuantity);
    location.reload();
}
