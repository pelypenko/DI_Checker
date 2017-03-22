document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
    document.getElementById('clearSearchResults').addEventListener('click', clearSearchResults);
    restoreSettings();
});

function saveSettings() {
    var settings = {
        tenantNames: document.getElementById('tenantNames').value,
        clusterDomain: document.getElementById('clusterDomain').value,
        resultsStorageKey: document.getElementById('resultsStorageKey').value,
        textBlockMargin: document.getElementById('textBlockMargin').value,
        testSessionID: document.getElementById('testSessionID').value
    };
    sendToStorage(settings, updateStatus('Options saved.'));
}

function restoreSettings () {
    getFromStorage(function(sett) {
        if (!sett) return;

        document.getElementById('tenantNames').value = sett.tenantNames;
        document.getElementById('clusterDomain').value = sett.clusterDomain;
        document.getElementById('resultsStorageKey').value = sett.resultsStorageKey;
        document.getElementById('textBlockMargin').value = sett.textBlockMargin;
        document.getElementById('testSessionID').value = sett.testSessionID;
    });
}

function sendToStorage(settings, callBack)
{
    //chrome.storage.sync.set(settings, callBack);

    var r = {action: 'setOptions', options: settings};
    chrome.runtime.sendMessage(r, callBack);
}

function getFromStorage(callBack) {
    var sett = {
        tenantNames: 'tenant1, tenant2, tenant3',
        clusterDomain: 'opendev.intapp.com',
        resultsStorageKey: 'diLeaksStorage',
        textBlockMargin: '250',
        testSessionID: ''
    };
    chrome.storage.sync.get(sett, callBack);
}

function clearSearchResults () {
    getFromStorage(function(sett) {
        if (!sett) return;

        localStorage.setItem(sett.resultsStorageKey, '');
        sett.testSessionID = '';
        document.getElementById('testSessionID').value = sett.testSessionID;
        sendToStorage(sett, updateStatus('Search results removed'));
    });
}

function updateStatus(message) {
    var saveStatus = document.getElementById('saveStatus');
    saveStatus.textContent = message;
    setTimeout(function() { saveStatus.textContent = ''; }, 750);
}