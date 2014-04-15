$(function(){
	chrome.browserAction.onClicked.addListener(function(tab) {
		window.open("index.html", "URLTweetGetter", "width=320, height=" + window.screen.height + ", location=no, menubar=no,toolbar=no, scrollbars=no, resizable=yes");
		
	});
	//setInterval("readTimeLine()", 12000);
});