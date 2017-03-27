$(document).ready(function() {

    if (getParameterByName("di_ResetTestSession")) {
        resetTestSession();
        return;
    }

    if (getParameterByName("di_ShowTestResults")) {
        showTestResults();
        return;
    }

    //check current page
    //todo: re-work this using jQuery 'then' construction
    getOptions(checkCurrentDoc); 
});

function checkCurrentDoc(options) {
    if (!options.testSessionID || !options.tenantNames) 
        return;

    var curTenant = getTenantByURL(location.hostname, options.clusterDomain);
    if (!curTenant) 
        return;

    var body = document.body.innerHTML.toLowerCase();
    var tenants = options.tenantNames ? options.tenantNames.split(',') : [];

    //todo: re-work this
    $.each(tenants, function(ii, tenant) {
        if (tenant === curTenant)
            return;

        var idx = body.indexOf(tenant);
        if (idx > 0) {
            var leak = {
                    currentTenant: curTenant,
                    wrongTenant: tenant,
                    url: location.href,
                    textBlock: body.substring(idx - options.textBlockMargin, idx + options.textBlockMargin)
                };
            options.leaks.push(leak);
            
            //capacity of chrome.storage is limited, we will store just first 10 search results 
            if (options.leaks.length > 10) 
                return false;
        }
    });
    setOptions(options);
}

function getTenantByURL(url, clusterDomain) {
    if (url.indexOf(clusterDomain) < 0) {
        return '';
    }

    if (url.indexOf('translate.google.com.ua'))
        return 'tenant1'; //ToDo: remove the stub

    url = url.replace(/(^\w+:|^)\/\//, '').toLowerCase();
    return url.substring(0, url.indexOf('.'));
}

function getParameterByName(name, url) {
    if (!url)
      url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) 
        return null;

    if (!results[2])
        return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function resetTestSession() {
    var request = {
        action: 'resetTestSession', 
        tenantNames: getParameterByName('tenantNames'),
        clusterDomain: getParameterByName('clusterDomain')
    };
    chrome.runtime.sendMessage(request);
}

function showTestResults() {
    var request = {action: 'getResultsPageLink'};
    chrome.runtime.sendMessage(request, function(url) { window.location.replace(url); });
}

function setOptions(options, callBack) {
    var request = {action: 'setOptions', options: options};
    chrome.runtime.sendMessage(request, callBack);
}

function getOptions(callback) {
    chrome.runtime.sendMessage({action: 'getOptions'}, callback);
}