$(document).ready(function () {
    var menuToggle = $('.hamburger');
    var menuOpen = false;

    // function for checking media query size
    function checkSize() {
        switch ($(".media-query").css("background-color")) {
            case "rgb(255, 0, 0)":
                return "lg";
            case "rgb(0, 128, 0)":
                return "md";
            case "rgb(0, 0, 255)":
                return "sm";
            case "rgb(128, 0, 128)":
                return "xs";
        }
    }

    function loopdipoop(){
        setTimeout(() => {
            console.log(checkSize());
            console.log($(".media-query").css("background-color"))
            loopdipoop()
        }, 1000);
    }
    loopdipoop();

    // Function for opening/closing the menu
    menuToggle.on('click', function () {
        $(this).toggleClass('is-active');
        if (menuOpen) {
            $('#page-wrapper').animate({ marginRight: "0" }, 300);
            $('#side-nav').animate({ width: "0" }, 300);
        } else {
            $('#page-wrapper').animate({ marginRight: "30%" }, 300);
            $('#side-nav').animate({ width: "30%" }, 300);
        }
        menuOpen = !menuOpen;
    });

    var lastScrollTop = 0;
    $("#page-wrapper").bind("scroll", function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            console.log("scroll")
        } else {
            // upscroll code
        }
        lastScrollTop = st;
    });

    function scrollTextPulse(t) {
        $(".scroll-muted").animate({ opacity: t }, 650, function () {
            t === "0.25" ? scrollTextPulse("0.6") : scrollTextPulse("0.25");
        });
    }
    scrollTextPulse("0.25");
});