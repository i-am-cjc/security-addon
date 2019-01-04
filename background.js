// Check if we are on chrome
if (chrome)
    var browser = chrome;

var urlLookup = [];

function add(id, title, parentId, url) {
    browser.contextMenus.create({
        id: id,
        title: title,
	parentId: parentId
    });
    
    if (url)
	    urlLookup[id] = url;
};

function addHost(id, title, url) {
	add(id, title, "ip-options", url);
};

function addSite(id, title, url) {
	add(id, title, "site-options", url);
};

function addSearch(id, title, url) {
	add(id, title, "search-options", url);
};

add("site-options", "Site");
add("ip-options", "Host");
add("search-options", "Search on...");

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
addSite("open-in-observatory", "Mozilla Observatory", "https://observatory.mozilla.org/analyze.html?host=");
addSite("open-in-ssllabs", "SSL Labs", "https://www.ssllabs.com/ssltest/analyze?d=");
addSite("open-in-security-headers", "SecurityHeaders", "https://securityheaders.io/?followRedirects=on&hide=on&q=");
addSite("open-in-hstspreload", "HSTS Preload", "https://hstspreload.org/?domain=");
addSite("open-in-cryptcheck", "CryptCheck", "https://tls.imirhil.fr/https/");
addSite("open-in-sucuri", "Sucuri Sitecheck", "https://sitecheck.sucuri.net/results/");
addSite("open-in-geoip", "Geoip Lookup", "https://geoiplookup.io/?hostname=");
addSite("open-in-xforce-u", "IBM X-Force", "https://exchange.xforce.ibmcloud.com/url/");
addSite("open-in-maltiverse", "Maltiverse", "https://www.maltiverse.com/hostname/	");

addHost("open-in-shodan", "Shodan", "https://www.shodan.io/host/");
addHost("open-in-censys", "Censys", "https://censys.io/ipv4?q=");
addHost("open-in-xforce", "IBM X-Force", "https://exchange.xforce.ibmcloud.com/ip/");

addSearch("open-in-urlscan", "URLScan.io", "https://urlscan.io/search/#");
addSearch("open-in-urlhaus", "URLhaus", "https://urlhaus.abuse.ch/browse.php?search=");
addSearch("open-in-vt", "VirusTotal", "https://www.virustotal.com/#/domain/");

// Handle the click
browser.contextMenus.onClicked.addListener(function(info, tab) {
    // Get current domain
    // open url

    var base = urlLookup[info.menuItemId];
    if (!base) return;

    switch(info.menuItemId) {
        case "open-in-ssllabs":
        case "open-in-observatory":
        case "open-in-security-headers":
        case "open-in-hstspreload":
        case "open-in-cryptcheck":
        case "open-in-sucuri":
        case "open-in-geoip":
        case "open-in-urlscan":
        case "open-in-urlhaus":
        case "open-in-vt":
        case "open-in-xforce-u":
        case "open-in-maltiverse":
            openDomain(info, base);
            break;

        case "open-in-shodan":
        case "open-in-censys":
        case "open-in-xforce":
            // get ip, then open it
            openIP(info, base);
            break;
        default:
            break;
    }
});
