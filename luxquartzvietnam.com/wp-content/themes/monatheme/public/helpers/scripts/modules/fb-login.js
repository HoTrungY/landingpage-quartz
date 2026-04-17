jQuery(document).ready(function($) {
    function statusChangeCallback(response) {
        // Called with the results from FB.getLoginStatus().
        //console.log(response);
        if (response.status === "connected") {
            // Logged into your webpage and Facebook.
            //console.log('connected');
            insert_user(response);
        } else {
            // Not logged into your webpage or we are unable to tell.
            //console.log('not connected');
        }
    }

    $("body .plogin-fb").on("click", "#my-signin1", function(e) {
        e.preventDefault();
        //do the login
        try {
            FB.login(statusChangeCallback, {
                scope: "email,public_profile",
                return_scopes: true,
            });
        } catch (e) {
            $(".custommer-mess.login")
                .html("Đã có lỗi xẩy ra. Vui lòng thử lại sau!")
                .fadeIn(500);
        }
    });

    function insert_user(data) {
        // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        FB.api(
            "/me", {
                fields: "first_name,last_name,email,birthday,gender,name,picture.width(250).height(250)",
            },
            async function(response) {
                let $loading = $(".plogin-fb");
                try {
                    $loading.addClass("loading");
                    jQuery.ajax({
                        url: mona_ajax_url.ajaxURL,
                        type: "post",
                        data: {
                            action: "mona_login_social",
                            form: response,
                            type: "social",
                            social_type: "facebook",
                        },
                        error: function(request) {
                            $loading.removeClass("loading");
                            $(".custommer-mess.login")
                                .html("Đã có lỗi xẩy ra. Vui lòng thử lại sau!")
                                .fadeIn();
                        },
                        beforeSend: function() {
                            $loading.addClass("loading");
                            $(".custommer-mess").html("").fadeOut();
                        },
                        success: function(response) {
                            var $data;
                            $data = jQuery.parseJSON(response);
                            if ($data.status == "success") {
                                window.location.reload();
                            } else {
                                $(".custommer-mess.login").html(result.data.mess).fadeIn();
                                $loading.removeClass("loading");
                            }
                        },
                    });
                } catch (error) {
                    $loading.removeClass("loading");
                    console.log("mona_ajax_call_mfa error:", error.responseText);
                    $(".custommer-mess.login").html(error.responseText).fadeIn(500);
                }
            }
        );
    }
});