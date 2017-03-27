$(document).ready(function() { 
    $("#saveOptions").bind('click', saveOptions);
    $("#clearSearchResults").bind('click', clearSearchResults);
    $("#resetSearchSession").bind('click', resetSearchSession);
    restoreOptions();
})

function saveOptions() {
    var options = {
        tenantNames: $('#tenantNames').val(),
        clusterDomain: $('#clusterDomain').val(),
        textBlockMargin: $('#textBlockMargin').val(),
        testSessionID: $('#testSessionID').val()
    };
    setOptions(options, updateStatus('Options saved'));
}

function restoreOptions () {
    getOptions(function(options) {
        $('#tenantNames').val(options.tenantNames);
        $('#clusterDomain').val(options.clusterDomain);
        $('#textBlockMargin').val(options.textBlockMargin);
        $('#testSessionID').val(options.testSessionID);
        $('#amountOfLeaks').val(options.leaks.length);
    });
}

function clearSearchResults () {
    chrome.runtime.sendMessage({action: 'clearTestSession'});
    $('#testSessionID').val('');
    $("#amountOfLeaks").val(0);
    updateStatus('Search results removed');
}

function resetSearchSession () {
    var request = {
        action: 'resetTestSession', 
        tenantNames: $('#tenantNames').val(),
        clusterDomain: $('#clusterDomain').val()
    };
    chrome.runtime.sendMessage(request);
    $("#amountOfLeaks").val(0); //ToDo: Re-work using callbacks
    updateStatus('Search session reseted');
}

function updateStatus(message) {
    var st = $('#saveStatus');
    st.text(message);
    setTimeout(function() { st.text(''); }, 750);
}

function setOptions(options, callBack) {
    var request = {action: 'setOptions', options: options};
    chrome.runtime.sendMessage(request, callBack);
}

function getOptions(callBack) {
    chrome.runtime.sendMessage({action: 'getOptions'}, callBack);
}