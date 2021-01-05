$(document).ready(function () {
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
    });

    function hideLogin(newHeading) {
        let $loginForm = $("#login");
        $loginForm.parent().find("h2").text(newHeading)
        $loginForm.hide();
    }

    $(".backToSignIn").on("click", function (event) {
        let $heading = $(".login-container h2");
        $heading.parent().find("h2").text("Sign-in")
        $("#resetPassword").hide();
        $("#newAccount").hide();
        $("#login").show();
    });
});