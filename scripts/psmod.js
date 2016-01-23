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