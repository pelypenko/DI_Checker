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

        case 'resetTestSession':
            var params = {
                testSessionID: guid(),
                tenantNames: request.tenantNames,
                clusterDomain: request.clusterDomain
            };
            resetTestSession(callBack, params);
            break;

        case 'clearTestSession':
            resetTestSession(callBack);
            break;

        case 'getResultsPageLink':
            callBack(chrome.extension.getURL('results/results.html'));
            break;

        default:
            callBack({});
    }

    return true;
});

function getOptions(callBack) {
    var options = {
        tenantNames: '',
        clusterDomain: '',
        resultsStorageKey: 'diLeaksStorage',
        textBlockMargin: '250',
        testSessionID: '',
        leaks: ''
    };
    chrome.storage.local.get(options, function(results) {
        if (!results) return;
        
        results.leaks = results.leaks ? (JSON.parse(results.leaks) || []) : [];
        callBack(results);
    });
}

function setOptions(options, callBack) {
    options.leaks = JSON.stringify(options.leaks);
    chrome.storage.local.set(options, callBack);
}

//todo: re-work it
function resetTestSession(callBack, params) {
    getOptions(function(options) {
        if (params) {
            options.testSessionID = params.testSessionID;
            options.tenantNames = params.tenantNames;
            options.clusterDomain = params.clusterDomain;
        }
        else {
            options.testSessionID = options.tenantNames = options.clusterDomain = '';
        }
        options.leaks = [];

        setOptions(options);
    });
}

function guid() {
  function s4() { 
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); 
    }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
