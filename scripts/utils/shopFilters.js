import AjaxCall from "./ajaxCall.js";
import ApiUrls from "../domains/apiUrls.js";
import {parameterFromURL} from "./commonFunctions";

export default class ShopFilters {
    constructor() {
        this.threeFiltersPopulatedFlag = 0;
    }

    populateShopFilters() {
        new AjaxCall(new ApiUrls().jt_url + "vis/list/active/-1", 'GET').makeCall(this.populateFilters, this.filtersCompleted);
        new AjaxCall(new ApiUrls().gemstone_url + "vis/list/active/-1", 'GET').makeCall(this.populateFilters, this.filtersCompleted);
        new AjaxCall(new ApiUrls().metal_url + "vis/list/active/-1", 'GET').makeCall(this.populateFilters, this.filtersCompleted);
    }

    populateFilters(data) {
        let $optionsClass = null, selectCheckbox = decodeURI(parameterFromURL("s")), checkedFlag = false;
        $.each(data, function (key, elementParent) {
            if ($.isArray(elementParent)) {
                $optionsClass = $("." + key + " .filterDivBoth");
                let i = 0;
                $.each(elementParent, function (index, element) {
                    let value = null;
                    $.each(element, function (index, key) {

                        if (index.includes("jewelryTypeId"))
                            value = key

                        if (index.includes("Name")) {

                            let hide = "", checkorNot = "";

                            if (value == null)
                                value = key;

                            if (value.toString() === selectCheckbox) {
                                checkorNot = "checked"
                                checkedFlag = true;
                            }

                            if (i > 3)
                                hide = "hidden";

                            let check = "<label class=\"checkbox\" " + hide + ">" +
                                "               <input type=\"checkbox\"  value=\"" + value + "\" " + checkorNot + "/>" +
                                "                <span>" + key + "</span>" +
                                "            </label>";

                            $optionsClass.append(check);
                            return false;
                        }

                    });

                    i++;

                });
            }
        });

        if (checkedFlag)
            this.toggleSeeMoreFilter($optionsClass.parent().find('.seeFilter'));

    }

    filtersCompleted() {
        this.threeFiltersPopulatedFlag++;
        if (this.threeFiltersPopulatedFlag === 3)
            callToPopulate();
    }

    toggleSeeMoreFilter(self) {
        let $filterOptions = self.parent().find(".filterOptions");
        if ($filterOptions.hasClass("filterOptionsShort")) {
            $filterOptions.removeClass("filterOptionsShort").addClass("filterOptionsLong");
            self.html("<i class=\"fas fa-sort-up\"></i> See Less");
            $filterOptions.find(".checkbox").show();


        } else {
            $filterOptions.removeClass("filterOptionsLong").addClass("filterOptionsShort");
            self.html("<i class=\"fas fa-sort-down\"></i> See More");
            $filterOptions.find(".checkbox:gt(3)").hide();
        }

    }
}