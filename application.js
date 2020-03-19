// AJAX Load Components
// -----------------------------
$('#header').load('components/header.html');
$('#footer').load('components/footer.html');
$('#modal').load('components/modal.html');

$(document).ready(function () {
    $(document).ajaxComplete(function () {

        // Sticky
        // -----------------------------
        $("#menu").sticky();

        if ($('#banner').length) {
            $(function () {
                var windowH = $(window).height();
                var bannerH = $('#banner').height();
                if (windowH > bannerH) {
                    $('#banner').css({ 'height': ($(window).height() - 126) + 'px' });
                    $('#bannertext').css({ 'height': ($(window).height() - 126) + 'px' });
                }
                $(window).resize(function () {
                    var windowH = $(window).height();
                    var bannerH = $('#banner').height();
                    var differenceH = windowH - bannerH;
                    var newH = bannerH + differenceH;
                    var truecontentH = $('#bannertext').height();
                    if (windowH < truecontentH) {
                        $('#banner').css({ 'height': (newH - 126) + 'px' });
                        $('#bannertext').css({ 'height': (newH - 126) + 'px' });
                    }
                    if (windowH > truecontentH) {
                        $('#banner').css({ 'height': (newH - 126) + 'px' });
                        $('#bannertext').css({ 'height': (newH - 126) + 'px' });
                    }
                })
            });
        }

        // Modal
        // -----------------------------
        $('#modal [type="submit"]').on('click', function () {
            $('#modal .close').click();
        })
    });
});

// Smooth Scrolling
// -----------------------------
$('a.page-scroll').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});

// Medium
// -----------------------------
if ($('#blog').length) {
    $(function () {
        var $content = $('#jsonContent');
        var data = {
            rss_url: 'https://medium.com/feed/@browncoatsdp'
        };
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
            if (response.status == 'ok') {
                var output = '';
                $.each(response.items, function (k, item) {
                    var visibleSm;
                    if (k < 3) {
                        visibleSm = '';
                    } else {
                        visibleSm = ' visible-sm';
                    }
                    var pubDate = new Date(item.pubDate);
                    output += '<div class="col-sm-6 col-md-4' + visibleSm + '">';
                    output += '<div class="blog-post"><header>';
                    output += '<h4 class="date">' + pubDate.getDate() + '<br>' + monthNames[pubDate.getMonth()] + '</h4>';
                    var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                    var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                    var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                    var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                    var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                    // output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="240px"></div></header>';
                    output += '<div class="blog-content"><h4><a target="_blank" href="' + item.link + '">' + item.title + '</a></h4>';
                    output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
                    var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
                    var maxLength = 120 // maximum number of characters to extract
                    //trim the string to the maximum length
                    var trimmedString = yourString.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    output += '<p>' + trimmedString + '...</p>';
                    output += '</div></div></div>';
                    return k < 3;
                });
                $content.html(output);
            }
        });
    });
}

// Tumblr
// -----------------------------
if ($('#blog-archive').length) {
    function loadPosts() {
        var key = "api_key=USV2JcShmHgoYysSrXKL1OyzmouVcG3PxCtAJ0OT8rGkSkuGNR";
        var api = "https://api.tumblr.com/v2/blog/c4ministry-blog.tumblr.com/";
        var retrieve_more = function (offset) {
            $.getJSON(api + "posts/text?callback=?&filter=text&offset=" + offset + "&" + key, function (data) {
                $.each(data.response.posts, function (i, item) {
                    moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');
                    var date = new Date(item.date).toISOString();
                    var momentDate = moment(date).tz('America/Los_Angeles').format('MMMM Do, YYYY');
                    var postUrl = item.post_url;
                    var title = item.title;
                    var body = item.body;
                    $("#tumblr").append('<li>' +
                        '<h3><a href="' + postUrl + '" target="blank">' + title + '</a></h3>' +
                        '<p class="title">' + 'Pastor DP - ' + '<em>' + momentDate + '</em></p>' +
                        '<p class="body">' + body.substring(0, 500) + '...' + '</p>' +
                        '<p><a class="btn btn-info" href="' + postUrl + '" target="blank">' + 'Read More' + '</a></p>' +
                        '</li>')
                });
            });
        };
        retrieve_more(0);
    }
}

// MixCloud
// -----------------------------
if ($('#sermon').length) {
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: encodeURI('https://api.mixcloud.com/c4ministry/cloudcasts/?limit=100'),
            dataType: 'jsonp',
            success: function (res) {
                var slugArray = [];
                for (var i = 0; i < res.data.length; i++) {
                    slugArray.push(res.data[i].slug);
                }
                var dataTable = $('#mixcloud-table').DataTable();

                $.each(slugArray, function (i, slug) {
                    $.ajax({
                        type: 'GET',
                        url: encodeURI('https://api.mixcloud.com/c4ministry/' + slug + '/'),
                        async: false,
                        dataType: 'jsonp',
                        success: function (res) {
                            var date = "Date: ";
                            var scripture = "Scripture: ";
                            var speaker = "Speaker: ";
                            var des = res.description;

                            var desDate = des.substring(des.indexOf(date) + date.length, des.indexOf("| " + scripture));
                            var desScripture = des.substring(des.indexOf(scripture) + scripture.length, des.indexOf("| " + speaker));
                            var desSpeaker = des.substring(des.indexOf(speaker) + speaker.length);

                            dataTable.row.add([desDate, res.name, desScripture, desSpeaker]).draw();
                        }
                    });
                });
                $('#mixcloud-table th')[0].click();
                $('#mixcloud-embed').html('<iframe width="100%" height="120" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fc4ministry%2F' + res.data[0].slug + '%2F" frameborder="0"></iframe>');
            }
        });
    });
}

$(document).on('click', '#mixcloud-table tr', function () {
    var sermonTitle = $(this).children('td:nth-child(2)').text().replace(/[^A-Za-z0-9\s]/g, "").replace(/\s{2,}/g, " ").replace(/\s+/g, '-').toLowerCase();
    $('#mixcloud-embed iframe').attr('src', 'https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=%2Fc4ministry%2F' + sermonTitle + '%2F');
})

// Cleanup Table
// -----------------------------
if ($('.cleanup').length) {
    var cleanupDatesArray = $('.cleanup table tr td.cleanup-date');
    var cleanupStatusArray = $('.cleanup table tr td.cleanup-status')
    $.each(cleanupDatesArray, function () {
        var dateText = $(this).text();
        if (new Date(dateText) < new Date()) {
            $(this).siblings('.cleanup-status').addClass('success').text('COMPLETED');
        } else {
            $(this).siblings('.cleanup-status').addClass('warning').text('PENDING');
        }
    });

    $('.cleanup-status.warning').first()
        .removeClass('warning')
        .html('<a class="page-scroll" href="#cleanup">CLEANUP INSTRUCTIONS</a>')
        .parent().addClass('danger');
}

// Events Calendar
// -----------------------------
var API_KEY = 'AIzaSyClI00QamBabQuqnt-FLGHkXbOHZVI5NGY';
var calendarId = '0rm2tpg2mag9k28obk2b2dein4@group.calendar.google.com';

$.ajax({
    type: 'GET',
    url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + API_KEY),
    dataType: 'json',
    success: function (response) {
        // console.log(response);
    },
    error: function (error) {
        // console.log(error);
    }
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Google Analytics
// -----------------------------
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-53415604-2', 'auto');
ga('send', 'pageview');
