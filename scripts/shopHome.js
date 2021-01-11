$(document).ready(function () {


});

$(document).on("click", ".category_title", function (e) {
    let icon = $(this).find("i"), listDiv = $(this).next(".product-list-panel");

    console.log(listDiv)

    if (icon.hasClass("fa-plus")) {
        icon.removeClass("fa-plus").addClass("fa-minus")
        listDiv.css("display", "flex");
    } else {
        icon.removeClass("fa-minus").addClass("fa-plus");
        listDiv.css("display", "none");
    }

});

function expandCollapse(self) {

}