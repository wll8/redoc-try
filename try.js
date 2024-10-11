import cssText from './style.less?inline';
;((window, undefined) => {
window.initTry = window.initTry || initTry

/**

global variable:

window.initTry
window.initTry.cfg
window.initTry.renderPos
window.initTry.$operation

*/

function initTry(userCfg) {
  const cfg = cfgHandle(userCfg)
  window.initTry.cfg = cfg
  loadScript(`${cfg.cndPrefix}jquery@3.6.0/dist/jquery.min.js`)
    .then(() => loadScript(`${cfg.cndPrefix}jquery.scrollto@2.1.2/jquery.scrollTo.min.js`))
    .then(() => loadScript(`${cfg.cndPrefix}swagger-ui-dist@5/swagger-ui-bundle.js`))
    .then(() => loadScript(`${cfg.cndPrefix}compare-versions@3.6.0/index.min.js`))
    .then(() => {
      if(cfg.onlySwagger) {
        initSwagger(cfg.swaggerOptions)
        $(`.swaggerBox`).addClass(`onlySwagger`)
      } else {
        Redoc.init(...cfg.redocOptions)
      }
      initCss()
    })
    .catch(() => {
      console.error('Something went wrong.')
    })
}

function cfgHandle(userCfg) {
  if (typeof (userCfg) === `string`) {
    userCfg = { openApi: userCfg }
  }
  const { redocOptions } = userCfg
  const testOpenApi = `https://httpbin.org/spec.json` // `https://petstore.swagger.io/v2/swagger.json`
  const redocOptionsRes = dataType(redocOptions, `object`) ? [undefined, redocOptions] : (redocOptions || [])
  const [redoc_openApi, redoc_options, redoc_dom, redoc_callBack] = redocOptionsRes
  const redocVersion = () => {
    return userCfg.redocVersion || ( // Read the redoc version number from the label
      (
        $(`script[src*="/redoc@"]`).attr(`src`) || ``
      ).match(/redoc@(.+?)\//) || []
    )[1]
  }
  if(typeof(userCfg.openApi) === `object`) {
    const { openApi } = userCfg
    const blob = new Blob([JSON.stringify(openApi)], {type: `application/json`})
    const url  = URL.createObjectURL(blob)
    userCfg.openApi = url
    userCfg._openApiJSON = openApi
  }
  const cfg = {
    cndPrefix: `https://cdn.jsdelivr.net/npm/`,
    openApi: testOpenApi,
    onlySwagger: false, // Only render swagger, in some cases redoc will render openApi error
    tryText: `try`, // try button text
    trySwaggerInApi: true, // Is the swagger debugging window displayed under the api? true: yes, false: displayed after the request, when the request is relatively large, you may not see the debugging window
    cfgBtnPosSelector: `h1:eq(0)`,
    cfgBtnText: `Swagger configuration`,
    pure: false, // Concise mode, hide some existing elements of redoc

    ...userCfg,
    redocVersion,
    swaggerOptions: {
      url: userCfg.openApi || testOpenApi,
      dom_id: `#swagger-ui`,
      onComplete: () => {
        if(Boolean(cfg.onlySwagger) === false) {
          onComplete(cfg)
        }
      },
      tryItOutEnabled: true,
      ...userCfg.swaggerOptions
    },
    redocOptions: [
      redoc_openApi || userCfg._openApiJSON || userCfg.openApi || testOpenApi,
      redoc_options || {enableConsole: true},
      redoc_dom || document.getElementById('redoc-container'),
      () => {
        redoc_callBack && redoc_callBack()
        initSwagger(cfg.swaggerOptions)
        $(`.swaggerBox`).addClass(`hide`)
        cfg.pure && $(`.swaggerBox`).addClass(`pure`)
      },
    ],
  }
  return cfg
}

function initCss() {
  // reset swagger-ui css
  $('head').append(`
    <style>
      ${cssText}
    </style>
  `)
}

function initSwagger(swaggerOptions) {
  // dom
  $('body').append(`
    <div class="swaggerBox">
      <div id="swagger-ui"></div>
    </div>
  `)
  // swagger-ui.css
  $('head').append(`<link rel="stylesheet" href="${window.initTry.cfg.cndPrefix}swagger-ui-dist@5/swagger-ui.css" />`)
  SwaggerUIBundle(swaggerOptions)
}

/**
 * Display a part of the box as a pop-up window
 * @param {*} $box Box
 * @param {*} $ref The selector to display
 */
async function popUps($box, $ref) {
  return new Promise(async (resolve, reject) => {
    await sleep(100)
    $box.removeClass(`hide`).removeClass(`show`).attr(`style`, ``).css({
      // overflow: `initial`
    })
    $box.addClass(getClassName(`modal-box`))
    $ref.addClass(getClassName(`modal-relative`))
    const fn = function(event) {
      const content = window.getComputedStyle(event.target, '::before').getPropertyValue('content') 
      if(`"modal-box"` === content) {
        $box.removeClass(getClassName(`modal-box`))
        $ref.removeClass(getClassName(`modal-relative`))
        
        $(`body`).off('click', fn);
        resolve()
      }
    }
    await sleep(500)
    $(`body`).on('click', fn);
  })
}

function onComplete(cfg) {
  { // Add a button to set auth to redoc
    $(cfg.cfgBtnPosSelector).after($(`
      <div class="${$(`a[download]:eq(0)`).attr(`class`)} btn setAuth">` + cfg.cfgBtnText + `</div>
    `))
    $(`.btn.setAuth`).click(async () => {
      // The pop-up window in swaggerBox can be displayed, but the swaggerBox itself is hidden
      const $swaggerBox = $(`.swaggerBox`)
      await popUps($swaggerBox, $(`.swagger-ui .scheme-container`))
      $swaggerBox.addClass(`hide`)
    })
  }

  // Add try button
  $(`.http-verb`).before(`
    <button class="tryBtn">${cfg.tryText}</button>
  `)
  $(`.tryBtn`).css({
    lineHeight: '20px',
    marginRight: '7px',
  }).click(function (event) {
    event.stopPropagation()
    const $tryBtn = $(this)
    $(`.swaggerShadow`).remove() // First clear all temporary elements
    const $operation = $tryBtn.parents(`[data-section-id]`).last() // Get the outermost api box
    window.initTry.$operation = $operation
    if ($operation.hasClass(`try`) === true) { // If the current API is already in the try state, uninstall and exit the function
      $(`.swaggerBox`).addClass(`hide`).removeClass(`show`)
      $operation.removeClass(`try`)
      return false
    }
    $(`[data-section-id]`).removeClass(`try`) // Delete the try class name of all other APIs
    $operation.addClass(`try`) // Add try class name to the currently clicked api

    // The following 3 lines add class names to some necessary elements to facilitate acquisition or identification
    $(`.try>div>div:nth-child(2)`).addClass(`apiBlock`)
    $(`.try .apiBlock>div:nth-child(1)`).addClass(`fullApiBox`)
    if(window.initTry.cfg.redocVersion() !== 'next' && window.compareVersions.compare(window.initTry.cfg.redocVersion(), `2.0.0-rc.32`, `<=`)) {
      $(`.try .apiBlock>div>div:nth-child(1)`).addClass(`fullApi`)
    } else {
      $(`.try .apiBlock>div>button`).addClass(`fullApi`)
    }
    const appendSwaggerShadow = () => $(`.try .fullApiBox`).append(`<div class="swaggerShadow"></div>`) // Add a swaggerShadow element to synchronize the height of swagger and use it to occupy space
    // If cfg.trySwaggerInApi === true then swaggerShadow will be added under fullApi, otherwise it may be under reqBox
    if (cfg.trySwaggerInApi === true) {
      appendSwaggerShadow()
    } else {
      const requestOrResponseSel = `.try .apiBlock h3`
      $(requestOrResponseSel).parent().addClass(`reqBox`)
      if ($(requestOrResponseSel).length && ($(requestOrResponseSel).text().includes(`Request`) || $(requestOrResponseSel).text().includes(`Response`))) {
        $(`.try .reqBox`).append(`<div class="swaggerShadow"></div>`)
      } else {
        appendSwaggerShadow()
      }
    }

    // get the click method and api
    const fullApi = $(`.try .fullApi`).text().replace(cfg.tryText, '').trim()
    const [, method, api] = fullApi.match(/(\w+)(.*)/)
    const selStr = `.opblock-summary-${method} [data-path="${api}"]`
    const $swaggerApiDom = $(selStr)
    const $opblock = $swaggerApiDom.parents(`.opblock`) // Get the currently clicked swagger api, and it is not an expanded element
    const getSwaggerBoxHeight = () => getAbsolutePosition($(`.swaggerBox`)[0]).height + `px`
    const getShadowPos = () => {
      // Get the position of swaggerShadow
      let pos = {}
      pos = getAbsolutePosition($(`.try .swaggerShadow`)[0]) || {}
      pos = Object.keys(pos).reduce((prev, cur, index) => { // Add px to the number without unit, undefined when the number is 0
        const val = pos[cur]
        return {
          ...prev,
          [cur]: typeof (val) === `number` ? (val > 0 ? `${val}px` : undefined) : val,
        }
      }, {})
      return pos
    }

    const pos = getShadowPos()
    let oldHeight = pos.height ? `${pos.height}` : undefined
    if ($opblock.hasClass(`open`) === false) {
      $swaggerApiDom.click() // turn on
    }
    $opblock.addClass(`open`)

    function renderPos(onlyWhenVisible) {
      let pos = getShadowPos()

      if (!onlyWhenVisible || $(".swaggerBox").hasClass("show")) {
        // Move swagger to the position of swaggerShadow
        $(`.swaggerBox`).css({
          left: `${pos.left}`,
          top: `${pos.top}`,
          width: `${pos.width}`,
          height: oldHeight,
        }).removeClass(`hide`).addClass('show')
      }
  
      // Synchronize the size of swaggerShadow to make it as big as swaggerBox
      $(`.swaggerShadow`).css({
        height: getSwaggerBoxHeight()
      })
      // scroll the swagger view to the same api position
      $(`.swaggerBox`).scrollTo($swaggerApiDom.parent())
      changeFn()
    }
    function changeFn() {
      const opblockPos = getAbsolutePosition($opblock[0])
      if (opblockPos.height === 0) {
        return false; // The height is 0, no processing
      } else {
        let newHeight = `${opblockPos.height}px`
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
    renderPos()
    setTimeout(renderPos, 0)
    window.initTry.renderPos = renderPos
    const observer = new MutationObserver(changeFn)
    observer.disconnect()
    observer.observe($opblock[0], {
      attributes: true,
      childList: true,
      subtree: true,
    })
    const redoc_dom = window.initTry.cfg.redocOptions[2]
    $(redoc_dom).off('click.redoc_dom').on('click.redoc_dom', () => {
      renderPos()
      if(isVisible(document.querySelector(`.try .fullApiBox`)) === false) {
        $(`.swaggerBox`).addClass(`hide`).removeClass(`show`)
        window.initTry.$operation.removeClass(`try`)
      }
    })
  })

  // When changing the browser window size, reset the state of swaggerBox
  $(window).resize(debounce(() => {
    window.initTry.renderPos(true)
  }, 500))
}

function isVisible(element) {
  if (!element) {
    return false
  }

  let isVisible = true
  let parentElement = element
  
  while (parentElement) {
    const parentStyle = getComputedStyle(parentElement)
    
    if (
      false
      || parentStyle.display === 'none'
      || parentStyle.visibility === 'hidden'
      || parentStyle.opacity === '0' || parentStyle.opacity === '0.0'
    ) {
      isVisible = false
      break
    }
    
    parentElement = parentElement.offsetParent
  }
  return isVisible
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = resolve
    script.onerror = reject
    script.src = src
    document.head.append(script)
  })
}

function debounce(fn, wait) { // anti-shake
  let timer = null
  return function () {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

function getAbsolutePosition(domObj) { // Get element position and size
  // If the function has no value, the return object is empty
  if (!domObj) return null;
  const width = domObj.offsetWidth
  const height = domObj.offsetHeight
  // Start traversing outward from the target element, accumulate top and left values
  let top
  let left
  for (top = domObj.offsetTop, left = domObj.offsetLeft; domObj = domObj.offsetParent;) {
    top += domObj.offsetTop
    left += domObj.offsetLeft
  }
  const right = document.body.offsetWidth - width - left
  const bottom = document.body.offsetHeight - height - top

  // Returns the coordinate set of positioned elements
  return { width, height, top, left, right, bottom }
}

function dataType(data, type) {
  const dataType = Object.prototype.toString.call(data).match(/\s(.+)]/)[1].toLowerCase()
  return type ? (dataType === type.toLowerCase()) : dataType
}

async function sleep(time = 100) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function getClassName(name = ``) {
  return `redoc-try-${name}`
}
})(window);
