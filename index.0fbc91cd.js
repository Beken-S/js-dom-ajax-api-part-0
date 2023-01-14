// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"j98HG":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "6e8a5cd20fbc91cd";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"fFaKF":[function(require,module,exports) {
var _debounce = require("./common/debounce");
var _onlyLast = require("./common/only-last");
var _apiProvider = require("./api/api-provider");
var _searchHistory = require("./components/search-history");
var _suggestions = require("./components/suggestions");
var _scores = require("./components/scores");
var _errors = require("./common/errors");
var _utils = require("./common/utils");
const history = new (0, _searchHistory.SearchHistory)(100);
const searchBoxElement = document.querySelector(".search-box");
const fieldElement = searchBoxElement.querySelector(".search-box__field");
const suggestionsElement = searchBoxElement.querySelector(".search-box__suggestions-list");
const historyElement = document.querySelector(".history");
const outputElement = document.querySelector(".output");
const renderSuggestions = (0, _suggestions.getRenderToSuggestions)(suggestionsElement);
const renderHistory = (0, _searchHistory.getRenderToHistory)(historyElement);
const renderOutput = (0, _utils.getRenderTo)(outputElement);
const selectSuggestion = (0, _suggestions.getSelectSuggestion)(suggestionsElement);
const onlyLastSearchCity = (0, _onlyLast.onlyLast)((0, _apiProvider.searchCity));
const onlyLastGetScores = (0, _onlyLast.onlyLast)((0, _apiProvider.getScores));
const debouncedInputHandler = (0, _debounce.debounce)(inputQueryHandler, 200);
const debounceShowScoresHandler = (0, _debounce.debounce)(showScoresHandler, 200);
searchBoxElement.addEventListener("keydown", suggestionSelectionHandler, true);
searchBoxElement.addEventListener("submit", submitQueryHandler, true);
fieldElement.addEventListener("input", debouncedInputHandler, true);
suggestionsElement.addEventListener("click", suggestionClickHandler);
historyElement.addEventListener("click", historyClickHandler);
document.addEventListener("showScore", debounceShowScoresHandler, true);
window.addEventListener("storage", historyChangeHandler, true);
window.onload = init;
function init() {
    fieldElement.value = "";
    renderHistory(history.getRecentSearchQueries(3));
}
async function inputQueryHandler(event) {
    sessionStorage.setItem("isSubmit", false);
    const query = event.target.value;
    if (!query) {
        renderSuggestions();
        return;
    }
    const [recentSuggestionsId, recentSuggestions] = history.findRecentSearchQueries(query, 5);
    if (recentSuggestions != null) {
        renderSuggestions(recentSuggestions, null, query);
        selectSuggestion("update");
    }
    const [newSuggestions, error] = await onlyLastSearchCity(event.target.value);
    if (JSON.parse(sessionStorage.getItem("isSubmit"))) return;
    if (error) {
        if (!(error instanceof DOMException)) console.error(error);
        return;
    }
    let currentSuggestions;
    if (newSuggestions != null && recentSuggestions != null) {
        const maxSuggestionsCount = 10;
        const maxNewSuggestionsCount = maxSuggestionsCount - recentSuggestions.length;
        currentSuggestions = newSuggestions.filter((suggestion)=>!recentSuggestionsId.includes(suggestion.id)).slice(0, maxNewSuggestionsCount);
    } else if (newSuggestions != null) currentSuggestions = newSuggestions;
    renderSuggestions(recentSuggestions, currentSuggestions, query);
    selectSuggestion("update");
}
async function showScoresHandler(event) {
    renderOutput("Loading...");
    const [scores, error] = await onlyLastGetScores(event.detail);
    if (error instanceof (0, _errors.BaseError) && error.status === (0, _errors.ERROR_CODE).NotFound) {
        renderOutput(error.message);
        return;
    }
    if (error) {
        if (!(error instanceof DOMException)) console.error(error);
        return;
    }
    renderOutput((0, _scores.getScoresMarkup)(scores));
}
function suggestionSelectionHandler(event) {
    if (event.code === "ArrowDown") {
        const current = selectSuggestion("next");
        if (current != null) fieldElement.value = current.dataset.suggestion;
    }
    if (event.code === "ArrowUp") {
        event.preventDefault();
        const current1 = selectSuggestion("previous");
        if (current1 != null) fieldElement.value = current1.dataset.suggestion;
    }
}
function submitQueryHandler(event) {
    event.preventDefault();
    sessionStorage.setItem("isSubmit", true);
    let currentSuggestions = selectSuggestion();
    if (currentSuggestions == null) {
        currentSuggestions = selectSuggestion("first");
        if (currentSuggestions == null) {
            fieldElement.value = "";
            return;
        }
    }
    const suggestion = {
        id: currentSuggestions.id,
        link: currentSuggestions.dataset.link,
        suggestion: currentSuggestions.dataset.suggestion
    };
    document.dispatchEvent(new CustomEvent("showScore", {
        detail: suggestion.link
    }));
    history.add(suggestion);
    fieldElement.value = "";
    renderSuggestions();
    selectSuggestion("update");
    renderHistory(history.getRecentSearchQueries(3));
}
function suggestionClickHandler(event) {
    const element = event.target;
    if (element instanceof HTMLLIElement) {
        sessionStorage.setItem("isSubmit", true);
        const suggestion = {
            id: element.id,
            link: element.dataset.link,
            suggestion: element.dataset.suggestion
        };
        document.dispatchEvent(new CustomEvent("showScore", {
            detail: suggestion.link
        }));
        history.add(suggestion);
        fieldElement.value = "";
        renderSuggestions();
        selectSuggestion("update");
        renderHistory(history.getRecentSearchQueries(3));
    }
}
function historyChangeHandler(event) {
    event.key = "searchHistory";
    renderHistory(history.getRecentSearchQueries(3));
}
function historyClickHandler(event) {
    const element = event.target;
    if (element instanceof HTMLLIElement) document.dispatchEvent(new CustomEvent("showScore", {
        detail: event.target.dataset.link
    }));
}

},{"./common/debounce":"ejO4M","./common/only-last":"5F7Q1","./api/api-provider":"7llFO","./common/errors":"1H1NA","./common/utils":"16Ibw","./components/search-history":"ePfvr","./components/suggestions":"k0Sf4","./components/scores":"4DgAQ"}],"ejO4M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debounce", ()=>debounce);
function debounce(callee, timeoutMs) {
    let timer;
    return function perform(...args) {
        if (timer != null) clearTimeout(timer);
        timer = setTimeout(()=>callee(...args), timeoutMs);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"5F7Q1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "onlyLast", ()=>onlyLast);
function onlyLast(callee) {
    let controller = new AbortController();
    let isOverPreviousCall = true;
    return async function(...args) {
        if (!isOverPreviousCall) {
            controller.abort();
            controller = new AbortController();
        }
        isOverPreviousCall = false;
        try {
            const response = await callee(...args, controller.signal);
            isOverPreviousCall = true;
            return response;
        } catch (error) {
            isOverPreviousCall = true;
            throw error;
        }
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7llFO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "searchCity", ()=>searchCity);
parcelHelpers.export(exports, "getScores", ()=>getScores);
var _errors = require("../common/errors");
var _getData = require("../common/get-data");
const BASE_URL = "https://api.teleport.org";
const MAIN_PATH = "api";
const SEARCH_PARAMS = new URLSearchParams([
    [
        "search",
        ""
    ],
    [
        "limit",
        10
    ]
]);
function isObject(value) {
    return typeof value === "object" && value != null;
}
function hasEmbedded(value) {
    return "_embedded" in value;
}
function isLink(value) {
    return isObject(value) && "href" in value && typeof value.href === "string";
}
function isLinks(value) {
    return isObject(value) && "city:item" in value && isLink(value["city:item"]);
}
function isSearchItem(value) {
    return isObject(value) && "matching_full_name" in value && "_links" in value && typeof value.matching_full_name === "string" && isLinks(value._links);
}
function isSearchItemsArray(value) {
    return Array.isArray(value) && value.every(isSearchItem);
}
function isSearchResult(value) {
    return isObject(value) && "city:search-results" && isSearchItemsArray(value["city:search-results"]);
}
function isValidSearchResult(value) {
    return isObject(value) && hasEmbedded(value) && isSearchResult(value._embedded);
}
function isCategory(value) {
    return isObject(value) && "color" in value && "name" in value && "score_out_of_10" in value && typeof value.color === "string" && typeof value.name === "string" && typeof value.score_out_of_10 === "number";
}
function isArrayCategories(value) {
    return Array.isArray(value) && value.every(isCategory);
}
function isUaScores(value) {
    return isObject(value) && "categories" in value && "teleport_city_score" && typeof value.teleport_city_score === "number" && isArrayCategories(value.categories);
}
function isCityUrbanArea(value) {
    return isObject(value) && hasEmbedded(value) && "full_name" in value && "ua:scores" in value._embedded && typeof value.full_name === "string" && isUaScores(value._embedded["ua:scores"]);
}
function isValidGetScoresResult(value) {
    return isObject(value) && hasEmbedded(value) && "city:urban_area" in value._embedded && isCityUrbanArea(value._embedded["city:urban_area"]);
}
async function searchCity(query, signal) {
    const url = new URL(`${MAIN_PATH}/cities`, BASE_URL);
    SEARCH_PARAMS.set("search", query);
    url.search = SEARCH_PARAMS.toString();
    const [data, error] = await (0, _getData.getData)(url.toString(), signal);
    if (error) return [
        null,
        error
    ];
    if (!isValidSearchResult(data)) return [
        null,
        new (0, _errors.BaseError)((0, _errors.ERROR_CODE).InvalidResponse, "Invalid response.")
    ];
    if (data.count === 0) return [
        null,
        null
    ];
    const suggestions = data._embedded["city:search-results"].reduce((acc, item)=>{
        acc.push({
            id: item._links["city:item"].href.match(/\d+/)[0],
            link: item._links["city:item"].href,
            suggestion: item.matching_full_name
        });
        return acc;
    }, []);
    return [
        suggestions,
        null
    ];
}
async function getScores(urlString, signal) {
    const url = new URL(urlString);
    SEARCH_PARAMS.set("embed", "city:urban_area/ua:scores");
    url.search = SEARCH_PARAMS.toString();
    const [data, error] = await (0, _getData.getData)(url.toString(), signal);
    if (error) return [
        null,
        error
    ];
    if (!isValidGetScoresResult(data)) return [
        null,
        new (0, _errors.BaseError)((0, _errors.ERROR_CODE).NotFound, "There are no statistics for this city.")
    ];
    return [
        {
            name: data._embedded["city:urban_area"].full_name,
            categories: data._embedded["city:urban_area"]._embedded["ua:scores"].categories,
            totalScore: data._embedded["city:urban_area"]._embedded["ua:scores"].teleport_city_score
        },
        null
    ];
}

},{"../common/errors":"1H1NA","../common/get-data":"3SHVA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1H1NA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ERROR_CODE", ()=>ERROR_CODE);
parcelHelpers.export(exports, "BaseError", ()=>BaseError);
class BaseError extends Error {
    constructor(status, message){
        super(message);
        this.status = status;
    }
}
const ERROR_CODE = {
    BadRequest: 400,
    NotFound: 404,
    InvalidResponse: 1000,
    NetworkError: 1001,
    TypeError: 4000,
    UnexpectedError: 5000
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3SHVA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getData", ()=>getData);
var _errors = require("./errors");
async function getData(url, signal) {
    let response;
    try {
        response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            signal
        });
    } catch (error) {
        if (error instanceof DOMException) return [
            null,
            error
        ];
        return [
            null,
            new (0, _errors.BaseError)((0, _errors.ERROR_CODE).NetworkError, error.message)
        ];
    }
    if (response.ok) return [
        await response.json(),
        null
    ];
    if (response.status === 400) return [
        null,
        new (0, _errors.BaseError)((0, _errors.ERROR_CODE).BadRequest, "Некорректный запрос.")
    ];
    if (response.status === 404) return [
        null,
        new (0, _errors.BaseError)((0, _errors.ERROR_CODE).NotFound, "Информация не найдена.")
    ];
    return [
        null,
        new (0, _errors.BaseError)((0, _errors.ERROR_CODE).UnexpectedError, "Что-то пошло не так.")
    ];
}

},{"./errors":"1H1NA","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"16Ibw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getHide", ()=>getHide);
parcelHelpers.export(exports, "getShow", ()=>getShow);
parcelHelpers.export(exports, "getRenderTo", ()=>getRenderTo);
parcelHelpers.export(exports, "getSelectChildrenSequentially", ()=>getSelectChildrenSequentially);
parcelHelpers.export(exports, "escape", ()=>escape);
function escape(string) {
    const regexp = /[.*+?^${}()|[\]\\]/g;
    return string.replace(regexp, "\\$&");
}
function getHide(element) {
    return function() {
        element.classList.add("hidden");
    };
}
function getShow(element) {
    return function() {
        element.classList.remove("hidden");
    };
}
function getRenderTo(to) {
    return to.replaceChildren.bind(to);
}
function getSelectChildrenSequentially(element, addedClassName) {
    let currentChild = null;
    return function(action) {
        const firstChild = element.firstElementChild;
        const lastChild = element.lastElementChild;
        function update() {
            if (currentChild != null) {
                currentChild.classList.remove(addedClassName);
                currentChild = null;
            }
        }
        function selectFirst() {
            currentChild = firstChild;
            if (currentChild != null) currentChild.classList.add(addedClassName);
        }
        function selectNext() {
            if (firstChild == null && lastChild == null) return;
            if (currentChild == null) currentChild = firstChild;
            const nextChild = currentChild?.nextElementSibling;
            currentChild.classList.remove(addedClassName);
            if (nextChild != null) currentChild = nextChild;
            else currentChild = firstChild;
            currentChild.classList.add(addedClassName);
        }
        function selectPrevious() {
            if (firstChild == null && lastChild == null) return;
            if (currentChild == null) currentChild = lastChild;
            const previousChild = currentChild?.previousElementSibling;
            currentChild.classList.remove(addedClassName);
            if (previousChild != null) currentChild = previousChild;
            else currentChild = lastChild;
            currentChild.classList.add(addedClassName);
        }
        switch(action){
            case "update":
                update();
                break;
            case "first":
                selectFirst();
                break;
            case "next":
                selectNext();
                break;
            case "previous":
                selectPrevious();
                break;
        }
        return currentChild;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ePfvr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SearchHistory", ()=>SearchHistory);
parcelHelpers.export(exports, "getRenderToHistory", ()=>getRenderToHistory);
var _utils = require("../../common/utils");
class SearchHistory {
    constructor(maxLength){
        this.maxLength = maxLength;
        if (this.get() == null) localStorage.setItem("searchHistory", JSON.stringify([]));
    }
    get() {
        return JSON.parse(localStorage.getItem("searchHistory"));
    }
    add(query) {
        const history = this.get();
        const index = history.findIndex((item)=>item.id === query.id);
        if (index > -1) history.splice(index, 1);
        else if (history.length > this.maxLength) history.pop();
        localStorage.setItem("searchHistory", JSON.stringify([
            query,
            ...history
        ]));
    }
    getRecentSearchQueries(count) {
        const history = this.get();
        return history.slice(0, count);
    }
    findRecentSearchQueries(query, count) {
        const regexp = new RegExp((0, _utils.escape)(query), "i");
        const history = this.get();
        const itemsId = [];
        const items = [];
        if (history.length === 0) return [
            null,
            null
        ];
        for (const historyItem of history){
            if (items.length === count) break;
            if (historyItem.suggestion.search(regexp) > -1) {
                itemsId.push(historyItem.id);
                items.push(historyItem);
            }
        }
        if (items.length === 0) return [
            null,
            null
        ];
        return [
            itemsId,
            items
        ];
    }
}
function createHistoryItem({ suggestion , link  }) {
    const historyItem = document.createElement("li");
    historyItem.classList.add("history__item");
    historyItem.dataset.link = link;
    historyItem.textContent = suggestion;
    return historyItem;
}
function getHistoryItems(suggestions) {
    const fragment = document.createDocumentFragment();
    fragment.append(...suggestions.map(createHistoryItem));
    return fragment;
}
function getRenderToHistory(historyElement) {
    const render = (0, _utils.getRenderTo)(historyElement);
    return function(suggestions) {
        if (suggestions == null) {
            render("");
            return;
        }
        render(getHistoryItems(suggestions));
    };
}

},{"../../common/utils":"16Ibw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k0Sf4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getRenderToSuggestions", ()=>getRenderToSuggestions);
parcelHelpers.export(exports, "getSelectSuggestion", ()=>getSelectSuggestion);
var _utils = require("../../common/utils");
function cerateSuggestionsOptions({ id , link , suggestion  }, query, visited = false) {
    const regex = new RegExp(`(${(0, _utils.escape)(query)})`, "i");
    const suggestionOption = document.createElement("li");
    suggestionOption.id = id;
    suggestionOption.dataset.suggestion = suggestion;
    suggestionOption.dataset.link = link;
    suggestionOption.classList.add("search-box__suggestions-item");
    suggestionOption.innerHTML = suggestion.replace(regex, '<span class="bold">$1</span>');
    if (visited) suggestionOption.classList.add("search-box__suggestions-item_visited");
    return suggestionOption;
}
function getSuggestionsOptions(previousSuggestions, currentSuggestions, query) {
    const fragment = document.createDocumentFragment();
    if (previousSuggestions != null) {
        const visitedSuggestionsOptions = previousSuggestions.map((item)=>cerateSuggestionsOptions(item, query, true));
        fragment.append(...visitedSuggestionsOptions);
    }
    if (currentSuggestions != null) {
        const newSuggestionsOptions = currentSuggestions.map((item)=>cerateSuggestionsOptions(item, query));
        fragment.append(...newSuggestionsOptions);
    }
    return fragment;
}
function getRenderToSuggestions(suggestionsElement) {
    const render = (0, _utils.getRenderTo)(suggestionsElement);
    const hide = (0, _utils.getHide)(suggestionsElement);
    const show = (0, _utils.getShow)(suggestionsElement);
    return function(previousSuggestions, currentSuggestions, query) {
        if (previousSuggestions == null && currentSuggestions == null || !query) {
            render("");
            hide();
            return;
        }
        render(getSuggestionsOptions(previousSuggestions, currentSuggestions, query));
        show();
    };
}
function getSelectSuggestion(suggestions) {
    return (0, _utils.getSelectChildrenSequentially)(suggestions, "search-box__suggestions-item_selected");
}

},{"../../common/utils":"16Ibw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4DgAQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createScoresCategory", ()=>createScoresCategory);
parcelHelpers.export(exports, "getScoresCategories", ()=>getScoresCategories);
parcelHelpers.export(exports, "getScoresMarkup", ()=>getScoresMarkup);
function createScoresCategory({ name , score_out_of_10  }) {
    const scoreCategory = document.createElement("li");
    const categoryLabel = document.createElement("label");
    const categoryMeter = document.createElement("meter");
    const categoryScore = document.createElement("span");
    scoreCategory.classList.add("scores__category");
    categoryLabel.classList.add("scores__label");
    categoryMeter.classList.add("scores__meter");
    categoryScore.classList.add("scores__score");
    categoryLabel.textContent = `${name}:`;
    categoryLabel.setAttribute("for", name);
    categoryScore.textContent = score_out_of_10.toFixed(1);
    categoryMeter.id = name;
    categoryMeter.setAttribute("max", 10);
    categoryMeter.setAttribute("low", 3);
    categoryMeter.setAttribute("high", 5);
    categoryMeter.setAttribute("optimum", 8);
    categoryMeter.setAttribute("value", score_out_of_10);
    scoreCategory.append(categoryLabel, categoryMeter, categoryScore);
    return scoreCategory;
}
function getScoresCategories(categories) {
    const fragment = document.createDocumentFragment();
    fragment.append(...categories.map(createScoresCategory));
    return fragment;
}
function getScoresMarkup({ name , categories , totalScore  }) {
    const scores = document.createElement("div");
    const cityName = document.createElement("h2");
    const categoriesScoreList = document.createElement("ul");
    const totalScoreValue = document.createElement("p");
    scores.classList.add("scores");
    cityName.classList.add("h2");
    categoriesScoreList.classList.add("scores__list");
    totalScoreValue.classList.add("scores__total-score");
    cityName.textContent = name;
    categoriesScoreList.append(getScoresCategories(categories));
    totalScoreValue.textContent = `Total score: ${totalScore.toFixed(1)}`;
    scores.append(cityName, categoriesScoreList, totalScoreValue);
    return scores;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["j98HG","fFaKF"], "fFaKF", "parcelRequirea447")

//# sourceMappingURL=index.0fbc91cd.js.map
