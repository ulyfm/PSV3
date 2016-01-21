/**
Licensed under the BSD license

Copyright (c) 2016, noop.us
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND 
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
var mic, mac, mip, map;

/* function that syncs relevant variables

and bypasses *page* filter--not script filter.
*/
chrome.storage.sync.get({
    mic: 1,
	mac: 18,
	mip: 1,
	map: 20,
    sce: false,
	bpf: false,
	ena: true
  }, function(items) {
    mic = parseInt(items.mic);
	mac = parseInt(items.mac);
	mip = parseInt(items.mip);
	map = parseInt(items.map);
	if(items.bpf === true && window.location.host === "10.7.1.210"){ /* NOTE TO SELF: MAKE THIS IP CHANGEABLE */
		window.location = 'http://' + document.getElementById('url').innerHTML;
	}
	if(items.ena){
		document.title = "Practice-It! - Solve a Problem - BJP3 " + (items.sce ? "Exercise " : "Self-Check ") + rand(mic, mac) + "." + rand(mip, map);
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
