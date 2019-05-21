$(document).ready(function () {
    var menuToggle = $('#main-toggle');
    var menuOpen = false;

    function closeSideToggle() {
        $("#side-nav-shadow").animate({ opacity: "0" }, 300, function () {
            $("#side-nav-shadow").css({ display: "none" });
        })
        $('#side-nav').animate({ right: "-100%" }, 300);
        $('#side-toggle').toggleClass("is-active");
        menuOpen = !menuOpen;
    }

    function scrollTextPulse(t) {
        $(".scroll-muted").animate({ opacity: t }, 650, function () {
            t === "0.25" ? scrollTextPulse("0.6") : scrollTextPulse("0.25");
        });
    }

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

    // Function for opening/closing the menu
    menuToggle.on('click', function () {
        switch (checkSize()) {
            case "lg":
            case "md":
                $(this).toggleClass('is-active');
                if (menuOpen) {
                    $('#page-wrapper').animate({ marginRight: "0" }, 300);
                    $('#side-nav').animate({ width: "0" }, 300);
                } else {
                    $('#page-wrapper').animate({ marginRight: "30%" }, 300);
                    $('#side-nav').animate({ width: "30%" }, 300);
                }
                menuOpen = !menuOpen;
                break;
            case "sm":
            case "xs":
                $('#side-nav-shadow').css({ display: "block" })
                    .animate({ opacity: "0.5" }, 300);
                $('#side-nav').animate({ right: "0%" }, 300);
                $('#side-toggle').toggleClass("is-active");
                menuOpen = !menuOpen;
                break;
        }
    });

    $("#side-toggle").on("click", () => {closeSideToggle()});
    $("#side-nav-shadow").on("click", () => {closeSideToggle()});

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


    scrollTextPulse("0.25");

});