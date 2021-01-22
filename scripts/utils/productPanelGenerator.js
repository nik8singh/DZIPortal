export default class ProductPanelGenerator {

    getMainImage(images) {
        let imgUrl = "assets/no-img.jpg";
        $.each(images, function (index, img) {
            if (img.imagePriority === 1) {
                imgUrl = img.image_secure_url;
                return false;
            }
        });
        return imgUrl;
    }

    generate(product, shopPanel = false) {
        console.log(product)
        return "<div class=\"" + (shopPanel ? 'shop_product_pane' : 'product_pane') + "\">" +
            "     <a href=\"product.html?p=" + product.productId + "\">" +
            "        <img alt=\"product img\" src=\"" + (shopPanel ? product.image_secure_url : this.getMainImage(product.images)) + "\">" +
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