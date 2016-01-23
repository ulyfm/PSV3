function save_options() {
  var bip = document.getElementById('bip').value;
  var bypass = document.getElementById('bpf').checked;
  chrome.storage.sync.set({
    bip: bip,
    bpf: bypass
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'saved.';
    if(bypass === true){
      chrome.browserAction.setBadgeText({text: "on"});
    }else{
      chrome.browserAction.setBadgeText({text: ""});
    }
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    bip: "10.7.1.210",
    bpf: false
  }, function(items) {
    document.getElementById('bip').value = items.bip;
    document.getElementById('bpf').checked = items.bpf;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);