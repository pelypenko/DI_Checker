document.addEventListener('DOMContentLoaded', function() {  
    getOptions(renderScreen);
});

function renderScreen(options) {   
    var h = "<b>Test session ID:</b> " + options.testSessionID + "<br>" +
            "<b>Tenant names:</b> " + options.tenantNames + "<br>" +
            "<b>Amount of found leaks:</b> " + options.leaks.length + "<br>"+
            "_________________________________________________________<br><br>";

    $.each(options.leaks, function(ii, leak) {
        h += "<b>Current tenant:</b> " + leak.currentTenant + "<br>" +
            "<b>Wrong renant:</b> " + leak.wrongTenant + "<br>" +
            "<b>URL:</b> " + leak.url + "<br><br>";

        //ToDo: find a way how to display textBlock
    });
    $('#leaks').html(h);
}

function getOptions(callBack) {
    chrome.runtime.sendMessage({action: 'getOptions'}, callBack);
}