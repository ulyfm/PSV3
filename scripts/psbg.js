/* This is meant to store records of past requests--maybe replace with a hashmap of json objects? */
var pastRequests = [];

function domain(url) {
    var d;
    if (url.indexOf("://") > -1) {
        d = url.split('/')[2];
    }
    else {
        d = url.split('/')[0];
    }
    d = d.split(':')[0];
    return d;
}

/* checks to see if the page will be redirected to iboss (10.7.1.210) */
var headerReceived = function(details) {
	console.log(domain(details.url) + " . 1:" + details.requestId + "," + details.url);
	if(((details.statusCode + "").indexOf("3") == 0)){
		console.log(domain(details.url) + " . 2:" + details.requestId);
		pastRequests[details.requestId] = details;
	}else if(details.requestId in pastRequests){
		console.log(domain(details.url) + " . 3:" + details.requestId);
		if(domain(details.url) === "10.7.1.210"){
			console.log("GREAT SUCCESS 1");
		}
	}
};

var obfcb = function(details) {
	console.log(domain(details.url) + " . 4:" + details.requestId + "," + details.url);
	if(details.requestId in pastRequests){
		console.log(domain(details.url) + " . 5: " + details.requestId);
		if(domain(details.url) === "10.7.1.210"){
			console.log("GREAT SUCCESS 2, redirecting to: " + pastRequests[details.requestId].url);
			return {redirectUrl: (pastRequests[details.requestId].url)};
		}
	}
};

/* setting up the callbacks on requests and when redirects are possible. */
chrome.webRequest.onHeadersReceived.addListener(headerReceived, {urls: ["<all_urls>"]}, ["responseHeaders", "blocking"]);
chrome.webRequest.onBeforeRequest.addListener(obfcb, {urls: ["<all_urls>"]}, ["blocking"]);
