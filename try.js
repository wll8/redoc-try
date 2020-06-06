function seriesLoadScriptsCss(scripts, callback) {
  if (typeof (scripts) != "object") var scripts = [scripts];
  var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) { //递归
    s[i] = document.createElement("script");
    s[i].setAttribute("type", "text/javascript");
    s[i].onload = s[i].onreadystatechange = function () { //Attach handlers for all browsers
      if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
        this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
        if (i != last) recursiveLoad(i + 1); else if (typeof (callback) == "function") callback();
      }
    }
    s[i].setAttribute("src", scripts[i]);
    HEAD.appendChild(s[i]);
  };
  recursiveLoad(0);
}
function debounce(fn, wait) { // 防抖
  var timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
  }
}
function getAbsolutePosition(domObj) { // 获取元素位置及大小
  // 如果函数没有传入值的话返回对象为空的
  if (!domObj) return null;
  var w = domObj.offsetWidth, h = domObj.offsetHeight;
  // 从目标元素开始向外遍历，累加top和left值
  var t, l;
  for (t = domObj.offsetTop, l = domObj.offsetLeft; domObj = domObj.offsetParent;) {
    t += domObj.offsetTop;
    l += domObj.offsetLeft;
  }
  var r = document.body.offsetWidth - w - l;
  var b = document.body.offsetHeight - h - t;

  // 返回定位元素的坐标集合
  return { width: w, height: h, top: t, left: l, right: r, bottom: b };
}

function initTry (userCfg) {
  seriesLoadScriptsCss([
    `//cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js`,
    `//cdn.jsdelivr.net/npm/jquery.scrollto@2.1.2/jquery.scrollTo.min.js`,
    `//unpkg.com/swagger-ui-dist@3.25.1/swagger-ui-bundle.js`,
  ], () => {
    const cfg = {
      // petstore.swagger.io/v2/swagger.json
      openApi: `//httpbin.org/spec.json`,
      ...userCfg,
    }
    if(cfg.onlySwagger) {
      initSwagger(cfg)
    } else {
      initTryOk(cfg)
    }
  })
}

function initSwagger(cfg) {
  // dom
  $('body').append(`
    <div class="swaggerBox">
      <div id="swagger-ui"></div>
    </div>
  `)
  // swagger-ui.css
  $('head').append('<link href="//unpkg.com/swagger-ui-dist@3.25.1/swagger-ui.css" rel="stylesheet" type="text/css" />')
  SwaggerUIBundle({
    url: cfg.openApi,
    dom_id: '#swagger-ui',
    onComplete: () => {
      trySwagger(cfg)
    }
  })
}

function initTryOk (cfg) {
  // reset swagger-ui css
  $('head').append(`
    <style>
      /* 重置 swagger-ui 的样式 */
      body .swagger-ui .wrapper {
        padding: 0;
      }
      /* 禁用 api 条, 以免产生问题 */
      body .swagger-ui .opblock.opblock-get .opblock-summary {
        cursor: not-allowed;
        pointer-events: none;
      }
      /* 禁用 api 条, 但是排除授权按钮 */
      body .swagger-ui .authorization__btn {
        cursor: initial;
        pointer-events: initial;
      }
      /* 以 body 为相对元素, 设置 swaggerBox 的位置 */
      body {
        position: relative;
      }
      @media print, screen and (max-width: 85rem) {
        .dtUibw {
          padding: 4px;
        }
      }
      .swaggerBox {
        border-radius: 4px;
        background-color: #fff;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .hide {
        visibility: hidden;
        cursor: none;
        width: 0;
        height: 0;
      }
      .show {
        visibility: visible;
        cursor: initial;
      }
      .tryBtn {
        margin-right: 10px;
        background-color: #fff;
      }
    </style>
  `)

  const openApi = cfg.openApi
  Redoc.init(openApi, {
    enableConsole: true,
    // scrollYOffset: 50
  }, document.getElementById('redoc-container'), () => {
    initSwagger(cfg)
    $(`.swaggerBox`).addClass(`hide`)
  })
}


