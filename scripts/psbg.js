/* This is meant to store records of past requests--maybe replace with a hashmap of json objects? */
var pastRequests = [];

/* checks to see if the page will be redirected to iboss (10.7.1.210) */
var pageBlockedCB = function(details) {
	alert("detailsurl:" + details.url);
	if(details.statusCode.toString().indexOf("3") === 0){
		/*if(url redirects to iboss){
			 at this point we need to resend the request--get its id! 
			return {cancel: true};
		}*/	
	}
};

/* a function that is to be called onBeforeRequest that saves relevant information that can later be used should the request need to be repeated. */
var saveDestinationsCB = function(details) {
	/* save the urls in pastRequests */
	pastRequests[details.requestId] = details;
};

/* setting up the callbacks on requests and when redirects are possible. */
chrome.webRequest.onHeadersReceived.addListener(pageBlockedCB, {urls: ["<all_urls>"]});
chrome.webRequest.onBeforeRequest.addListener(saveDestinationsCB, {urls: ["<all_urls>"]});