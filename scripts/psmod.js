/* oh wow what a useful utility to generate numbers between (min, max)*/
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* 
mic: min chapter
mac: max chapter
mip: min problem
map: max problem
 */
var mic, mac, mip, map, bip;

/* function that syncs relevant variables

and bypasses *page* filter--not script filter.
*/
chrome.storage.sync.get({
	bip: "10.7.1.210",
	bpf: false
  }, function(items) {
	bip = items.bip;
	if(items.bpf === true && window.location.host === "10.7.1.210"){ /* NOTE TO SELF: MAKE THIS IP CHANGEABLE */
		window.location = 'http://' + document.getElementById('url').innerHTML;
	}
  }
);

/* This is meant to store records of past requests--maybe replace with a hashmap of json objects? */
var pastRequests = [];

/* checks to see if the page will be redirected to iboss (10.7.1.210) */
var pageBlockedCB = function(details) {
	if(details.statusCode % 100 === 3){
		if(url is to fucking iboss){
			/* at this point we need to resend the request--get its id! */
			pastRequests[details.requestId];
			return {cancel: true};
		}
		
	}
	
};

/* a function that is to be called onBeforeRequest that saves relevant information that can later be used should the request need to be repeated. */
var saveDestinationsCB = function(details) {
	/* save the urls in pastRequests */
};

/* setting up the callbacks on requests and when redirects are possible. */
chrome.webRequest.onBeforeRequest.addListener(saveDestinationsCB, {urls: "<all_urls>"});
chrome.webRequest.onHeadersReceived.addListener(pageBlockedCB, {urls: "<all_urls>"});
