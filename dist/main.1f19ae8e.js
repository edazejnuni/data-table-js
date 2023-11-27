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
})({"js/modalOperations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModal = createModal;
function createModal() {
  // create the modal structure
  var modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = "\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n        <p>Are you sure you want to delete this row?</p>\n        <div class=\"modal-buttons\">\n          <button id=\"modalOkButton\">Ok</button>\n          <button id=\"modalCloseButton\" class=\"close\">Close</button>\n        </div>\n        </div>\n      </div>\n    ";
  return modal;
}
},{}],"js/exportData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateJSONData = generateJSONData;
exports.showExportModal = showExportModal;
var _modalOperations = require("./modalOperations");
function generateJSONData() {
  var tableRows = Array.from(document.querySelectorAll("table tbody tr"));
  //get the data from each table row and show them
  var rowData = tableRows.map(function (row) {
    var cells = Array.from(row.cells);
    var cellData = cells.map(function (cell) {
      return cell.textContent.trim();
    });
    console.log(cellData);
    return {
      Name: cellData[0],
      Surname: cellData[1],
      Email: cellData[2],
      Age: cellData[3],
      "Selected Color": cellData[4],
      "Contact Method": cellData[5]
    };
  });
  console.log(JSON.stringify(rowData, null, 2));
  return JSON.stringify(rowData, null, 2);
}
function showExportModal() {
  var jsonData = generateJSONData();
  var exportModal = (0, _modalOperations.createModal)();
  var modalContent = exportModal.querySelector(".modal-content");
  var jsonTextArea = document.createElement("textarea");
  jsonTextArea.value = jsonData;
  jsonTextArea.setAttribute("readonly", true);
  jsonTextArea.style.width = "100%";
  jsonTextArea.style.height = "200px";
  jsonTextArea.style.resize = "none";
  var closeButton = document.createElement("button");
  closeButton.innerHTML = "Close";
  closeButton.onclick = function () {
    exportModal.remove();
  };
  modalContent.innerHTML = ""; // clear any existing content
  modalContent.appendChild(jsonTextArea);
  modalContent.appendChild(closeButton);
  document.body.appendChild(exportModal);
}
},{"./modalOperations":"js/modalOperations.js"}],"js/formValidation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidEmail = isValidEmail;
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
},{}],"js/tableOperations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showFormData = showFormData;
var _formValidation = require("./formValidation");
var _modalOperations = require("./modalOperations");
var table = null;
var displayData = document.getElementById("displayData");
function showFormData() {
  // Get the input values
  var name = document.getElementById("name").value;
  var surname = document.getElementById("surname").value;
  var age = document.getElementById("age").value;
  var email = document.getElementById("email").value;
  var selectColor = document.getElementById("selectColor").value;
  var checkEmail = document.getElementById("checkEmail").checked;
  var checkPhone = document.getElementById("checkPhone").checked;
  var checkSMS = document.getElementById("checkSMS").checked;
  console.log(validAge);
  // validate age
  var validAge = Number(age) <= 120 && age !== "";
  if (!validAge) {
    alert("Please enter a valid age (less than or equal to 120).");
    return;
  }
  // Check if email is valid
  var validEmail = (0, _formValidation.isValidEmail)(email);
  if (!validEmail) {
    alert("Please enter a valid email address.");
    return;
  }
  // Check at least one contact preference is selected
  if (!(checkEmail || checkPhone || checkSMS)) {
    alert("Please select at least one contact method.");
    return;
  }
  //do the check if there is no data
  var hasData = name || surname || age || email || selectColor || checkEmail || checkPhone || checkSMS;
  if (!hasData) {
    displayData.innerHTML = "<p>No data to display.</p>";
    if (table) {
      table.remove();
      table = null;
    }
    return;
  }

  // create table if it doesnt exist
  if (!table) {
    table = document.createElement("table");
    var tableHead = table.createTHead();
    var headerRow = tableHead.insertRow();
    var headers = ["Name", "Surname", "E-mail", "Age", "Selected Color", "Contact method", "Action"];
    headers.forEach(function (headerTitle) {
      var th = document.createElement("th");
      th.appendChild(document.createTextNode(headerTitle));
      headerRow.appendChild(th);
    });
    displayData.innerHTML = "";
    displayData.appendChild(table);
  }

  // Create table body if it doesnt exist
  var tableBody = table.querySelector("tbody");
  if (!tableBody) {
    tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
  }

  // Create a new row
  var bodyRow = tableBody.insertRow();

  // Insert data into the row cells
  [name, surname, email, age, selectColor].forEach(function (data) {
    var cell = bodyRow.insertCell();
    cell.appendChild(document.createTextNode(data));
  });

  // insert checkbox labels
  var checkBoxCell = bodyRow.insertCell();
  //the user can choose more so we create an array and push the choices there
  var selectedMethods = [];
  if (checkEmail) {
    selectedMethods.push("By email");
  }
  if (checkPhone) {
    selectedMethods.push("By phone");
  }
  if (checkSMS) {
    selectedMethods.push("Via SMS");
  }
  if (selectedMethods.length > 0) {
    var contactMethodText = selectedMethods.join(", "); // join selected methods with commas
    checkBoxCell.appendChild(document.createTextNode(contactMethodText));
  }
  // create delete button
  var deleteCell = bodyRow.insertCell();
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function () {
    //create modal
    var modal = (0, _modalOperations.createModal)();
    //create ok and close buttons
    var modalOkButton = modal.querySelector("#modalOkButton");
    var modalCloseButton = modal.querySelector("#modalCloseButton");

    //create function to set the action on click of delete
    modalOkButton.onclick = function () {
      // remove the row on click of ok
      tableBody.removeChild(bodyRow);
      if (tableBody.rows.length === 0) {
        displayData.innerHTML = "<p>No data to display.</p>";
        table.remove();
        table = null;
      }
      // close the modal
      modal.remove();
    };
    // close modal on click of close
    modalCloseButton.onclick = function () {
      modal.remove();
    };

    // Append the modal to the body
    document.body.appendChild(modal);
  };
  deleteCell.appendChild(deleteButton);

  // clear input values after the submit
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.getElementById("selectColor").value = "";
  document.getElementById("checkEmail").checked = false;
  document.getElementById("checkPhone").checked = false;
  document.getElementById("checkSMS").checked = false;
}
},{"./formValidation":"js/formValidation.js","./modalOperations":"js/modalOperations.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _exportData = require("./js/exportData");
var _tableOperations = require("./js/tableOperations");
// [x] get the value of each input
// [x] check if there are datas, if not show message
// [x] do the checks on age, email, contact preference
// 1. age <= 120
// 2. email valid
// 3. at least 1 contact preference selected
// [x] we need to create
// 1. <table></table>
// 2. <thead></thead>
// 3. <thead></thead>
// 4. <tr></tr>
// 5. <th></th>
// 6. <tbody></tbody>
// 7. <tr></tr>
// 8. <td></td>
// 9. delete buton
// [x] show the datas in the table
// [x] create export button
// [x] generate json from the table data
// [x] show modal and add the json there

var exportData = document.getElementById("exportData");

// add event listener to the export button
var exportButton = document.createElement("button");
exportButton.innerHTML = "Export";
exportButton.onclick = _exportData.showExportModal;
exportData.appendChild(exportButton);

// add event listener to the submit button
document.getElementById("submitButton").addEventListener("click", _tableOperations.showFormData);
},{"./js/exportData":"js/exportData.js","./js/tableOperations":"js/tableOperations.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59505" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map