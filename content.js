var storageKey = "DILeaks";  //todo: global
var tenantNames = ["tenant1", "tenant2", "tenant3"]; //todo: global
var textBlockMargin = 250; //todo: global
var testSessionID = "w31231231s231"; //todo: global
var clusterDomain = "opendev.intapp.com"; //todo: global
var isTestSessionActive = true;

//todo: do not use jQuery
$(document).ready(function() {
    if (getParameterByName("DI_InitTestSession")) {
        resetTestSession();
        return;
    }

    if (getParameterByName("DI_ShowTestResults")) {
        showTestResults(testSessionID);
        return;
    }

    if (isTestSessionActive) {
        var tenant = getTenantByURL(location.hostname, clusterDomain);
        checkCurrentDoc(tenant);
    }
});

function checkCurrentDoc(tenant) {
    var body = document.body.innerHTML;

    //todo: can I use RegExp here?
    tenantNames.forEach(function(keyWord) {
        if (keyWord === tenant)
            return;

        var index = body.indexOf(keyWord);
        if (index > 0) {
            recordLeak(
                {
                    testSessionID: testSessionID,
                    tenant: tenant,
                    keyWord: keyWord,
                    url: location.href,
                    textBlock: body.substring(index - textBlockMargin, index + textBlockMargin),
                    screenshot: null
                });
        }

    });
}

function resetTestSession() {
    //todo: implement
    return "sessionID";
}

function showTestResults() {
    //todo: implement
    return;
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

function getTenantByURL(url, clusterDomain) {
    // if (url.indexOf(clusterDomain) < 0) {
    //     return '';
    // }   
    // url = url.replace(/(^\w+:|^)\/\//, '');
    // return url.substring(0, url.indexOf('.'));

    return "tenant1"; //todo:    rework and remove mock
}

function recordLeak(leak) {   
    var leaks = JSON.parse(localStorage.getItem(storageKey)) || [];
    leaks.push(leak);
    localStorage.setItem(storageKey , JSON.stringify(leaks));
}