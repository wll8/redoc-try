"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
;
(function (window, undefined) {
  window.initTry = window.initTry || initTry;

  /**
  
  global variable:
  
  window.initTry
  window.initTry.cfg
  window.initTry.renderPos
  window.initTry.$operation
  
  */

  function initTry(userCfg) {
    loadScript("https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js").then(function () {
      return loadScript("https://cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js");
    }).then(function () {
      return loadScript("https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js");
    }).then(function () {
      return loadScript("https://cdn.jsdelivr.net/npm/compare-versions@3.6.0/index.min.js");
    }).then(function () {
      var cfg = cfgHandle(userCfg);
      window.initTry.cfg = cfg;
      if (cfg.onlySwagger) {
        initSwagger(cfg.swaggerOptions);
        $(".swaggerBox").addClass("onlySwagger");
      } else {
        var _Redoc;
        (_Redoc = Redoc).init.apply(_Redoc, _toConsumableArray(cfg.redocOptions));
      }
      initCss();
    })["catch"](function () {
      console.error('Something went wrong.');
    });
  }
  function cfgHandle(userCfg) {
    if (_typeof(userCfg) === "string") {
      userCfg = {
        openApi: userCfg
      };
    }
    var _userCfg = userCfg,
      redocOptions = _userCfg.redocOptions;
    var testOpenApi = "https://httpbin.org/spec.json"; // `https://petstore.swagger.io/v2/swagger.json`
    var redocOptionsRes = dataType(redocOptions, "object") ? [undefined, redocOptions] : redocOptions || [];
    var _redocOptionsRes = _slicedToArray(redocOptionsRes, 4),
      redoc_openApi = _redocOptionsRes[0],
      redoc_options = _redocOptionsRes[1],
      redoc_dom = _redocOptionsRes[2],
      redoc_callBack = _redocOptionsRes[3];
    var redocVersion = (
    // Read the redoc version number from the label
    ($("script[src*=\"/redoc@\"]").attr("src") || "").match(/redoc@(.+?)\//) || [])[1];
    if (_typeof(userCfg.openApi) === "object") {
      var _userCfg2 = userCfg,
        openApi = _userCfg2.openApi;
      var blob = new Blob([JSON.stringify(openApi)], {
        type: "application/json"
      });
      var url = URL.createObjectURL(blob);
      userCfg.openApi = url;
      userCfg._openApiJSON = openApi;
    }
    var cfg = _objectSpread(_objectSpread({
      openApi: testOpenApi,
      onlySwagger: false,
      // Only render swagger, in some cases redoc will render openApi error
      tryText: "try",
      // try button text
      trySwaggerInApi: true,
      // Is the swagger debugging window displayed under the api? true: yes, false: displayed after the request, when the request is relatively large, you may not see the debugging window
      redocVersion: redocVersion,
      authBtnPosSelector: "h1:eq(0)",
      authBtnText: "AUTHORIZE",
      pure: false
    }, userCfg), {}, {
      swaggerOptions: _objectSpread({
        url: userCfg.openApi || testOpenApi,
        dom_id: "#swagger-ui",
        onComplete: function onComplete() {
          if (Boolean(cfg.onlySwagger) === false) {
            trySwagger(cfg);
          }
        },
        tryItOutEnabled: true
      }, userCfg.swaggerOptions),
      redocOptions: [redoc_openApi || userCfg._openApiJSON || userCfg.openApi || testOpenApi, redoc_options || {
        enableConsole: true
      }, redoc_dom || document.getElementById('redoc-container'), function () {
        redoc_callBack && redoc_callBack();
        initSwagger(cfg.swaggerOptions);
        $(".swaggerBox").addClass("hide");
        cfg.pure && $(".swaggerBox").addClass("pure");
      }]
    });
    return cfg;
  }
  function initCss() {
    // reset swagger-ui css
    $('head').append("\n    <style>\n      /* Set the position of swaggerBox with body as the relative element */\n      body {\n        position: relative;\n      }\n      @media print, screen and (max-width: 85rem) {\n        .eIeJha,\n        .dtUibw {\n          padding: 4px;\n        }\n      }\n\n      .swaggerBox.hide {\n        visibility: hidden;\n        cursor: none;\n        width: 0;\n        height: 0;\n      }\n      .swaggerBox.show {\n        visibility: visible;\n        cursor: initial;\n      }\n\n      /* Reset the style of swagger-ui */\n      .swaggerBox .swagger-ui .wrapper {\n        padding: 0;\n      }\n      .swaggerBox .swagger-ui .download-contents {\n        top: -10px;\n        right: 0;\n        width: initial;\n      }\n\n      /* Disable api bar to avoid problems */\n      .swaggerBox:not(.onlySwagger) .swagger-ui .opblock .opblock-summary {\n        cursor: not-allowed;\n        pointer-events: none;\n      }\n\n      /* Disable the api bar, but exclude the authorization button */\n      .swaggerBox .swagger-ui .authorization__btn {\n        cursor: initial;\n        pointer-events: initial;\n      }\n\n      .swaggerBox {\n        border-radius: 4px;\n        background-color: #fff;\n        width: 100%;\n        height: 100vh;\n        position: absolute;\n        top: 0;\n        left: 0;\n        z-index: 1;\n      }\n      .swaggerBox:not(.onlySwagger) {\n        overflow: hidden;\n      }\n      /* Hide some disturbing elements */\n      .swaggerBox.pure:not(.onlySwagger) .swagger-ui .opblock-summary {\n        visibility: hidden;\n        padding: 0;\n      }\n      .swaggerBox.pure:not(.onlySwagger) .opblock-section thead,\n      .swaggerBox.pure:not(.onlySwagger) .swagger-ui .opblock-summary * {\n        display: none;\n      }\n\n      .swaggerBox:not(.onlySwagger) .swagger-ui .opblock .opblock-section-header,\n      .swaggerBox:not(.onlySwagger) .btn.cancel,\n      .swaggerBox:not(.onlySwagger) .try-out,\n      .swaggerBox:not(.onlySwagger) .responses-inner>div>h4,\n      .swaggerBox:not(.onlySwagger) :not(.live-responses-table).responses-table,\n      .swaggerBox:not(.onlySwagger) .opblock-body > .opblock-description-wrapper {\n        display: none;\n      }\n      .swaggerBox:not(.onlySwagger) .block div>span:last-child .operation-tag-content>span:last-child {\n        display: block;\n        margin-bottom: 100vh;\n      }\n      .swaggerBox .tryBtn {\n        margin-right: 10px;\n        background-color: #fff;\n      }\n    </style>\n  ");
  }
  function initSwagger(swaggerOptions) {
    // dom
    $('body').append("\n    <div class=\"swaggerBox\">\n      <div id=\"swagger-ui\"></div>\n    </div>\n  ");
    // swagger-ui.css
    $('head').append("<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css\" />");
    SwaggerUIBundle(swaggerOptions);
  }
  function trySwagger(cfg) {
    {
      // Add a button to set auth to redoc
      $(cfg.authBtnPosSelector).after($("\n      <div class=\"".concat($("a[download]:eq(0)").attr("class"), " btn setAuth\">") + cfg.authBtnText + "</div>\n    "));
      $(".btn.setAuth").click(function () {
        // The pop-up window in swaggerBox can be displayed, but the swaggerBox itself is hidden
        var $swaggerBox = $(".swaggerBox").removeClass("hide").css({
          visibility: "hidden",
          height: "",
          left: "",
          top: "",
          width: ""
        });
        $(".swagger-ui .auth-wrapper .authorize.unlocked").click(); // Open the pop-up window for setting auth
        var $modal = $(".swagger-ui .dialog-ux .modal-ux");
        $modal.css({
          visibility: "visible"
        });
        $(".swagger-ui .auth-btn-wrapper .btn-done, .swagger-ui .dialog-ux .modal-ux-header .close-modal").click(function () {
          $swaggerBox.addClass("hide").css({
            visibility: ""
          });
          $modal.css({
            visibility: ""
          });
        });
      });
    }

    // Add try button
    $(".http-verb").before("\n    <button class=\"tryBtn\">".concat(cfg.tryText, "</button>\n  "));
    $(".tryBtn").click(function (event) {
      event.stopPropagation();
      var $tryBtn = $(this);
      $(".swaggerShadow").remove(); // First clear all temporary elements
      var $operation = $tryBtn.parents("[data-section-id]").last(); // Get the outermost api box
      window.initTry.$operation = $operation;
      if ($operation.hasClass("try") === true) {
        // If the current API is already in the try state, uninstall and exit the function
        $(".swaggerBox").addClass("hide").removeClass("show");
        $operation.removeClass("try");
        return false;
      }
      $("[data-section-id]").removeClass("try"); // Delete the try class name of all other APIs
      $operation.addClass("try"); // Add try class name to the currently clicked api

      // The following 3 lines add class names to some necessary elements to facilitate acquisition or identification
      $(".try>div>div:nth-child(2)").addClass("apiBlock");
      $(".try .apiBlock>div:nth-child(1)").addClass("fullApiBox");
      if (window.initTry.cfg.redocVersion !== 'next' && window.compareVersions.compare(window.initTry.cfg.redocVersion, "2.0.0-rc.32", "<=")) {
        $(".try .apiBlock>div>div:nth-child(1)").addClass("fullApi");
      } else {
        $(".try .apiBlock>div>button").addClass("fullApi");
      }
      var appendSwaggerShadow = function appendSwaggerShadow() {
        return $(".try .fullApiBox").append("<div class=\"swaggerShadow\"></div>");
      }; // Add a swaggerShadow element to synchronize the height of swagger and use it to occupy space
      // If cfg.trySwaggerInApi === true then swaggerShadow will be added under fullApi, otherwise it may be under reqBox
      if (cfg.trySwaggerInApi === true) {
        appendSwaggerShadow();
      } else {
        var requestSel = ".try .apiBlock h3";
        $(requestSel).parent().addClass("reqBox");
        if ($(requestSel).length && $(requestSel).text().includes("Request")) {
          $(".try .reqBox").append("<div class=\"swaggerShadow\"></div>");
        } else {
          appendSwaggerShadow();
        }
      }

      // get the click method and api
      var fullApi = $(".try .fullApi").text().replace(cfg.tryText, '').trim();
      var _fullApi$match = fullApi.match(/(\w+)(.*)/),
        _fullApi$match2 = _slicedToArray(_fullApi$match, 3),
        method = _fullApi$match2[1],
        api = _fullApi$match2[2];
      var selStr = ".opblock-summary-".concat(method, " [data-path=\"").concat(api, "\"]");
      var $swaggerApiDom = $(selStr);
      var $opblock = $swaggerApiDom.parents(".opblock"); // Get the currently clicked swagger api, and it is not an expanded element
      var getSwaggerBoxHeight = function getSwaggerBoxHeight() {
        return getAbsolutePosition($(".swaggerBox")[0]).height + "px";
      };
      var getShadowPos = function getShadowPos() {
        // Get the position of swaggerShadow
        var pos = {};
        pos = getAbsolutePosition($(".try .swaggerShadow")[0]) || {};
        pos = Object.keys(pos).reduce(function (prev, cur, index) {
          // Add px to the number without unit, undefined when the number is 0
          var val = pos[cur];
          return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, cur, _typeof(val) === "number" ? val > 0 ? "".concat(val, "px") : undefined : val));
        }, {});
        return pos;
      };
      var pos = getShadowPos();
      var oldHeight = pos.height ? "".concat(pos.height) : undefined;
      if ($opblock.hasClass("open") === false) {
        $swaggerApiDom.click(); // turn on
      }

      $opblock.addClass("open");
      function renderPos(onlyWhenVisible) {
        var pos = getShadowPos();
        if (!onlyWhenVisible || $(".swaggerBox").hasClass("show")) {
          // Move swagger to the position of swaggerShadow
          $(".swaggerBox").css({
            left: "".concat(pos.left),
            top: "".concat(pos.top),
            width: "".concat(pos.width),
            height: oldHeight
          }).removeClass("hide").addClass('show');
        }

        // Synchronize the size of swaggerShadow to make it as big as swaggerBox
        $(".swaggerShadow").css({
          height: getSwaggerBoxHeight()
        });
        // scroll the swagger view to the same api position
        $(".swaggerBox").scrollTo($swaggerApiDom.parent());
        changeFn();
      }
      function changeFn() {
        var opblockPos = getAbsolutePosition($opblock[0]);
        if (opblockPos.height === 0) {
          return false; // The height is 0, no processing
        } else {
          var newHeight = "".concat(opblockPos.height, "px");
          if (oldHeight !== newHeight) {
            $(".swaggerBox").scrollTo($swaggerApiDom.parent());
            $(".swaggerBox").css({
              height: newHeight
            });
            $(".swaggerShadow").css({
              height: getSwaggerBoxHeight()
            });
            oldHeight = newHeight;
          }
        }
      }
      renderPos();
      setTimeout(renderPos, 0);
      window.initTry.renderPos = renderPos;
      var observer = new MutationObserver(changeFn);
      observer.disconnect();
      observer.observe($opblock[0], {
        attributes: true,
        childList: true,
        subtree: true
      });
      var redoc_dom = window.initTry.cfg.redocOptions[2];
      $(redoc_dom).off('click.redoc_dom').on('click.redoc_dom', function () {
        renderPos();
        if (isVisible(document.querySelector(".try .fullApiBox")) === false) {
          $(".swaggerBox").addClass("hide").removeClass("show");
          window.initTry.$operation.removeClass("try");
        }
      });
    });

    // When changing the browser window size, reset the state of swaggerBox
    $(window).resize(debounce(function () {
      window.initTry.renderPos(true);
    }, 500));
  }
  function isVisible(element) {
    var isVisible = true;
    var parentElement = element;
    while (parentElement) {
      var parentStyle = getComputedStyle(parentElement);
      if (false || parentStyle.display === 'none' || parentStyle.visibility === 'hidden' || parentStyle.opacity === '0' || parentStyle.opacity === '0.0') {
        isVisible = false;
        break;
      }
      parentElement = parentElement.offsetParent;
    }
    return isVisible;
  }
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      script.src = src;
      document.head.append(script);
    });
  }
  function debounce(fn, wait) {
    // anti-shake
    var timer = null;
    return function () {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn, wait);
    };
  }
  function getAbsolutePosition(domObj) {
    // Get element position and size
    // If the function has no value, the return object is empty
    if (!domObj) return null;
    var width = domObj.offsetWidth;
    var height = domObj.offsetHeight;
    // Start traversing outward from the target element, accumulate top and left values
    var top;
    var left;
    for (top = domObj.offsetTop, left = domObj.offsetLeft; domObj = domObj.offsetParent;) {
      top += domObj.offsetTop;
      left += domObj.offsetLeft;
    }
    var right = document.body.offsetWidth - width - left;
    var bottom = document.body.offsetHeight - height - top;

    // Returns the coordinate set of positioned elements
    return {
      width: width,
      height: height,
      top: top,
      left: left,
      right: right,
      bottom: bottom
    };
  }
  function dataType(data, type) {
    var dataType = Object.prototype.toString.call(data).match(/\s(.+)]/)[1].toLowerCase();
    return type ? dataType === type.toLowerCase() : dataType;
  }
})(window);