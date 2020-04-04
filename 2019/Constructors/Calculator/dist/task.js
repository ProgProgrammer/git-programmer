// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"libraryCalculator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calculator = Calculator;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Calculator() {
  this.numbersExpression = 0;
  this.arraySymbols = [];
  this.arrayAllSymbols = [];
  this.resultOfExpression = [];
  this.input = document.querySelector(".main-blocks-input");
  this.input.value = "";
  this.stringInput = "";
  this.checkSymbol = "";
  this.variable = "";
  this.button;
  this.buttons;
  this.buttonValue;
  this.elementFocus;
  this.mainFocus;

  this.focusDelete = function (elementFocus, mainFocus) {
    this.elementFocus = elementFocus;
    this.mainFocus = mainFocus;

    if (document.activeElement === this.elementFocus) {
      this.mainFocus.focus();
      console.log(document.activeElement);
      console.log(" - document.activeElement");
    }
  };

  this.clickEffect = function (button, buttons) {
    this.button = button;
    this.buttons = buttons;

    for (this.i = 0; this.i < this.buttons.length; this.i++) {
      this.buttonValue = this.buttons[this.i].dataset.name;

      if (this.buttonValue == this.button) {
        this.buttons[this.i].style.backgroundColor = "#bfbfbf";
        setTimeout(this.buttonBackground, 60, this.buttons[this.i]);
      }
    }
  };

  this.buttonBackground = function (button) {
    this.button = button;
    this.button.style.backgroundColor = "";
  };

  this.checkSymbols = function (arraySymbols) {
    this.checkSymbol = arraySymbols;
    this.checkSymbol = String(this.checkSymbol);
    console.log(this.checkSymbol + " - this.checkSymbol");

    for (this.a = 0; this.a < this.checkSymbol.length; this.a++) {
      if (arraySymbols[this.a] === "-") {
        return true;
      }
    }

    return false;
  };

  this.clearAllButton = function (symbol) {
    this.symbol = symbol;
    this.input.value = this.input.value.replace(/ /gi, "");
    this.input.value = "";
    this.arraySymbols = [];
    this.resultOfExpression = [];
    this.numbersExpression = 0;
  };

  this.clearButton = function (symbol) {
    this.symbol = symbol;
    this.input.value = this.input.value.replace(/ /gi, "");
    this.stringInput = this.input.value;

    for (this.i = 0; this.i < this.stringInput.length; this.i++) {
      if (this.stringInput[this.i] === "=") {
        this.input.value = "";
        this.arraySymbols = [];
        this.resultOfExpression = [];
        this.numbersExpression = 0;
        return;
      }
    }

    this.arraySymbols.splice(this.arraySymbols.length - 1, 1);
    this.resultOfExpression = [];
    this.numbersExpression = 0;
    this.input.value = "";

    for (this.a = 0; this.a < this.arraySymbols.length; this.a++) {
      this.input.value += this.arraySymbols[this.a];
    }

    return;
  };

  this.deleteButton = function (symbol) {
    this.symbol = symbol;
    this.input.value = this.input.value.replace(/ /gi, "");
    this.stringInput = this.input.value;

    for (this.i = 0; this.i < this.stringInput.length; this.i++) {
      if (this.stringInput[this.i] === "=") {
        this.arraySymbols.splice(0, this.arraySymbols.length - 2);
        this.input.value = this.arraySymbols[0];
        this.numbersExpression = this.arraySymbols[0];
        return;
      }
    }

    console.log(this.arraySymbols);
    console.log(this.arraySymbols[0] + " - this.arraySymbols1");
    this.lastSymbol = this.arraySymbols[this.arraySymbols.length - 1];
    this.lastSymbol = String(this.lastSymbol);
    console.log(this.arraySymbols);
    console.log(_typeof(this.lastSymbol) + " - lastSymbol1");
    this.lastSymbol = this.lastSymbol.substring(0, this.lastSymbol.length - 1);
    console.log(this.lastSymbol + " - lastSymbol2");
    this.arraySymbols[this.arraySymbols.length - 1] = this.lastSymbol;
    console.log(this.arraySymbols + " - this.arraySymbols2");
    this.input.value = "";

    if (this.arraySymbols[this.arraySymbols.length - 1] === "") {
      this.arraySymbols.splice(this.arraySymbols.length - 1, 1);
    }

    for (this.b = 0; this.b < this.arraySymbols.length; this.b++) {
      this.input.value += this.arraySymbols[this.b];
    }

    if (this.arraySymbols[0] === undefined) {
      this.numbersExpression = 0;
    } else {
      this.numbersExpression = this.arraySymbols[0];
    }

    console.log(this.numbersExpression + " - this.numbersExpression return");
    console.log(this.arraySymbols + " - this.arraySymbols3");
    return;
  };

  this.signChangeButton = function (symbol) {
    console.log(this.arraySymbols[this.arraySymbols.length - 1] + " - this.checkSymbols(this.arraySymbols)");

    if (this.arraySymbols[this.arraySymbols.length - 1] !== "*" && this.arraySymbols[this.arraySymbols.length - 1] !== "/" && this.arraySymbols[this.arraySymbols.length - 1] !== "+" && this.arraySymbols[this.arraySymbols.length - 1] !== "-") {
      if (this.checkSymbols(this.arraySymbols[this.arraySymbols.length - 1]) === true) {
        this.arraySymbols[this.arraySymbols.length - 1] = this.arraySymbols[this.arraySymbols.length - 1].replace(/-/i, "");
        console.log(this.arraySymbols[this.arraySymbols.length - 1] + " - this.arraySymbols[this.arraySymbols.length - 1]");
        this.input.value = "";

        for (this.b = 0; this.b < this.arraySymbols.length; this.b++) {
          this.input.value += this.arraySymbols[this.b];
        }

        console.log(this.arraySymbols[this.arraySymbols.length - 1] + " - this.arraySymbols[this.arraySymbols.length - 1]1");
        console.log(this.numbersExpression + " - this.numbersExpression1");
      } else {
        this.variable = this.arraySymbols[this.arraySymbols.length - 1];
        this.arraySymbols[this.arraySymbols.length - 1] = "-";
        this.arraySymbols[this.arraySymbols.length - 1] += this.variable;
        this.input.value = "";

        for (this.b = 0; this.b < this.arraySymbols.length; this.b++) {
          this.input.value += this.arraySymbols[this.b];
        }
      }
    }

    return;
  };

  this.inputValue = function (symbol) {
    this.symbol = symbol;
    this.input.value = this.input.value.replace(/ /gi, "");

    if (this.symbol !== "=") {
      console.log(/\d/gi.test(this.symbol));
      console.log(this.arraySymbols[this.arraySymbols.length - 1] + " - this.number");

      if (this.arraySymbols.length === 0 || /\d/gi.test(this.symbol) === false && this.symbol !== "." || /\d/gi.test(this.arraySymbols[this.arraySymbols.length - 1]) === false) {
        if (this.symbol === "." && /\d/gi.test(this.arraySymbols[this.arraySymbols.length - 1]) === false) {
          this.arraySymbols.push("0");
          this.arrayAllSymbols.push("0");
          this.input.value += "0";
          this.arraySymbols[this.arraySymbols.length - 1] += this.symbol;
          this.arrayAllSymbols[this.arraySymbols.length - 1] += this.symbol;
          this.input.value += this.symbol;
        } else if (this.symbol === "+" && /\d/gi.test(this.arraySymbols[this.arraySymbols.length - 1]) === true || this.symbol === "-" && /\d/gi.test(this.arraySymbols[this.arraySymbols.length - 1]) === true || this.symbol === "*" && /\d/gi.test(this.arraySymbols[this.arraySymbols.length - 1]) === true || this.symbol === "/" && /\d/gi.test(this.arraySymbols[this.arraySymbols.length - 1]) === true) {
          console.log(this.arraySymbols[0] + " - this.arraySymbols2");
          this.arraySymbols.push(this.symbol);
          this.arrayAllSymbols.push(this.symbol);
          this.input.value += this.symbol;
          console.log(this.arraySymbols);
        } else if (this.symbol !== "+" && this.symbol !== "-" && this.symbol !== "*" && this.symbol !== "/") {
          console.log(this.arraySymbols[0] + " - this.arraySymbols2");
          this.arraySymbols.push(this.symbol);
          this.arrayAllSymbols.push(this.symbol);
          this.input.value += this.symbol;
          console.log(this.arraySymbols);
        }
      } else {
        this.arraySymbols[this.arraySymbols.length - 1] += this.symbol;
        this.arrayAllSymbols[this.arrayAllSymbols.length - 1] += this.symbol;
        this.input.value += this.symbol;
        console.log(this.arraySymbols);
      }
    } else {
      this.input.value += this.symbol;
      console.log(this.symbol);
    }

    console.log(this.arraySymbols);
  };

  this.calculateValue = function () {
    this.counterFor = 0;
    console.log(this.arraySymbols);

    for (var a = 0; a < this.arraySymbols.length; a++) {
      //console.log(Number(this.arraySymbols[a]));
      if (/\d/gi.test(this.arraySymbols[a]) === false && /\d/gi.test(this.arraySymbols[a + 1]) === true) {
        this.counterFor++;

        if (this.counterFor <= 1 && /\d/.test(this.arraySymbols[a - 1]) === true) {
          this.numbersExpression = Number(this.arraySymbols[a - 1]);
        }

        if (this.arraySymbols[a] === "+") {
          console.log(this.numbersExpression + " - this.numbersExpression");
          console.log(Number(this.arraySymbols[a + 1]) + " - Number(this.arraySymbols[a + 1]");
          this.numbersExpression = Number(this.numbersExpression) + Number(this.arraySymbols[a + 1]);
          console.log(this.numbersExpression);
        } else if (this.arraySymbols[a] === "-") {
          this.numbersExpression = Number(this.numbersExpression) - Number(this.arraySymbols[a + 1]);
          console.log(this.numbersExpression);
        } else if (this.arraySymbols[a] === "*") {
          console.log(Number(this.numbersExpression) + " - Number(this.numbersExpression)");
          console.log(Number(this.arraySymbols[a + 1]) + " - Number(this.arraySymbols[a + 1])");
          this.numbersExpression = Number(this.numbersExpression) * Number(this.arraySymbols[a + 1]);
          console.log(this.numbersExpression);
        } else if (this.arraySymbols[a] === "/") {
          this.numbersExpression = Number(this.numbersExpression) / Number(this.arraySymbols[a + 1]);
          console.log(this.numbersExpression);
        }
      } else if (/\d/gi.test(this.arraySymbols[a]) === true) {
        if (this.numbersExpression === 0 && this.arraySymbols.length - 1 !== a) {
          console.log(a + " - this.numbersExpression");
          this.numbersExpression = Number(this.arraySymbols[a]);
          console.log(this.numbersExpression);
        }
      }
    }

    if (this.numbersExpression === Infinity) {
      this.numbersExpression = 0;
    }

    console.log(this.numbersExpression + " - number");
    this.input.value += this.numbersExpression;
    this.resultOfExpression[0] = this.numbersExpression;
    this.arraySymbols = [];
    this.arraySymbols[0] = this.resultOfExpression[0];
  };
}
},{}],"task.js":[function(require,module,exports) {
"use strict";

var _libraryCalculator = require("./libraryCalculator.js");

(function () {
  var calculator;
  var buttons;
  var buttonValue;
  var elementFocus;
  var mainFocus;
  window.addEventListener('DOMContentLoaded', function () {
    console.log("Hello");
    buttons = document.querySelectorAll(".main-blocks-buttons-button");
    mainFocus = document.querySelector(".input-hidden");
    elementFocus = document.querySelector(".main-blocks-input");
    calculator = new _libraryCalculator.Calculator();

    var _loop = function _loop(i) {
      buttons[i].addEventListener('click', function () {
        buttonValue = buttons[i].dataset.name;
        console.log(buttonValue);

        if (buttonValue === "clear-all") {
          calculator.clearAllButton(buttonValue);
        } else if (buttonValue === "clear") {
          calculator.clearButton(buttonValue);
        } else if (buttonValue === "delete") {
          calculator.deleteButton(buttonValue);
        } else if (buttonValue === "+/-") {
          calculator.signChangeButton(buttonValue);
        } else {
          calculator.inputValue(buttonValue);
        }

        if (buttonValue === "=") {
          calculator.calculateValue();
        }
      });
    };

    for (var i = 0; i < buttons.length; i++) {
      _loop(i);
    }

    window.addEventListener('keydown', function (event) {
      calculator.focusDelete(elementFocus, mainFocus);
      console.log(event.key);

      if (event.key === "Enter") {
        return;
      }

      if (event.key === "delete" || event.key === "Backspace") {
        calculator.clickEffect("delete", buttons);
        calculator.deleteButton(event.key);
      } else if (event.key === "0" || event.key === "1" || event.key === "2" || event.key === "3" || event.key === "4" || event.key === "5" || event.key === "6" || event.key === "7" || event.key === "8" || event.key === "9" || event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "." || event.key === "=" || event.key === "Enter") {
        if (event.key === "=") {
          calculator.clickEffect(event.key, buttons);
          buttonValue = "=";
          calculator.inputValue(buttonValue);
        } else {
          calculator.clickEffect(event.key, buttons);
          calculator.inputValue(event.key);
        }
      }

      if (event.key === "=") {
        calculator.clickEffect(event.key, buttons);
        calculator.calculateValue();
      }
    });
  });
})();
},{"./libraryCalculator.js":"libraryCalculator.js"}],"../../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50094" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","task.js"], null)
//# sourceMappingURL=/task.js.map