## redoc try
[👉 online preview](https://wll8.github.io/redoc-try/index.html)

Add `Try it out` function like [swagger](https://petstore.swagger.io/) on [redoc](https://github.com/Redocly/redoc).

![re-doc try](https://github.com/wll8/redoc-try/raw/master/redoc_show.png)

## how to use?

[View video](https://cdn.jsdelivr.net/gh/wll8/static/Video_20200518145834_redoc_show.mp4)

``` html
<body>
  <div id="redoc-container"></div>
  <script src="//cdn.jsdelivr.net/npm/redoc@2.0.0-rc.28/bundles/redoc.standalone.min.js"> </script>
  <script src="//cdn.jsdelivr.net/gh/wll8/redoc-try@1.2.0/try.js"></script>
  <script>
    initTry(`https://petstore.swagger.io/v2/swagger.json`)
  </script>
</body>
```

## Options
When the parameter type is a string, the value is openApi.

When the parameter type is an object, you can configure the following:

``` js
initTry({
  openApi: `//petstore.swagger.io/v2/swagger.json`, // openApi address
  // onlySwagger: true,
  // tryText: `try`, // Try button text
  // trySwaggerInApi: true, // Whether to display swagger debugging window under api?
  // redocOptions: {enableConsole: true},
  // swaggerOptions: {dom_id: `#swagger-ui`},
})
```

## Why do you need it?

According to the description of [#53](https://github.com/Redocly/redoc/issues/53), the try function is no longer developed, maybe it has become a paid function.

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
