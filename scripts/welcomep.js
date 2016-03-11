/**

	Function that opens up the welcome page

*/
var welcome = function(obj) {
	chrome.tabs.create({url: "../html/welcome.html"});
};

/**

	Add listener

*/
chrome.runtime.onInstalled.addListener(welcome);