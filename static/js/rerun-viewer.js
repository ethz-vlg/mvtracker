// Rerun 0.21.0's WebGPU renderer can produce a black viewport and validation
// errors in Safari. Use its supported WebGL backend for WebKit browsers;
// keep the default renderer in Chromium and Firefox. Keep 0.21.0 to match
// the recordings. See https://github.com/rerun-io/rerun/issues/8559.
function rerunViewerUrl(href) {
    const isWebKit = /AppleWebKit\//.test(navigator.userAgent)
        && !/(Chrome|Chromium|Edg|OPR)\//.test(navigator.userAgent);
    if (!isWebKit) return href;

    const url = new URL(href);
    if (!url.searchParams.has('renderer')) {
        url.searchParams.set('renderer', 'webgl');
    }
    return url.href;
}

// Update the actual links, so opening a gallery item in a new tab also works.
document.querySelectorAll('a[href^="https://app.rerun.io/version/0.21.0/"]').forEach((link) => {
    link.href = rerunViewerUrl(link.href);
});
