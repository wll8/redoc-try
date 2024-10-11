const z = 'body{position:relative}.redoc-try-modal-box{background-color:#ccc;visibility:hidden;height:initial;left:initial;top:initial;width:initial}.redoc-try-modal-box:before{content:"modal-box";visibility:visible;position:absolute;width:100%;height:100vh;background-color:#00000080;left:0;top:0;font-size:0}.redoc-try-modal-relative{position:relative;visibility:visible}.swaggerBox.hide{visibility:hidden;cursor:none;width:0;height:0}.swaggerBox.show{visibility:visible;cursor:initial}.swaggerBox .swagger-ui .wrapper{padding:0}.swaggerBox .swagger-ui .download-contents{top:-10px;right:0;width:initial}.swaggerBox:not(.redoc-try-modal-box) .swagger-ui .opblock .opblock-summary{cursor:not-allowed;pointer-events:none}.swaggerBox .swagger-ui .authorization__btn{cursor:initial;pointer-events:initial}.swaggerBox{border-radius:4px;background-color:#fff;width:100%;height:100vh;position:absolute;top:0;left:0;z-index:1}.swaggerBox:not(.redoc-try-modal-box){overflow:hidden}.swaggerBox.pure:not(.redoc-try-modal-box) .swagger-ui .opblock-summary{visibility:hidden;padding:0}.swaggerBox.pure:not(.redoc-try-modal-box) .opblock-section thead,.swaggerBox.pure:not(.redoc-try-modal-box) .swagger-ui .opblock-summary *{display:none}.swaggerBox:not(.redoc-try-modal-box) .swagger-ui .opblock .opblock-section-header,.swaggerBox:not(.redoc-try-modal-box) .btn.cancel,.swaggerBox:not(.redoc-try-modal-box) .try-out,.swaggerBox:not(.redoc-try-modal-box) .responses-inner>div>h4,.swaggerBox:not(.redoc-try-modal-box) :not(.live-responses-table).responses-table,.swaggerBox:not(.redoc-try-modal-box) .opblock-body>.opblock-description-wrapper{display:none}.swaggerBox:not(.redoc-try-modal-box) .block div>span:last-child .operation-tag-content>span:last-child{display:block;margin-bottom:100vh}.swaggerBox .tryBtn{margin-right:10px;background-color:#fff}';
((i, x) => {
  i.initTry = i.initTry || _;
  function _(e) {
    const t = q(e);
    i.initTry.cfg = t, p(`${t.cndPrefix}jquery@3.6.0/dist/jquery.min.js`).then(() => p(`${t.cndPrefix}jquery.scrollto@2.1.2/jquery.scrollTo.min.js`)).then(() => p(`${t.cndPrefix}swagger-ui-dist@5/swagger-ui-bundle.js`)).then(() => p(`${t.cndPrefix}compare-versions@3.6.0/index.min.js`)).then(() => {
      t.onlySwagger ? (k(t.swaggerOptions), $(".swaggerBox").addClass("onlySwagger")) : Redoc.init(...t.redocOptions), O();
    }).catch(() => {
      console.error("Something went wrong.");
    });
  }
  function q(e) {
    typeof e == "string" && (e = { openApi: e });
    const { redocOptions: t } = e, r = "https://httpbin.org/spec.json", o = L(t, "object") ? [x, t] : t || [], [n, l, g, u] = o, v = () => e.redocVersion || // Read the redoc version number from the label
    (($('script[src*="/redoc@"]').attr("src") || "").match(/redoc@(.+?)\//) || [])[1];
    if (typeof e.openApi == "object") {
      const { openApi: d } = e, y = new Blob([JSON.stringify(d)], { type: "application/json" }), f = URL.createObjectURL(y);
      e.openApi = f, e._openApiJSON = d;
    }
    const a = {
      cndPrefix: "https://cdn.jsdelivr.net/npm/",
      openApi: r,
      onlySwagger: !1,
      // Only render swagger, in some cases redoc will render openApi error
      tryText: "try",
      // try button text
      trySwaggerInApi: !0,
      // Is the swagger debugging window displayed under the api? true: yes, false: displayed after the request, when the request is relatively large, you may not see the debugging window
      cfgBtnPosSelector: "h1:eq(0)",
      cfgBtnText: "Swagger configuration",
      pure: !1,
      // Concise mode, hide some existing elements of redoc
      ...e,
      redocVersion: v,
      swaggerOptions: {
        url: e.openApi || r,
        dom_id: "#swagger-ui",
        onComplete: () => {
          a.onlySwagger || R(a);
        },
        tryItOutEnabled: !0,
        ...e.swaggerOptions
      },
      redocOptions: [
        n || e._openApiJSON || e.openApi || r,
        l || { enableConsole: !0 },
        g || document.getElementById("redoc-container"),
        () => {
          u && u(), k(a.swaggerOptions), $(".swaggerBox").addClass("hide"), a.pure && $(".swaggerBox").addClass("pure");
        }
      ]
    };
    return a;
  }
  function O() {
    $("head").append(`
    <style>
      ${z}
    </style>
  `);
  }
  function k(e) {
    $("body").append(`
    <div class="swaggerBox">
      <div id="swagger-ui"></div>
    </div>
  `), $("head").append(`<link rel="stylesheet" href="${i.initTry.cfg.cndPrefix}swagger-ui-dist@5/swagger-ui.css" />`), SwaggerUIBundle(e);
  }
  async function j(e, t) {
    return new Promise(async (r, o) => {
      await S(100), e.removeClass("hide").removeClass("show").attr("style", "").css({
        // overflow: `initial`
      }), e.addClass(h("modal-box")), t.addClass(h("modal-relative"));
      const n = function(l) {
        i.getComputedStyle(l.target, "::before").getPropertyValue("content") === '"modal-box"' && (e.removeClass(h("modal-box")), t.removeClass(h("modal-relative")), $("body").off("click", n), r());
      };
      await S(500), $("body").on("click", n);
    });
  }
  function R(e) {
    $(e.cfgBtnPosSelector).after($(`
      <div class="${$("a[download]:eq(0)").attr("class")} btn setAuth">` + e.cfgBtnText + `</div>
    `)), $(".btn.setAuth").click(async () => {
      const t = $(".swaggerBox");
      await j(t, $(".swagger-ui .scheme-container")), t.addClass("hide");
    }), $(".http-verb").before(`
    <button class="tryBtn">${e.tryText}</button>
  `), $(".tryBtn").css({
      lineHeight: "20px",
      marginRight: "7px"
    }).click(function(t) {
      t.stopPropagation();
      const r = $(this);
      $(".swaggerShadow").remove();
      const o = r.parents("[data-section-id]").last();
      if (i.initTry.$operation = o, o.hasClass("try") === !0)
        return $(".swaggerBox").addClass("hide").removeClass("show"), o.removeClass("try"), !1;
      $("[data-section-id]").removeClass("try"), o.addClass("try"), $(".try>div>div:nth-child(2)").addClass("apiBlock"), $(".try .apiBlock>div:nth-child(1)").addClass("fullApiBox"), i.initTry.cfg.redocVersion() !== "next" && i.compareVersions.compare(i.initTry.cfg.redocVersion(), "2.0.0-rc.32", "<=") ? $(".try .apiBlock>div>div:nth-child(1)").addClass("fullApi") : $(".try .apiBlock>div>button").addClass("fullApi");
      const n = () => $(".try .fullApiBox").append('<div class="swaggerShadow"></div>');
      if (e.trySwaggerInApi === !0)
        n();
      else {
        const s = ".try .apiBlock h3";
        $(s).parent().addClass("reqBox"), $(s).length && ($(s).text().includes("Request") || $(s).text().includes("Response")) ? $(".try .reqBox").append('<div class="swaggerShadow"></div>') : n();
      }
      const l = $(".try .fullApi").text().replace(e.tryText, "").trim(), [, g, u] = l.match(/(\w+)(.*)/), v = `.opblock-summary-${g} [data-path="${u}"]`, a = $(v), d = a.parents(".opblock"), y = () => m($(".swaggerBox")[0]).height + "px", f = () => {
        let s = {};
        return s = m($(".try .swaggerShadow")[0]) || {}, s = Object.keys(s).reduce((c, P, E) => {
          const b = s[P];
          return {
            ...c,
            [P]: typeof b == "number" ? b > 0 ? `${b}px` : x : b
          };
        }, {}), s;
      }, T = f();
      let B = T.height ? `${T.height}` : x;
      d.hasClass("open") === !1 && a.click(), d.addClass("open");
      function w(s) {
        let c = f();
        (!s || $(".swaggerBox").hasClass("show")) && $(".swaggerBox").css({
          left: `${c.left}`,
          top: `${c.top}`,
          width: `${c.width}`,
          height: B
        }).removeClass("hide").addClass("show"), $(".swaggerShadow").css({
          height: y()
        }), $(".swaggerBox").scrollTo(a.parent()), C();
      }
      function C() {
        const s = m(d[0]);
        if (s.height === 0)
          return !1;
        {
          let c = `${s.height}px`;
          B !== c && ($(".swaggerBox").scrollTo(a.parent()), $(".swaggerBox").css({
            height: c
          }), $(".swaggerShadow").css({
            height: y()
          }), B = c);
        }
      }
      w(), setTimeout(w, 0), i.initTry.renderPos = w;
      const A = new MutationObserver(C);
      A.disconnect(), A.observe(d[0], {
        attributes: !0,
        childList: !0,
        subtree: !0
      });
      const I = i.initTry.cfg.redocOptions[2];
      $(I).off("click.redoc_dom").on("click.redoc_dom", () => {
        w(), V(document.querySelector(".try .fullApiBox")) === !1 && ($(".swaggerBox").addClass("hide").removeClass("show"), i.initTry.$operation.removeClass("try"));
      });
    }), $(i).resize(H(() => {
      i.initTry.renderPos(!0);
    }, 500));
  }
  function V(e) {
    if (!e)
      return !1;
    let t = !0, r = e;
    for (; r; ) {
      const o = getComputedStyle(r);
      if (o.display === "none" || o.visibility === "hidden" || o.opacity === "0" || o.opacity === "0.0") {
        t = !1;
        break;
      }
      r = r.offsetParent;
    }
    return t;
  }
  function p(e) {
    return new Promise((t, r) => {
      const o = document.createElement("script");
      o.type = "text/javascript", o.onload = t, o.onerror = r, o.src = e, document.head.append(o);
    });
  }
  function H(e, t) {
    let r = null;
    return function() {
      r !== null && clearTimeout(r), r = setTimeout(e, t);
    };
  }
  function m(e) {
    if (!e) return null;
    const t = e.offsetWidth, r = e.offsetHeight;
    let o, n;
    for (o = e.offsetTop, n = e.offsetLeft; e = e.offsetParent; )
      o += e.offsetTop, n += e.offsetLeft;
    const l = document.body.offsetWidth - t - n, g = document.body.offsetHeight - r - o;
    return { width: t, height: r, top: o, left: n, right: l, bottom: g };
  }
  function L(e, t) {
    return Object.prototype.toString.call(e).match(/\s(.+)]/)[1].toLowerCase() === t.toLowerCase();
  }
  async function S(e = 100) {
    return new Promise((t) => setTimeout(t, e));
  }
  function h(e = "") {
    return `redoc-try-${e}`;
  }
})(window);
