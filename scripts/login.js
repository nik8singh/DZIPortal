import ApiUrls from "./domains/apiUrls.js";

$(document).ready(function () {
    let $mobileSignUp = $(".mobile_sign_up");

    $(".trigger_popup").click(function () {
        $('.popup-info').show();
    });
    $('.popup-info').click(function () {
        $('.popup-info').hide();
    });
    $('.popupCloseButton').click(function () {
        $('.popup-info').hide();
    });

    $(".togglePassword").on("click", function (event) {
        // toggle the type attribute
        let $pw = $(this).parent().find($("input"));
        const type = $pw.attr('type') === 'password' ? 'text' : 'password';
        $pw.attr('type', type);
        // toggle the eye slash icon
        this.classList.toggle('fa-eye-slash');
    });

    $(".forgotPassword").on("click", function (event) {
        hideLogin("Forgot Password");
        $("#forgotPassword").show();
    });

    $(".createNewAccount").on("click", function (event) {
        hideLogin("Create account");
        $("#newAccount").show();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    function hideLogin(newHeading) {
        let $loginForm = $("#login");
        $loginForm.parent().find("h2").text(newHeading)
        $loginForm.hide();
        $mobileSignUp.text("");
    }

    $(".backToSignIn").on("click", function (event) {
        let $heading = $(".login-container h2");
        $heading.parent().find("h2").text("Sign-in")
        $("#resetPassword").hide();
        $("#newAccount").hide();
        $("#forgotPassword").hide();
        $("#login").show();
        $mobileSignUp.text("New Customer?");
    });

    $mobileSignUp.on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});

function make_base_auth(user, password) {
    const tok = user + ':' + password;
    const hash = btoa(tok);
    return "Basic " + hash;
}

$("#login").on("submit", function (event) {
    event.preventDefault();
    $(".errorMsg").hide();
    $(this).prepend("<div hidden id=\"loading\">\n" +
        "    <img alt=\"Loading...\" id=\"loading-image\" src=\"assets/Ripple-loading.gif\"/>\n" +
        "</div>")

    let username = $("#username").val();
    let data = make_base_auth(username, $("#password").val());

    $.ajax({
        url: new ApiUrls().login_url,
        type: 'POST',
        header: {
            "Authorization": data
        },
        data: $('form[name=login]').serialize(),
        contentType: 'application/x-www-form-urlencoded',
        success: function (response) {

            $.cookie("TSS", response, {path: '/'})
            localStorage.setItem("UE", username);

            $.ajax({
                url: new ApiUrls().user_url + "cus/userfirstname?e=" + username,
                type: 'GET',
                dataType: 'text',
                headers: {
                    "Authorization": response
                },
                success: function (res) {
                    localStorage.setItem("FN", res);
                }, error: function (jqXHR, exception) {
                    console.log(jqXHR.status);
                    console.log(exception);
                }, complete: function () {
                    $("#loading").remove();
                    window.location.replace("home.html");
                }
            });

        }, error: function () {
            $("#loginErrorMsg").show();
            $("#loading").remove();
        }

    });
    return false;
});

$("#newAccount").on("submit", function (event) {
    event.preventDefault();
    let msgElement = $("#registerErrorMsg");
    msgElement.hide();

    let new_password = $("#new-account-password").val();
    let password_confirmation = $("#new-account-password-confirmation").val();

    if (new_password !== password_confirmation || password_confirmation === null) {
        $("#registerErrorMsg .message").text("password confirmation doesn't match");
        msgElement.show();
        return;
    }
    let item = {};
    item['userFirstName'] = $("#firstName").val();
    item['userLastName'] = $("#lastName").val();
    item['userEmail'] = $("#new-account-username").val();
    item['userPassword'] = password_confirmation;
    $(this).prepend("<div hidden id=\"loading\">\n" +
        "    <img alt=\"Loading...\" id=\"loading-image\" src=\"assets/Ripple-loading.gif\"/>\n" +
        "</div>")
    console.log(item);
    $.ajax({
        url: new ApiUrls().user_url + "register/save/",
        type: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            $("#registerSuccessMsg").show();
            $('#newAccount')[0].reset();
        },
        error: function (request, error, errorThrown) {
            let msg;
            console.log(errorThrown);
            console.log(request.status);
            console.log(error);
            if (errorThrown === "Found")
                msg = "User already exists with this email";
            else
                msg = "Something went wrong.";

            $("#registerErrorMsg .message").text(msg);
            msgElement.show();

        },
        complete: function () {
            $("#loading").remove();
        }
    });
    return false;
});

$("#forgotPassword").on("submit", function (event) {
    event.preventDefault();
    let msgElement = $("#forgotPasswordMsg");
    msgElement.hide();
    let item = {};
    item['userEmail'] = $("#forgot_username").val();

    $(this).prepend("<div hidden id=\"loading\">\n" +
        "    <img alt=\"Loading...\" id=\"loading-image\" src=\"assets/Ripple-loading.gif\"/>\n" +
        "</div>")

    $.ajax({
        url: new ApiUrls().user_url + "cusacc/pwresetrequest",
        type: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        success: function (response) {
            $("#forgotPasswordMsg .message").text("Instructions to reset your password were sent to your email");
        },
        error: function (request, error, errorThrown) {
        },
        complete: function () {
            $("#forgot_username").val("");
            msgElement.show();
            $("#loading").remove();
        }
    });
    return false;
});

$("#resetPassword").on("submit", function (event) {
    event.preventDefault();
    let passwordConfirmation = $("#password_reset_confirmation");
    let newPassword = $("#new_reset_password");
    let msgElementSuccess = $("#resetPasswordMsgSuccess");
    let msgElementError = $("#resetPasswordMsgError");
    msgElementError.hide();
    msgElementError.hide();

    if (newPassword.val() !== passwordConfirmation.val()) {
        $("#resetPasswordMsgError .message").text("password confirmation doesn't match");
        msgElementError.show();
        return;
    }


    let item = {};
    item['userPassword'] = passwordConfirmation.val();

    let url_string = location.search.substring(1).split("tk=")[1];

    $(this).prepend("<div hidden id=\"loading\">\n" +
        "    <img alt=\"Loading...\" id=\"loading-image\" src=\"assets/Ripple-loading.gif\"/>\n" +
        "</div>")

    $.ajax({
        url: new ApiUrls().user_url + "updatepw/" + url_string,
        type: 'POST',
        data: JSON.stringify(item),
        contentType: 'application/json',
        success: function (response) {
            passwordConfirmation.val("");
            newPassword.val("");

            $("#resetPasswordMsgSuccess .message").text("Password was updated successfully");
            msgElementSuccess.show();
            console.log(response)
        },
        error: function (request, error, errorThrown) {
            $("#resetPasswordMsgError .message").text("Something went wrong. Please try requesting reset email again");
            msgElementError.show();
        },
        complete: function () {
            $("#loading").remove();
        }
    });
    return false;
});