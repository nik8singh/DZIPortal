export default class AjaxCall {

    constructor(url, type, dataType, data, contentType, processData = true) {
        this.url = url;
        this.type = type;
        this.dataType = dataType;
        this.data = data;
        this.contentType = contentType;
        this.processData = processData;
    }

    makeCall(callback, completedCallback) {
        console.log(this.url)
        console.log(this.data)
        $.ajax({
            url: this.url,
            type: this.type,
            dataType: this.dataType,
            data: this.data,
            contentType: this.contentType,
            processData: this.processData,
            headers: {
                "Authorization": $.cookie("TSS")
            },
            success: callback,
            error: function (requestObject, error, errorThrown) {

                if (~requestObject.responseText.indexOf("JWTAuthorizationFilter") || errorThrown === "Forbidden")
                    window.location.replace("../errors/403.html");

                console.log(requestObject.responseText, error, errorThrown)

            },
            complete: completedCallback
        });
    }
}