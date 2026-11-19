// The harness data that is the same on every page of a build, written ONCE
// here instead of into each page (bean `gp2f`, page weight). Measured on
// gh-pages 1ad53fa, 2026-10-23: the tiles list was 12.5 KB and the navbar icon
// row 2.5 KB of every Jekyll page, about 15 KB of a 42 KB page.
//
// `head_custom.html` keeps the two places the readers look, empty, and loads
// this as the FIRST deferred script. Deferred scripts run in document order,
// so `navbar-row.js` and `docs-ui.js` find them filled, exactly as when the
// data was inlined. If this file does not load, the islands stay named and
// empty, and the readers report a failed load instead of "declared none".
(function () {
  var row = document.getElementById("fa-navbar-row");
  if (row && row.getAttribute("data-fa-row-src") === "harness-data" && !row.textContent) {
    row.textContent = "{\"icons\":[\"close\",\"qr\",\"launcher\"],\"hrefs\":{},\"notes\":{},\"folders\":[{\"kind\":\"beans\",\"label\":\"Plans and work\",\"note\":\"aai-programme's beans graph is not published on this site\"},{\"kind\":\"beans-board\",\"label\":\"Combined beans board\",\"note\":\"no viewer yet\"},{\"kind\":\"docs\",\"label\":\"Docs\",\"note\":\"no viewer yet\"},{\"kind\":\"library\",\"label\":\"Library\",\"path\":\"https://litlfred.github.io/folio-assistant/en/cat-harness/library/aai-programme/\"},{\"kind\":\"processes\",\"label\":\"Processes\",\"path\":\"https://litlfred.github.io/folio-assistant/en/cat-harness/processes/aai-programme/\"},{\"kind\":\"requirements\",\"label\":\"Requirements\",\"within\":\"docs\",\"note\":\"no viewer yet\"},{\"kind\":\"typologies\",\"label\":\"Graph typologies\",\"path\":\"https://litlfred.github.io/folio-assistant/en/cat-harness/graph-typologies/aai-programme/\"},{\"kind\":\"uploads\",\"label\":\"Uploads\",\"note\":\"aai-programme's uploads graph is not published on this site\"}]}";
    row.removeAttribute("data-fa-row-src");
  }
  var tiles = document.querySelector('meta[name="fa-tiles"][data-fa-src="harness-data"]');
  if (tiles && !tiles.getAttribute("content")) {
    tiles.setAttribute("content", "[]");
    tiles.removeAttribute("data-fa-src");
  }
})();
