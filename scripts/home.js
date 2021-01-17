import ProductPanelGenerator from "./utils/productPanelGenerator.js"
import AjaxCall from "./utils/ajaxCall.js";
import ApiUrls from "./domains/apiUrls.js";

$(document).ready(function () {

    getFeaturedProducts();
});

function getFeaturedProducts() {


    const ajaxCall = new AjaxCall(new ApiUrls().product_url + "vis/list/featured", 'GET');
    ajaxCall.makeCall(populatePopularProducts);
}

function populatePopularProducts(data) {
    const productHtmlGenerator = new ProductPanelGenerator();
    let $popularProductColumn = $(".popular_product_column");
    $.each(data, function (index, elementParent) {
        if ($.isArray(elementParent)) {
            $.each(elementParent, function (index, element) {
                let productHtml = productHtmlGenerator.generate(element);
                $popularProductColumn.append(productHtml);
            });
        }
    });
}


$('#horizon-prev').click(function (event) {
    event.preventDefault();
    let $content = $('.popular_product_column');
    let currentScroll = $content.get(0).scrollLeft;
    if ((currentScroll - 100) > 0) {
        $content.animate({
            scrollLeft: '-=400px'
        }, 200);
    } else {
        $content.animate({
            scrollLeft: '-=30px'
        }, 200);
        $content.animate({
            scrollLeft: '+=30px'
        }, 200);
    }

});

$('#horizon-next').click(function (event) {
    event.preventDefault();

    let $content = $('.popular_product_column');

    let currentScroll = $content.get(0).scrollLeft;
    let scrollWidth = $content.get(0).scrollWidth;
    console.log($content.width() + currentScroll);
    console.log(scrollWidth);
    if (($content.width() + currentScroll) < scrollWidth) {
        $content.animate({
            scrollLeft: '+=400px'
        }, 200);
    } else {
        console.log("end")
        $content.animate({
            scrollLeft: '-=30px'
        }, 200);
        $content.animate({
            scrollLeft: '+=30px'
        }, 200);
    }

});