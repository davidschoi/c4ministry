// Tumblr API
function loadPosts() {
    var key = "api_key=USV2JcShmHgoYysSrXKL1OyzmouVcG3PxCtAJ0OT8rGkSkuGNR";
    var api = "https://api.tumblr.com/v2/blog/c4ministry.tumblr.com/";
    var retrieve_more = function(offset) {
        $.getJSON(api + "posts/text?callback=?&filter=text&offset=" + offset + "&" + key,function(data) {
            $.each(data.response.posts, function(i, item) {
                var date = new Date(item.date).toISOString();
                var momentDate = moment(date).tz('America/Los_Angeles').format('MMMM Do YYYY, h:mm:ss a');
                var postUrl = item.post_url;
                var title = item.title;
                var body = item.body;
                $("#tumblr").append('<li>' +
                    '<h3><a href="' + postUrl + '" target="blank">' + title + '</a></h3>' +
                    '<p class="date">' + momentDate + '</p>' + 
                    '<p class="body">' + body.substring(0,500) + '...' + '</p>' +
                    '<p><a class="btn btn-info" href="' + postUrl + '" target="blank">' + 'Read More' + '</a></p>' +
                '</li>')
            });
        });
    };
    retrieve_more(0);
}
loadPosts();