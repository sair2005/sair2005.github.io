$(document).ready(function() {
    // Debounce Function
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Navbar shrink
    $(window).on("scroll", debounce(function() {
        $(".navbar").toggleClass("navbar-shrink", $(this).scrollTop() > 90);
    }, 100));

    // Parallax Effect
    if ($('#parallax').length) {
        new Parallax(document.getElementById('parallax'));
    }

    // Skills bar
    $(window).on("scroll", debounce(function() {
        let $skillWrapper = $("#skill-bar-wrapper");
        if (!$skillWrapper.length) return;

        let hT = $skillWrapper.offset().top,
            hH = $skillWrapper.outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();

        if (wS > (hT + hH - 1.4 * wH)) {
            $('.skillbar-container .skills').each(function() {
                $(this).animate({ width: $(this).data('percent') }, 2000);
            });
        }
    }, 100));

    // Filter buttons
    $('.img-gallery .sortBtn .filter-btn').on("click", function(e) {
        e.preventDefault();
        let selector = $(this).data('filter');
        $('.img-gallery .grid').isotope({ filter: selector });
        $(this).addClass('active').siblings().removeClass('active');
    });

    // Magnific Popup
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    // Owl Carousel
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    // Navbar collapse on click
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    });

    // Smooth scrolling
    $.scrollIt({
        topOffset: -50
    });
});