function trySwagger(cfg) {
  cfg = {
    tryText: `try`, // 尝试按钮的文本
    trySwaggerInApi: true, // 是否把 swagger 调试窗口显示在 api 下面? true: 是, false: 显示在 Request 后面, 当 Request 比较大时可能看不到调试窗口了
    ...cfg,
  }

  { // 向 redoc 添加设置 auth 的按钮
    $(`.sc-htoDjs.sc-fYxtnH.dTJWQH`).after($(`
      <div class="sc-tilXH jIdpVJ btn setAuth">AUTHORIZE</div>
    `))
    $(`.btn.setAuth`).click(() => {
      // 可以显示 swaggerBox 中的弹窗, 但是隐藏 swaggerBox 本身
      const $swaggerBox = $(`.swaggerBox`)
        .removeClass(`hide`)
        .css({
          visibility: `hidden`,
          height: ``,
          left: ``,
          top: ``,
          width: ``,
        })
      $(`.swagger-ui .auth-wrapper .authorize.unlocked`).click() // 打开设置 auth 的弹窗
      const $modal = $(`.swagger-ui .dialog-ux .modal-ux`)
      $modal.css({visibility: `visible`})
      $(`.swagger-ui .auth-btn-wrapper .btn-done, .swagger-ui .dialog-ux .modal-ux-header .close-modal`).click(() => {
        $swaggerBox.addClass(`hide`).css({visibility: ``})
        $modal.css({visibility: ``})
      });
    })
  }

  // 添加尝试按钮
  $(`.http-verb`).before(`
    <button class="tryBtn">${cfg.tryText}</button>
  `)
  $(`.tryBtn`).click(function (event) {
    event.stopPropagation()
    const $tryBtn = $(this)
    console.log(`$tryBtn`, $tryBtn)
    $(`.swaggerShadow`).remove() // 先清除所有临时元素
    const $operation = $tryBtn.parents(`[data-section-id]`) // 获取最外层 api box
    if ($operation.hasClass(`try`) === true) { // 如果当前 api 已经是 try 状态, 则卸载并退出函数
      $(`.swaggerBox`).addClass(`hide`).removeClass(`show`)
      $operation.removeClass(`try`)
      return false
    }
    $(`[data-section-id]`).removeClass(`try`) // 删除其他所有 api 的 try 类名
    $operation.addClass(`try`) // 给当前点击的 api 添加 try 类名

    // 以下 3 行给一些必要元素添加类名, 以方便获取或识别
    $(`.try>div>div:nth-child(2)`).addClass(`apiBlock`)
    $(`.try .apiBlock>div:nth-child(1)`).addClass(`fullApiBox`)
    $(`.try .apiBlock>div>div:nth-child(1)`).addClass(`fullApi`)
    const appendSwaggerShadow = () => $(`.try .fullApiBox`).append(`<div class="swaggerShadow"></div>`) // 添加一个 swaggerShadow 元素来同步 swagger 的高度, 用来占位
    // 如果 cfg.trySwaggerInApi === true 则 swaggerShadow 会被添加到 fullApi 下面, 否则可能会在 reqBox 下面
    if (cfg.trySwaggerInApi === true) {
      appendSwaggerShadow()
    } else {
      const requestSel = `.try .apiBlock h3`
      $(requestSel).parent().addClass(`reqBox`)
      if ($(requestSel).length && $(requestSel).text().includes(`Request`)) {
        $(`.try .reqBox`).append(`<div class="swaggerShadow"></div>`)
      } else {
        appendSwaggerShadow()
      }
    }

    // 获取点击的 method 和 api
    const fullApi = $(`.try .fullApi`).text().replace(cfg.tryText, '').trim()
    const [, method, api] = fullApi.match(/(\w+)(.*)/)

    // 获取 swaggerShadow 的位置
    let pos = {}
    pos = getAbsolutePosition($(`.try .swaggerShadow`)[0])
    pos = Object.keys(pos).reduce((prev, cur, index) => { // 给没有单位的数字添加 px, 数字为 0 时为 undefined
      const val = pos[cur]
      return {
        ...prev,
        [cur]: typeof (val) === `number` ? (val > 0 ? `${val}px` : undefined) : val,
      }
    }, {})

    let oldHeight = pos.height ? `${pos.height}` : undefined

    // 移动 swagger 到 swaggerShadow 的位置
    const getSwaggerBoxHeight = () => getAbsolutePosition($(`.swaggerBox`)[0]).height + `px`
    $(`.swaggerBox`).css({
      left: `${pos.left}`,
      top: `${pos.top}`,
      width: `${pos.width}`,
      height: oldHeight,
    }).removeClass(`hide`).addClass('show')

    // 同步 swaggerShadow 的大小, 让它与 swaggerBox 一样大
    $(`.swaggerShadow`).css({
      height: getSwaggerBoxHeight()
    })

    // 滚动 swagger 视图到相同的 api 位置
    const selStr = `.opblock-summary-${method} [data-path="${api}"]`
    const $swaggerApiDom = $(selStr)
    const $opblock = $swaggerApiDom.parents(`.opblock`) // 获取当前点击的 swagger api, 并且不是展开状态的元素
    if ($opblock.hasClass(`open`) === false) {
      $swaggerApiDom.click() // 打开
    }
    $opblock.addClass(`open`)
    console.log(`selStr`, selStr)
    $(`.swaggerBox`).scrollTo($swaggerApiDom.parent())
    // 一些 dom 改变事件, 当用户操作 swagger api, 例如点击 `try it out` 的时候, 重新获取高度, 并同步到 swaggerBox 和 swaggerShadow
    const domChange = `DOMAttrModified DOMAttributeNameChanged DOMCharacterDataModified DOMElementNameChanged DOMNodeInserted DOMNodeInsertedIntoDocument DOMNodeRemoved DOMNodeRemovedFromDocument DOMSubtreeModified`
    $('.opblock').off(domChange) // 监听前先取消所有类似元素的监听, 避免多于的监听造成卡顿
    function changeFn() {
      const pos = getAbsolutePosition($opblock[0])
      if (pos.height === 0) {
        return false; // 高度为 0 则不进行处理
      } else {
        let newHeight = `${pos.height}px`
        if (oldHeight !== newHeight) {
          $(`.swaggerBox`).scrollTo($swaggerApiDom.parent())
          $(`.swaggerBox`).css({
            height: newHeight,
          })
          $(`.swaggerShadow`).css({
            height: getSwaggerBoxHeight()
          })
          oldHeight = newHeight
        }
      }
    }
    setTimeout(changeFn, 500) // 如果没有 dom 改变, 那也执行, 在 500 毫秒(等待样式展示)之后
    $opblock.on(domChange, debounce(changeFn, 100))
  })

  // 当改变浏览器窗口大小时, 重置 swaggerBox 的状态
  $(window).resize(debounce(() => {
    $(`.swaggerBox`).addClass(`hide`).removeClass(`show`).css({ left: 0, top: 0 })
    $(`[data-section-id^="operation/"]`).removeClass(`try`)
  }, 500))
}
