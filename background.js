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
        default:
            break;
    }

    var domain = info.pageUrl.split("/")[2]
    console.log(domain);
    browser.tabs.create({
        url: base + domain
    })
})
