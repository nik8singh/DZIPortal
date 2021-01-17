export default class ProductPanelGenerator {

    generate(product) {
        let mainImg = "assets/no-img.jpg";
        $.each(product.images, function (index, img) {
            if (img.imagePriority === 1) {
                mainImg = img.image_secure_url;
                return false;
            }
        });
        return "<div class=\"product_pane\">" +
            "     <a href=\"product.html\">" +
            "        <img alt=\"product img\" src=\"" + mainImg + "\">" +
            "        <div class=\"product_name\">" + product.productName +
            "        </div>" +
            "     </a>" +
            "     <div class=\"product_action\">" +
            "       <div>" +
            "           <span class=\"price\">$" + product.productPrice + "</span>" +
            "       </div>" +
            "       <div class=\"product_buttons\">" +
            "           <a class=\"add_wishlist\" href=\"#\" title=\"Add to wishlist\"><i class=\"far fa-heart\"></i> Add to Wishlist</a>" +
            // "        <a class=\"add_bag\" href=\"#\" title=\"Add to Shopping Bag\"><i class=\"fas fa-shopping-bag\"></i></a>" +
            "       </div>" +
            "     </div>" +
            // "  <div class=\"product_rating\">" +
            // "    <i class=\"fas fa-star\" style=\"color: goldenrod\"></i>" +
            // "    <i class=\"fas fa-star\" style=\"color: goldenrod\"></i>" +
            // "    <i class=\"fas fa-star-half-alt\" style=\"color: goldenrod\"></i>" +
            // "    <i class=\"fas fa-star\" style=\"color: #d4d4d4\"></i>" +
            // "    <i class=\"fas fa-star\" style=\"color: #d4d4d4\"></i>" +
            // "  </div>" +
            "</div>";
    }
}