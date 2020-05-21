## redoc try
Add `Try it out` function like [swagger](https://petstore.swagger.io/) on [redoc](https://github.com/Redocly/redoc).

![re-doc try](https://github.com/wll8/redoc-try/raw/master/redoc_WX20200518-152825.png)

## how to use?

[View video](https://cdn.jsdelivr.net/gh/wll8/static/Video_20200518145834_redoc_show.mp4)

``` html
<body>
  <div id="redoc-container"></div>
  <script src="https://unpkg.com/redoc@2.0.0-rc.28/bundles/redoc.standalone.js"> </script>
  <script src="https://cdn.jsdelivr.net/gh/wll8/redoc-try@1.0.0/try.js"></script>
  <script>
    initTry({
      openApi: `https://petstore.swagger.io/v2/swagger.json`, // openApi address
      // tryText: `try`, // Try button text
      // trySwaggerInApi: true, // Whether to display swagger debugging window under api?
    })
  </script>
</body>
```

## Why do you need it?

According to the description of [#53]((https://github.com/Redocly/redoc/issues/53) ), the try function is no longer developed, maybe it has become a paid function.

If you need to simply have this feature, you don't need to redevelop it, because it will consume a lot of time and lack community maintenance.

We chose to transplant Swagger's `Try it out` function, which is complete, has community maintenance, and is familiar.
