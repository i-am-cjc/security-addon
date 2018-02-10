// Check if we are on chrome
if (chrome)
    var browser = chrome;

// Add the context menu
browser.contextMenus.create({
    id: "open-in-observatory",
    title: "Open in Mozilla Observatory"
});

// Handle the click
browser.contextMenus.onClicked.addListener(function(info, tab) {
    // Get current domain
    // open url
    var domain = info.pageUrl.split("/")[2]
    console.log(domain);
    browser.tabs.create({
        url: "https://observatory.mozilla.org/analyze.html?host=" + domain
    })
})
