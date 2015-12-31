$(window).load(function() {
    $("#menu").sticky({topSpacing: 0});
});

$(function() {
    var windowH = $(window).height();
    var bannerH = $('#banner').height();
    if (windowH > bannerH) {
        $('#banner').css({'height': ($(window).height() - 68) + 'px'});
        $('#bannertext').css({'height': ($(window).height() - 68) + 'px'});
    }
    $(window).resize(function () {
        var windowH = $(window).height();
        var bannerH = $('#banner').height();
        var differenceH = windowH - bannerH;
        var newH = bannerH + differenceH;
        var truecontentH = $('#bannertext').height();
        if (windowH < truecontentH) {
            $('#banner').css({'height': (newH - 68) + 'px'});
            $('#bannertext').css({'height': (newH - 68) + 'px'});
        }
        if (windowH > truecontentH) {
            $('#banner').css({'height': (newH - 68) + 'px'});
            $('#bannertext').css({'height': (newH - 68) + 'px'});
        }
    })
});

$(document).ready(function () {
    $(document).on("scroll", onScroll);
    $('.page_scroll').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    var scrollPosition = $(document).scrollTop();
    $('.nav li a').each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr("href"));
        if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
            $('.nav li a').removeClass("active");
            currentLink.addClass("active");
        } else {
            currentLink.removeClass("active");
        }
    });
}

$('#modal [type="submit"]').on('click', function() {
    $('#modal .close').click();
}) 