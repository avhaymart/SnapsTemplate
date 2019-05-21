let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(document).ready(function () {
    const pages = ["#hero-section", "#about-section", "#info-section", "#contact-section"]
    const gradients = [".hero-gradient", ".about-gradient", ".info-gradient", ".contact-gradient"]
    const images = ["./img/hero.jpg", "./img/about.jpg", "./img/info.jpg", "./img/contact.jpg"]
    const menuToggle = $('#main-toggle');
    let menuOpen = false;
    let currentPage = 0;


    let scrollThrottle = _.throttle(function (direction) {
        // this is where code goes
        switch (direction) {
            case "up":
                if (currentPage === 3) {
                    setTimeout(() => {
                        $(".scroll-muted").css({ display: "block" });
                    }, 500);
                }
                if (currentPage != 0) {
                    changePages(direction);
                }
                break;
            case "down":
                if (currentPage < 3) {
                    $(".scroll-muted").css({ display: "none" });
                    if (currentPage !== 2) {
                        setTimeout(() => {
                            $(".scroll-muted").css({ display: "block" });
                        }, 500);
                    }
                    changePages(direction)
                }
                break;
        }
    }, 1000, { trailing: false });

    // For closing the menu when the page is sm or xs
    // because sm or xs has a different button for the menu
    function closeSideToggle() {
        $("#side-nav-shadow").animate({ opacity: "0" }, 300, function () {
            $("#side-nav-shadow").css({ display: "none" });
        })
        $('#side-nav').animate({ right: "-100%" }, 300);
        $('#side-toggle').toggleClass("is-active");
        menuOpen = !menuOpen;
    }

    // For making the scroll text pulse c:
    function scrollTextPulse(t) {
        $(".scroll-muted").animate({ opacity: t }, 650, function () {
            t === "0.25" ? scrollTextPulse("0.6") : scrollTextPulse("0.25");
        });
    }

    // Probably needs work
    function changePages(direction) {
        switch (direction) {
            case "up":
                $(pages[currentPage]).animate({ top: "100%", opacity: 0 }, 700);
                $(pages[currentPage - 1]).animate({ top: "0", opacity: 1 }, 700);
                $(gradients[currentPage]).animate({ opacity: 0 }, 700);
                $(gradients[currentPage - 1]).animate({ opacity: 1 }, 700);
                $(".background-image").animate({ opacity: 0 }, 350, function () {
                    $(".background-image").css({ backgroundImage: `url(${images[currentPage - 1]})` })
                    currentPage--;
                });
                $(".background-image").animate({ opacity: 1 }, 350);
                break;
            case "down":
                $(pages[currentPage]).animate({ top: "-100%", opacity: 0 }, 700);
                $(pages[currentPage + 1]).animate({ top: "0", opacity: 1 }, 700);
                $(gradients[currentPage]).animate({ opacity: 0 }, 700);
                $(gradients[currentPage + 1]).animate({ opacity: 1 }, 700);
                $(".background-image").animate({ opacity: 0 }, 350, function () {
                    $(".background-image").css({ backgroundImage: `url(${images[currentPage + 1]})` })
                    currentPage++;
                });
                $(".background-image").animate({ opacity: 1 }, 350);
                break;
        }
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

    $("#side-toggle").on("click", () => { closeSideToggle() });
    $("#side-nav-shadow").on("click", () => { closeSideToggle() });

    // For handling scroll events.
    // mousewheel is used instead of scroll because
    // the page doesn't have any content to scroll through...
    // so technically the page isn't scrolling
    $('#top-wrapper').bind('mousewheel', function (e) {
        if (e.originalEvent.wheelDelta / 120 > 0) {
            scrollThrottle("up");
        } else {
            scrollThrottle("down");
        }
    });

    // For mobile compatibility
    $("#top-wrapper").swipe({
        swipe: function (event, direction) {
            if (direction === "up" || direction == "down") {
                direction === "up" ? scrollThrottle("down") : scrollThrottle("up")
            }
        },
        threshold: 75
    });

    // call the scrolltextpulse
    scrollTextPulse("0.25");
});