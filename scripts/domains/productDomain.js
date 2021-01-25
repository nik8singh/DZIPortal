export default class ProductDomain {

    constructor(rawData) {
        if (rawData !== null) {
            this.id = rawData.productId;
            this.sku = rawData.productSku;
            this.name = rawData.productName;
            this.weight = rawData.productWeight;
            this.weightUnit = rawData.weightUnit;
            this.price = rawData.productPrice;
            this.currency = rawData.productCurrency;
            this.quantity = rawData.productQuantity;
            this.quantityType = rawData.productQuantityType;
            this.onFeatured = rawData.productOnFeatured;
            this.expense = rawData.productExpense;
            this.description = rawData.productDescription;
            this.published = rawData.productPublished;
            this.jewelryType = rawData.jewelryType.jewelryTypeName;
            this.images = rawData.images;
            this.gemstones = [];
            this.metals = [];

            let self = this;
            $.each(rawData.gemstones, function (index, gem) {
                self.gemstones.push(gem.gemstoneName);
            });

            $.each(rawData.metals, function (index, met) {
                self.metals.push(met.metalName);
            });
        }
    }

    populateProductPage() {
        $(".product-name h2").text(this.name);
        $(".product-price span").text("$" + this.price);
        $(".product-gemstones span").text(this.gemstones.join(", "));
        $(".product-metals span").text(this.metals.join(", "));
        $(".product-type span").text(this.jewelryType);
        $(".product-weight span").text(this.weight + " " + this.weightUnit);
        $(".product-sku span").text(this.sku);
        $(".product-description p").html(this.description);
        let mainImg = "assets/no-img.jpg";
        let lowestPriority = 100;
        $.each(this.images, function (index, img) {
            $(".image-thumbnails").append("<a class=\"img-thumb\" style='order:" + img.imagePriority + "'><img alt='" + img.image_tags + "' src=\"" + img.image_secure_url + "\"></a>");
            if (lowestPriority > img.imagePriority) {
                lowestPriority = img.imagePriority;
                mainImg = img.image_secure_url;
            }
        });
        $(".image-active").html("<img src=\"" + mainImg + "\">")
    }


}