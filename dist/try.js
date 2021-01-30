"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

;

(function (window, undefined) {
  window.initTry = window.initTry || initTry;

  function initTry(userCfg) {
    loadScript("//cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js").then(function () {
      return loadScript("//cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js");
    }).then(function () {
      return loadScript("//cdn.jsdelivr.net/npm/swagger-ui-dist@3.25.1/swagger-ui-bundle.js");
    }).then(function () {
      return loadScript("//cdn.jsdelivr.net/npm/compare-versions@3.6.0/index.min.js");
    }).then(function () {
      var cfg = cfgHandle(userCfg);
      window.cfg = cfg;

      if (cfg.onlySwagger) {
        initSwagger(cfg.swaggerOptions);
      } else {
        var _Redoc;

        (_Redoc = Redoc).init.apply(_Redoc, _toConsumableArray(cfg.redocOptions));
      }
    })["catch"](function () {
      console.error('Something went wrong.');
    });
  }

  function cfgHandle(userCfg) {
    if (typeof userCfg === "string") {
      userCfg = {
        openApi: userCfg
      };
    }

    var _userCfg = userCfg,
        redocOptions = _userCfg.redocOptions;
    var testOpenApi = "//httpbin.org/spec.json"; // `//petstore.swagger.io/v2/swagger.json`

    var redocOptionsRes = dataType(redocOptions, "object") ? [undefined, redocOptions] : redocOptions || [];

    var _redocOptionsRes = _slicedToArray(redocOptionsRes, 4),
        redoc_openApi = _redocOptionsRes[0],
        redoc_options = _redocOptionsRes[1],
        redoc_dom = _redocOptionsRes[2],
        redoc_callBack = _redocOptionsRes[3];

    var redocVersion = ( // Read the redoc version number from the label
    ($("script[src*=\"/redoc@\"]").attr("src") || "").match(/redoc@(.+?)\//) || [])[1];

    var cfg = _objectSpread(_objectSpread({
      openApi: testOpenApi,
      onlySwagger: false,
      // Only render swagger, in some cases redoc will render openApi error
      tryText: "try",
      // try button text
      trySwaggerInApi: true,
      // Is the swagger debugging window displayed under the api? true: yes, false: displayed after the request, when the request is relatively large, you may not see the debugging window
      redocVersion: redocVersion
    }, userCfg), {}, {
      swaggerOptions: _objectSpread({
        url: userCfg.openApi || testOpenApi,
        dom_id: "#swagger-ui",
        onComplete: function onComplete() {
          trySwagger(cfg);
        }
      }, userCfg.swaggerOptions),
      redocOptions: [redoc_openApi || userCfg.openApi || testOpenApi, redoc_options || {
        enableConsole: true
      }, redoc_dom || document.getElementById('redoc-container'), function () {
        redoc_callBack && redoc_callBack();
        initSwagger(cfg.swaggerOptions);
        $(".swaggerBox").addClass("hide");
      }]
    });

    return cfg;
  }

  function initCss() {
    // reset swagger-ui css
    $('head').append("\n    <style>\n      /* Reset the style of swagger-ui */\n      body .swagger-ui .wrapper {\n        padding: 0;\n      }\n      /* Disable api bar to avoid problems */\n      body .swagger-ui .opblock .opblock-summary {\n        cursor: not-allowed;\n        pointer-events: none;\n      }\n      /* Disable the api bar, but exclude the authorization button */\n      body .swagger-ui .authorization__btn {\n        cursor: initial;\n        pointer-events: initial;\n      }\n      /* Set the position of swaggerBox with body as the relative element */\n      body {\n        position: relative;\n      }\n      @media print, screen and (max-width: 85rem) {\n        .dtUibw {\n          padding: 4px;\n        }\n      }\n      .swaggerBox {\n        border-radius: 4px;\n        background-color: #fff;\n        width: 100%;\n        height: 100vh;\n        overflow: hidden;\n        position: absolute;\n        top: 0;\n        left: 0;\n        z-index: 1;\n      }\n      .hide {\n        visibility: hidden;\n        cursor: none;\n        width: 0;\n        height: 0;\n      }\n      .show {\n        visibility: visible;\n        cursor: initial;\n      }\n      .tryBtn {\n        margin-right: 10px;\n        background-color: #fff;\n      }\n    </style>\n  ");
  }

  function initSwagger(swaggerOptions) {
    // dom
    $('body').append("\n    <div class=\"swaggerBox\">\n      <div id=\"swagger-ui\"></div>\n    </div>\n  "); // swagger-ui.css

    $('head').append("<link rel=\"stylesheet\" href=\"//cdn.jsdelivr.net/npm/swagger-ui-dist@3.25.1/swagger-ui.css\" />");
    SwaggerUIBundle(swaggerOptions);
  }

  function trySwagger(cfg) {
    initCss();
    {
      // Add a button to set auth to redoc
      $("h1:eq(0)").after($("\n      <div class=\"".concat($("a[href*=\"swagger.json\"]:eq(0)").attr("class"), " btn setAuth\">AUTHORIZE</div>\n    ")));
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
    } // Add try button

    $(".http-verb").before("\n    <button class=\"tryBtn\">".concat(cfg.tryText, "</button>\n  "));
    $(".tryBtn").click(function (event) {
      event.stopPropagation();
      var $tryBtn = $(this);
      $(".swaggerShadow").remove(); // First clear all temporary elements

      var $operation = $tryBtn.parents("[data-section-id]"); // Get the outermost api box

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

      if (window.compareVersions.compare(window.cfg.redocVersion, "2.0.0-rc.32", "<=")) {
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
      } // get the click method and api


      var fullApi = $(".try .fullApi").text().replace(cfg.tryText, '').trim();

      var _fullApi$match = fullApi.match(/(\w+)(.*)/),
          _fullApi$match2 = _slicedToArray(_fullApi$match, 3),
          method = _fullApi$match2[1],
          api = _fullApi$match2[2]; // Get the position of swaggerShadow


      var pos = {};
      pos = getAbsolutePosition($(".try .swaggerShadow")[0]);
      pos = Object.keys(pos).reduce(function (prev, cur, index) {
        // Add px to the number without unit, undefined when the number is 0
        var val = pos[cur];
        return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, cur, typeof val === "number" ? val > 0 ? "".concat(val, "px") : undefined : val));
      }, {});
      var oldHeight = pos.height ? "".concat(pos.height) : undefined; // Move swagger to the position of swaggerShadow

      var getSwaggerBoxHeight = function getSwaggerBoxHeight() {
        return getAbsolutePosition($(".swaggerBox")[0]).height + "px";
      };

      $(".swaggerBox").css({
        left: "".concat(pos.left),
        top: "".concat(pos.top),
        width: "".concat(pos.width),
        height: oldHeight
      }).removeClass("hide").addClass('show'); // Synchronize the size of swaggerShadow to make it as big as swaggerBox

      $(".swaggerShadow").css({
        height: getSwaggerBoxHeight()
      }); // scroll the swagger view to the same api position

      var selStr = ".opblock-summary-".concat(method, " [data-path=\"").concat(api, "\"]");
      var $swaggerApiDom = $(selStr);
      var $opblock = $swaggerApiDom.parents(".opblock"); // Get the currently clicked swagger api, and it is not an expanded element

      if ($opblock.hasClass("open") === false) {
        $swaggerApiDom.click(); // turn on
      }

      $opblock.addClass("open");
      console.log("selStr", selStr);
      $(".swaggerBox").scrollTo($swaggerApiDom.parent());

      function changeFn() {
        var pos = getAbsolutePosition($opblock[0]);

        if (pos.height === 0) {
          return false; // The height is 0, no processing
        } else {
          var newHeight = "".concat(pos.height, "px");

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

      var observer = new MutationObserver(changeFn);
      observer.disconnect();
      observer.observe($opblock[0], {
        attributes: true,
        childList: true,
        subtree: true
      });
    }); // When changing the browser window size, reset the state of swaggerBox

    $(window).resize(debounce(function () {
      $(".swaggerBox").addClass("hide").removeClass("show").css({
        left: 0,
        top: 0
      });
      $("[data-section-id^=\"operation/\"]").removeClass("try");
    }, 500));
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
    var height = domObj.offsetHeight; // Start traversing outward from the target element, accumulate top and left values

    var top;
    var left;

    for (top = domObj.offsetTop, left = domObj.offsetLeft; domObj = domObj.offsetParent;) {
      top += domObj.offsetTop;
      left += domObj.offsetLeft;
    }

    var right = document.body.offsetWidth - width - left;
    var bottom = document.body.offsetHeight - height - top; // Returns the coordinate set of positioned elements

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