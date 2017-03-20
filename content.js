var storageKey = "DILeaks";  //todo: global
var tenants = ["tenant1", "tenant2", "tenant3"]; //todo: global
var textBlockMargin = 250; //todo: global

$(document).ready(function() {
    var tenant = getTenantByURL(location.href);

    checkCurrentDoc(tenant);
});

function checkCurrentDoc(tenant) {
    var body =  $('body').html().toString();

    tenants.forEach(function(keyWord) {
        if (keyWord === tenant)
            return;

        var index = body.indexOf(keyWord);
        if (index > 0) {
            recordLeak(
                {
                    tenant: tenant,
                    keyWord: keyWord,
                    url: location.href,
                    textBlock: body.substring(index - textBlockMargin, index + textBlockMargin),
                    screenshot: null
                });
        }

    });
}

function getTenantByURL(url) {
    //todo: implement
    return "tenant1";
}

function recordLeak(leak) {   
    var leaks = JSON.parse(localStorage.getItem(storageKey)) || [];
    leaks.push(leak);
    localStorage.setItem(storageKey , JSON.stringify(leaks));
}