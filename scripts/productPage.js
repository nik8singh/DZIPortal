import {parameterFromURL} from "./utils/commonFunctions.js";
import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";
import ProductDomain from "./domains/productDomain.js";

$(document).ready(function () {
    let productID = decodeURI(parameterFromURL("p"))
    let ajaxCall = new AjaxCall(new ApiUrls().product_url + "vis/p/" + productID, 'GET', 'json');
    ajaxCall.makeCall(populatePage);
});

$(document).on("click", ".dropdown-content a", function (e) {
    let self = $(this);
    $(".quantity").text((self.text()));
});

function populatePage(data) {
    let productDomain = new ProductDomain(data);
    console.log(productDomain);
    productDomain.populateProductPage();

}

$(document).on("click", ".image-thumbnails img", function (e) {
    let self = $(this);
    $(".image-active").html("<img src=\"" + $(this).attr('src') + "\">");
});