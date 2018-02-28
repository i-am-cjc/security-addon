// Check if we are on chrome
if (chrome)
    var browser = chrome;

function add(id, title) {
    browser.contextMenus.create({
        id: id,
        title: title
    });
};

function openDomain(info, base) {
    var domain = info.pageUrl;
    if (info.linkUrl)
        domain = info.linkUrl;

    domain = domain.split("/")[2];

    browser.tabs.create({
        url: base + domain
    });
}

function openIP(info, base) {
    var domain = info.pageUrl;
    if (info.linkUrl)
        domain = info.linkUrl;

    domain = domain.split("/")[2];
    
    fetch("http://api.konvert.me/forward-dns/" + domain).then(function(response) {
        return(response.text());
    }).then(function(text) {
        console.log(text);
        var url = base + text;

        browser.tabs.create({
            url: url
        });
    });
}

// Add the context menu
add("open-in-obervatory", "Mozilla Observatory")
add("open-in-ssllabs", "SSL Labs");
add("open-in-security-headers", "SecurityHeaders");
add("open-in-hstspreload", "HSTS Preload");
add("open-in-cryptcheck", "CryptCheck");
add("open-in-sucuri", "Sucuri Sitecheck");
add("open-in-geoip", "Geoip Lookup");
add("open-in-shodan", "Shodan");
add("open-in-censys", "Censys");

// Handle the click
browser.contextMenus.onClicked.addListener(function(info, tab) {
    // Get current domain
    // open url

    switch(info.menuItemId) {
        case "open-in-ssllabs":
            base = "https://www.ssllabs.com/ssltest/analyze?d=";
            openDomain(info, base);
            break;
        case "open-in-observatory":
            base = "https://observatory.mozilla.org/analyze.html?host=";
            openDomain(info, base);
            break;
        case "open-in-security-headers":
            base = "https://securityheaders.io/?followRedirects=on&hide=on&q=";
            openDomain(info, base);
            break;
        case "open-in-hstspreload":
            base = "https://hstspreload.org/?domain=";
            openDomain(info, base);
            break;
        case "open-in-cryptcheck":
            base = "https://tls.imirhil.fr/https/";
            openDomain(info, base);
            break;
        case "open-in-sucuri":
            base = "https://sitecheck.sucuri.net/results/";
            openDomain(info, base);
            break;
        case "open-in-geoip":
            base = "https://geoiplookup.io/?hostname=";
            openDomain(info, base);
            break;
        case "open-in-shodan":
            // get ip, then open it
            openIP(info, "https://www.shodan.io/host/");
            break;
        case "open-in-censys":
            // get ip, then open it
            openDomain(info, "https://censys.io/ipv4?q=");
            break;
        default:
            break;
    }
});
