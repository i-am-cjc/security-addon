// Check if we are on chrome
if (chrome)
    var browser = chrome;

// Add the context menu
browser.contextMenus.create({
    id: "open-in-obervatory",
    title: "Mozilla Observatory"
});
browser.contextMenus.create({
  id: "separator-1",
  type: "separator"
});

browser.contextMenus.create({
    id: "open-in-ssllabs",
    title: "SSL Labs"
});

browser.contextMenus.create({
    id: "open-in-security-headers",
    title: "SecurityHeaders"
});
browser.contextMenus.create({
  id: "separator-2",
  type: "separator"
});
browser.contextMenus.create({
    id: "open-in-shodan",
    title: "Shodan"
});

// Handle the click
browser.contextMenus.onClicked.addListener(function(info, tab) {
    // Get current domain
    // open url
    var base = "https://observatory.mozilla.org/analyze.html?host="

    switch(info.menuItemId) {
        case "open-in-ssllabs":
            base = "https://www.ssllabs.com/ssltest/analyze?d=";
            break;
        case "open-in-observatory":
            base = "https://observatory.mozilla.org/analyze.html?host=";
            break;
        case "open-in-security-headers":
            base = "https://securityheaders.io/?followRedirects=on&hide=on&q=";
            break;
        case "open-in-shodan":
            // get ip, then open it
            var domain = info.pageUrl;
            if (info.linkUrl)
                domain = info.linkUrl;

            domain = domain.split("/")[2];
            
            fetch("http://api.konvert.me/forward-dns/" + domain).then(function(response) {
                return(response.text());
            }).then(function(text) {
                console.log(text);
                var url = "https://www.shodan.io/host/" + text;

                browser.tabs.create({
                    url: url
                });
            });
            return;
        default:
            break;
    }

    // check if we are using the page, or a link to scan.
    var domain = info.pageUrl;
    if (info.linkUrl)
        domain = info.linkUrl;

    domain = domain.split("/")[2];

    browser.tabs.create({
        url: base + domain
    })
})
