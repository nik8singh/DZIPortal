import {parameterFromURL, updateBagCountDisplay} from "./utils/commonFunctions.js";
import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";
import ProductDomain from "./domains/productDomain.js";

let productID;
let productDomain;
$(document).ready(function () {
    productID = decodeURI(parameterFromURL("p"))
    let ajaxCall = new AjaxCall(new ApiUrls().product_url + "vis/p/" + productID, 'GET', 'json');
    ajaxCall.makeCall(populatePage);
});

$(document).on("click", ".dropdown-content a", function (e) {
    let self = $(this);
    $(".quantity").text((self.text()));
});

function populatePage(data) {
    productDomain = new ProductDomain(data);
    productDomain.populateProductPage();

}

$(document).on("click", ".image-thumbnails img", function (e) {
    $(".image-active").html("<img src=\"" + $(this).attr('src') + "\">");
});

$(document).on("click", ".addToBag", function (e) {
    let item = {};
    item["itemQuantity"] = $(".quantity").text();
    item["productId"] = productID;

    if (typeof $.cookie('TSS') !== 'undefined') {

        item["userId"] = $.cookie('UI');
        let ajaxCall = new AjaxCall(new ApiUrls().cart_url + "cus/save", 'POST', 'json', JSON.stringify(item), 'application/json');
        ajaxCall.makeCall(setCount);

    } else {
        item["image_secure_url"] = $(".image-active img").prop("src");
        item["productName"] = $(".product-name h2").text();
        let price = $(".product-price span").text();
        item["productPrice"] = price.substring(1, price.length)
        let bag = [], flag = false;
        let count = parseInt(localStorage.getItem("bagCount"));

        if (localStorage.getItem("bagCount") !== null) {
            bag = JSON.parse(localStorage.getItem("bagContent"));

            $.each(bag, function (key, value) {
                if (value.productId === item.productId) {
                    value.itemQuantity = (parseInt(item.itemQuantity) + parseInt(value.itemQuantity)).toString();
                    flag = true;
                    return false;
                }
            });

            count += parseInt(item.itemQuantity);
        } else {
            count = item.itemQuantity;
        }

        if (!flag)
            bag.push(item)

        console.log(item);
        console.log(bag);

        localStorage.setItem("bagContent", JSON.stringify(bag));
        localStorage.setItem("bagCount", count.toString());

        showBagCount();
    }
});

function setCount(data) {
    localStorage.setItem("bagCount", data.totalQuantity);
    showBagCount();
}

function showBagCount() {
    $(".message").show();
    updateBagCountDisplay();
}