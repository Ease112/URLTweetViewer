function Twitter() {}
Twitter.prototype = {
        consumerKey:    "",
        consumerSecret: "",
        accessToken:    "",
        tokenSecret:    ""
};
Twitter.prototype.get = function(api, content) {
    var accessor = {
        consumerSecret: this.consumerSecret,
        tokenSecret: this.tokenSecret
    };
 
    var message = {
        method: "GET",
        action: api,
        parameters: {
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: this.consumerKey,
            oauth_token: this.accessToken
        }
    };
    for (var key in content) {
        message.parameters[key] = content[key];
    }
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);
 
    var options = {
        type: message.method,
        url: target,
        dataType: "jsonp",
        jsonp: false,
        cache: true
    };
    $.ajax(options);
}
 
var twitter = new Twitter();
 
function update(data){
	var user;
	var screen_name = "";
	var name = "";
	var profile_image_url = "";
	var tweet = "";
	var urls;
	var date = "";
    for(var i=0; i<data.length; i++) {
    	user = data[i].user;
    	screen_name = user.screen_name;
    	name = user.name;
    	profile_image_url = user.profile_image_url;
    	tweet = data[i].text;
    	urls = data[i].entities.urls;
    	date = data[i].created_at;
    	if(filter(urls)) {
    		show(
    			screen_name,
    			name,
    			profile_image_url,
    			tweet,
    			urls,
    			date
    		);
    	}
    }
}

function filter(urls) {
	var result = false;
	if(urls.length > 0) {
    	var notTwitpic = 0;
    	for(var j=0; j<urls.length; j++) {
    		if(urls[j].display_url.indexOf("twitpic.com") == -1)
    			notTwitpic++;
    	}
    	if(notTwitpic > 0)
    		result = true;
    	else
    		result = false;
    }
    return result;
}

function show(screen_name, name, profile_image_url, tweet, urls, date){
	var tweetDate = new Date(date);
	$("#timeline").append(
		"<table>" + 
			"<tr><td colspan='2'>" + name + "　-　" + screen_name + "</td></tr>" +
			"<tr><td><img src='" + profile_image_url + "' width='40'></td><td>" + tweet.replace(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g, "<a href='#' class='disp'>$&</a>") +"</td></tr>" +
			"<tr><td colspan='2'><p>" + tweetDate.getFullYear()+"/"+(tweetDate.getMonth()+1)+"/"+tweetDate.getDate()+" "+tweetDate.getHours()+":"+tweetDate.getMinutes() + "</p></td></tr>" +
		"</table>"
	);
}

function disp(url) {
	if(!window.opener || window.opener.closed){
		window.alert('The main window is not found');
	} else{
		window.opener.open(url);
	}
}

function readTimeLine(){
	$("#timeline").children().remove();
	var content = {count: "200", callback: "update"};
    twitter.get("https://api.twitter.com/1.1/statuses/home_timeline.json", content);
}

$(function(){
	
	readTimeLine();
    setInterval("readTimeLine()", 120000);
    
    $(document).on("click",".disp",function(e) {
    	e.stopPropagation();
		if(!window.opener || window.opener.closed)
			window.open($(this).text(),"URL", "width=" + window.screen.width + ", height=" + window.screen.height);
		else
			window.opener.open($(this).text());
    });
});