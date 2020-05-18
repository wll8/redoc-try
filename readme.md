## redoc try
在 redoc 上添加像 swagger 一样的 try 功能.

![re-doc try](redoc_WX20200518-152825.png)

## 如何使用?

[get video](https://github.com/wll8/static/blob/master/Video_20200518145834_redoc_show.mp4?raw=true)

``` diff
 <body>
   <div id="redoc-container"></div>
   <script src="https://unpkg.com/redoc@2.0.0-rc.28/bundles/redoc.standalone.js"> </script>
+  <script src="https://cdn.jsdelivr.net/gh/wll8/redoc-try/try.min.js"></script>
 </body>
```

## 为什么需要它?
根据 [#53](https://github.com/Redocly/redoc/issues/53) 所描述, try 功能不再继续开发, 或许已经变成付费的功能.  

如果你需要简单的拥有这个功能, 不需要重新开发, 因为那会消耗很多时间, 并且没有社区的维护.  

我们选择移植 swagger 的 try 功能, 它是完整的, 拥有社区维护的, 令人熟悉的.
