function save_options() {
  var mic = document.getElementById('mic').value;
  var mac = document.getElementById('mac').value;
  var mip = document.getElementById('mip').value;
  var map = document.getElementById('map').value;
  var bypass = document.getElementById('bpf').checked;
  var selfczechs = document.getElementById('sce').checked;
  var enabled = document.getElementById('enable').checked;
  chrome.storage.sync.set({
    mic: mic,
	mac: mac,
	mip: mip,
	map: map,
    sce: selfczechs,
	bpf: bypass,
	ena: enabled
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
function restore_options() {
  chrome.storage.sync.get({
    mic: 1,
	mac: 18,
	mip: 1,
	map: 20,
    sce: false,
	bpf: false,
	ena: true
  }, function(items) {
    document.getElementById('mic').value = items.mic;
	document.getElementById('mac').value = items.mac;
	document.getElementById('mip').value = items.mip;
	document.getElementById('map').value = items.map;
    document.getElementById('sce').checked = items.sce;
	document.getElementById('bpf').checked = items.bpf;
	document.getElementById('enable').checked = items.ena;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
