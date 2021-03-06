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
})({"libraryCommonChat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormSubmition = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormSubmition = /*#__PURE__*/function () {
  function FormSubmition(object) {
    _classCallCheck(this, FormSubmition);

    this.windowChat = object.windowChat;
    this.text = object.text;
    this.formInput = object.formInput;
    this.formText = object.formText;
    this.arrow = object.arrow;
    this.borderColorError;
    this.borderColor;
    this.textInput = [];
    this.xhr;
    this.textLine;
    this.noscroll = object.noscroll; //this.scroll = object.scroll;

    this.scrollValue;
  }

  _createClass(FormSubmition, [{
    key: "checkForm",
    value: function checkForm(colorError, color) {
      this.borderColorError = colorError;
      this.borderColor = color;

      if (this.formInput.style.borderColor === this.borderColorError) {
        this.formInput.style.borderColor = this.borderColor;
      }

      if (this.formText.style.borderColor === this.borderColorError) {
        this.formText.style.borderColor = this.borderColor;
      }
    }
  }, {
    key: "scrollChat",
    value: function scrollChat() {
      var scrollingValue;
      scrollingValue = this.text.clientHeight - this.windowChat.scrollTop;
      this.windowChat.scrollBy(0, scrollingValue);
      this.arrow.style.display = "none";
    }
  }, {
    key: "formProcessing",
    value: function formProcessing(textInput) {
      var _this = this;

      this.textInput = textInput;
      var numberOfLines = 4;
      var string = "";
      var array = [];
      var countText = 0;
      var countHeading = 1;
      var text = 0;
      var date = 0;
      var numberLine = 0;
      var scrollingValue;
      var textLine;
      console.log(this.textInput);

      if (this.textInput !== undefined) {
        this.textInput[0] = encodeURIComponent(this.textInput[0]);
        this.textInput[1] = encodeURIComponent(this.textInput[1]);
        this.textInput[2] = encodeURIComponent(this.textInput[2]);
        array[0] = this.textInput[0];
        array[1] = this.textInput[1];
        array[2] = this.textInput[2];

        if (this.textInput[3] !== undefined) {
          this.textInput[3] = encodeURIComponent(this.textInput[3]);
          array[3] = this.textInput[3];
          array[3] = array[3].replace('%0A', '');
        }
      }

      console.log(array);
      this.xhr = new XMLHttpRequest();
      this.xhr.open("POST", "form.php", true);
      this.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      this.xhr.onreadystatechange = function () {
        if (_this.xhr.readyState === 4 && _this.xhr.status === 200) {
          _this.textLines = JSON.parse(_this.xhr.responseText);
          console.log(_this.textLines.length);

          if (_this.textLines.length > 0) {
            for (var i = 0; i < _this.textLines.length; i++) {
              countText++;
              text = countHeading + 1;
              date = countHeading + 2;
              numberLine = countHeading + 3;

              if (countText % text === 0 && countText !== numberLine) {
                textLine = _this.textLines[i].replace(/&lt;div&gt;/gi, '<div>');
                textLine = textLine.replace(/&lt;\/div&gt;/gi, '</div>');
                textLine = textLine.replace(/&amp;nbsp;/gi, ' ');
                textLine = textLine.replace(/&lt;br&gt;/gi, '');
                string += '<div class="text-p">' + textLine + '</div>';
              } else if (countText % date === 0) {
                textLine = _this.textLines[i].replace(/&lt;div&gt;/gi, '<div>');
                textLine = textLine.replace(/&lt;\/div&gt;/gi, '</div>');
                textLine = textLine.replace(/&amp;nbsp;/gi, ' ');
                textLine = textLine.replace(/&lt;br&gt;/gi, '');
                string += '<div class="text-p date">' + textLine + '</div>';
              } else if (countText % numberLine === 0) {
                //console.log(this.textLines[i]);
                textLine = _this.textLines[i].replace(/&lt;div&gt;/gi, '<div>');
                textLine = textLine.replace(/&lt;\/div&gt;/gi, '</div>');
                textLine = textLine.replace(/&amp;nbsp;/gi, ' ');
                textLine = textLine.replace(/&lt;br&gt;/gi, '');
                string += '<input type="hidden" class="input-hidden" value="' + textLine + '">';
              } else {
                textLine = _this.textLines[i].replace(/&lt;div&gt;/gi, '<div>');
                textLine = textLine.replace(/&lt;\/div&gt;/gi, '</div>');
                textLine = textLine.replace(/&amp;nbsp;/gi, ' ');
                textLine = textLine.replace(/&lt;br&gt;/gi, '');
                string += '<div class="text-heading">' + textLine + '</div>';
              }

              if (countText % numberOfLines === 0) {
                countHeading += numberOfLines;
              }
            }

            scrollingValue = _this.text.clientHeight - _this.windowChat.scrollTop - _this.windowChat.clientHeight; //console.log(scrollingValue);

            _this.text.insertAdjacentHTML('beforeend', string);

            if (scrollingValue <= 1) {
              _this.scrollChat();
            }
          }
        }
      }; //console.log(JSON.stringify(array));


      this.xhr.send("form_input=" + JSON.stringify(array));
    }
  }, {
    key: "scrollProcessing",
    value: function scrollProcessing(scrollValue) {
      this.scrollValue = scrollValue;

      if (this.noscroll === this.scrollValue) {
        this.arrow.style.display = "flex";
        console.log(this.arrow.style.display);
      }
      /*else if (this.scroll === this.scrollValue)
      {
          this.scrollChat();
      }*/

    }
  }]);

  return FormSubmition;
}();

exports.FormSubmition = FormSubmition;
},{}],"task.js":[function(require,module,exports) {
"use strict";

var _libraryCommonChat = require("./libraryCommonChat.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  var formSubmition;
  var arrayText = [];
  var scrollingValue;
  var topArrow;
  var inputsHidden;
  var valueInput;
  var error = "red";
  var noError = "black";
  var objectForm = {};
  objectForm.windowChat;
  objectForm.text;
  objectForm.form;
  objectForm.formName;
  objectForm.formInput;
  objectForm.formText;
  objectForm.arrow;
  objectForm.noscroll = "noscroll"; //objectForm.scroll = "scroll";

  window.addEventListener("DOMContentLoaded", function () {
    objectForm.windowChat = document.querySelector(".row-window");
    objectForm.text = document.querySelector(".text");
    objectForm.form = document.forms.form;
    objectForm.formInput = objectForm.form.form_input;
    objectForm.formText = document.querySelector(".input.textarea");
    objectForm.arrow = document.querySelector(".arrow");
    objectForm.button = document.querySelector(".button");
    formSubmition = new _libraryCommonChat.FormSubmition(objectForm);
    objectForm.form.addEventListener('keydown', function (event) {
      if (event.code === "Enter" && event.ctrlKey) {
        objectForm.button.click();
      }
    });

    objectForm.form.onsubmit = function (event) {
      event.preventDefault();
      formSubmition.checkForm(error, noError);

      if (objectForm.formText.innerHTML !== "") {
        if (objectForm.formInput.value !== "") {
          objectForm.formName = objectForm.formInput.value;
          objectForm.formInput.style.display = "none";
          objectForm.formText.style.marginTop = 0;
        } else if (objectForm.formInput.style.display !== "none") {
          objectForm.formInput.style.borderColor = "red";
          return;
        }

        if (objectForm.formName === undefined) {
          arrayText[0] = objectForm.formInput.value;
        } else {
          arrayText[0] = objectForm.formName;
        }

        arrayText[1] = objectForm.formText.innerHTML;
        arrayText[2] = new Date().toLocaleString();
        console.log(arrayText[1]);
        console.log(arrayText[2]);
        inputsHidden = document.querySelectorAll(".input-hidden");

        if (inputsHidden.length !== 0) {
          valueInput = inputsHidden[inputsHidden.length - 1].getAttribute("value");
          arrayText[3] = valueInput;
        }

        console.log(arrayText);
        formSubmition.formProcessing(arrayText);
        scrollingValue = objectForm.text.clientHeight - objectForm.windowChat.scrollTop - objectForm.windowChat.clientHeight;
        console.log(scrollingValue);
        console.log(valueInput);

        if (scrollingValue <= 1) {
          formSubmition.scrollChat();
        }

        console.log(arrayText);
        objectForm.formText.innerText = "";
      } else {
        if (objectForm.formName === undefined) {
          objectForm.formInput.style.borderColor = "red";
        }

        if (objectForm.formText.innerHTML === "") {
          objectForm.formText.style.borderColor = "red";
        }
      }
    };

    objectForm.arrow.addEventListener('click', function () {
      formSubmition.scrollChat();
    });
    objectForm.windowChat.addEventListener('scroll', function () {
      scrollingValue = objectForm.text.clientHeight - objectForm.windowChat.scrollTop - objectForm.windowChat.clientHeight;

      if (scrollingValue > 1) {
        formSubmition.scrollProcessing(objectForm.noscroll);
      } else {
        objectForm.arrow.style.display = "none";
      }

      topArrow = objectForm.windowChat.scrollTop + objectForm.windowChat.clientHeight - (objectForm.arrow.clientHeight + 10);
      objectForm.arrow.style.top = topArrow + "px";
    });
    window.addEventListener('resize', function () {
      scrollingValue = objectForm.text.clientHeight - objectForm.windowChat.scrollTop - objectForm.windowChat.clientHeight;

      if (scrollingValue > 0) {
        formSubmition.scrollProcessing(objectForm.noscroll);
      }

      topArrow = objectForm.windowChat.scrollTop + objectForm.windowChat.clientHeight - (objectForm.arrow.clientHeight + 10);
      objectForm.arrow.style.top = topArrow + "px";
    });

    var sendRequest = function sendRequest(value) {
      inputsHidden = document.querySelectorAll(".input-hidden");
      console.log(value);

      if (inputsHidden.length !== 0 || value !== undefined) {
        arrayText[0] = " ";
        arrayText[1] = " ";
        arrayText[2] = " ";

        if (value === undefined) {
          valueInput = inputsHidden[inputsHidden.length - 1].getAttribute("value");
          arrayText[3] = valueInput;
          console.log(_typeof(arrayText[3]));
        } else {
          arrayText[3] = value;
          console.log(_typeof(value));
        }

        console.log(arrayText);
        formSubmition.formProcessing(arrayText);
      }
    };

    formSubmition.scrollProcessing(objectForm.noscroll);
    setTimeout(function () {
      return sendRequest("0");
    }, 1);
    setInterval(function () {
      return sendRequest();
    }, 500);
  });
})();
},{"./libraryCommonChat.js":"libraryCommonChat.js"}],"../../../../../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56304" + '/');

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