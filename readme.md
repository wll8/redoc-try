## redoc try
- [👉 View video](https://cdn.jsdelivr.net/gh/wll8/static/Video_20200518145834_redoc_show.mp4)
- [👉 online preview](https://wll8.github.io/redoc-try/index.html)

Add `Try it out` function like [swagger](https://petstore.swagger.io/) on [redoc](https://github.com/Redocly/redoc).

![re-doc try](https://github.com/wll8/redoc-try/raw/master/redoc_show.png)

## how to use?

``` html
<body>
  <div id="redoc-container"></div>
  <script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0-rc.55/bundles/redoc.standalone.min.js"> </script>
  <script src="https://cdn.jsdelivr.net/gh/wll8/redoc-try@1.3.4/dist/try.js"></script>
  <script>
    // initTry(`https://petstore.swagger.io/v2/swagger.json`)
    initTry({
      openApi: `https://petstore.swagger.io/v2/swagger.json`,
      redocOptions: {scrollYOffset: 50},
    })
  </script>
</body>
```

## Options
When the parameter type is a string, the value is openApi.

When the parameter type is an object, you can configure the following:

``` js
initTry({
  openApi: `https://petstore.swagger.io/v2/swagger.json`, // openApi address
  // redocVersion: `2.0.0-rc.48`, // Used to handle compatibility issues, if not specified, read from the URL
  // onlySwagger: true,
  // tryText: `try`, // Try button text
  // trySwaggerInApi: true, // Whether to display swagger debugging window under api?
  // redocOptions: {enableConsole: true}, // Or the format is an array: `[specOrSpecUrl?, options?, element?, callback?]`
  // swaggerOptions: {dom_id: `#swagger-ui`},
})
```

## Why do you need it?

According to the description of [#53](https://github.com/Redocly/redoc/issues/53#issuecomment-576377856), the try function is no longer developed, maybe it has become a paid function.

If you need to simply have this feature, you don't need to redevelop it, because it will consume a lot of time and lack community maintenance.

We chose to transplant Swagger's `Try it out` function, which is complete, has community maintenance, and is familiar.


## License

[WTFPL](https://en.wikipedia.org/wiki/WTFPL):

``` txt
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.

```
