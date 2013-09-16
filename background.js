window.onload = function(){chrome.browserAction.onClicked.addListener(function(tab) {
	 window.open("index.html", "URLTweetViewer", "width=320, height=" + window.screen.height + ", location=no, menubar=no,toolbar=no, scrollbars=no, resizable=yes");
});}