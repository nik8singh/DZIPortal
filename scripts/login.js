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
        $("#resetPassword").show();
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
    $(this).val("Attempting to log in")

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
            window.location.replace("home.html");
        }, error: function () {
            $(".errorMsg").show();
        }
    });
    return false;
});

