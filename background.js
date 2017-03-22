chrome.runtime.onMessage.addListener(function(request, sender, callBack) {
    if (!request) 
        return callBack({});

    switch(request.action) {
        case 'getOptions':
            getOptions(callBack);
            break;
        case 'setOptions':
            setOptions(request.options, callBack);
            break;
        default:
            callBack({});
    }
});

function getOptions(callBack) {
    var options = {
        tenantNames: '',
        clusterDomain: '',
        resultsStorageKey: 'diLeaksStorage',
        textBlockMargin: '250',
        testSessionID: ''
    };
    chrome.storage.sync.get(options, callBack);
}

function setOptions(options, callBack) {
    chrome.storage.sync.set(options, callBack);
}
