[TOC]

###### 一、router基本使用

① 创建和路由相关的组件

②Vue.use(vueRouter)注册插件

③创建路由对象，此时配置路由规则

④注册router对象，vue实例时，选项里配置创建好的router对象

⑤通过router-view，设置占位，路径匹配成功后，组件替换掉占位，router-link创建一些链接

###### 二、Hash和History模式的区别

* 表现形式
* 原理：①Hash基于锚点，以及onhashchange事件②History模式是基于HTML5中的History API
	* history.pushState()\history.replaceState()

* history模式需要服务器支持：在服务端应该除了静态资源外都返回单元应用的index.html

###### 三、VueRouter原理

* Hash模式
	* #号后的内容作为路径，可以通过location.url改变，如果只是#号后内容改变，不像服务器端发送请求，但会存储到历史记录里，监听hashchange事件，根据当前路由地址找到对应组件重新渲染

* History模式
	* 通过history.pushState()方法改变地址栏，并把当前地址存储到访问历史中，不向服务发送请求，监听popstate事件，可以得到浏览器的变化，pushstate和replacestate不会触发该事件，当点击浏览器前进和后退按钮时触发或者back和forward方法时。
	* 当地址改变之后，根据当前地址找到对应组件重新渲染。

###### 四、类图

* 类名 VueRouter

* 属性 options\data\routeMap

* 方法 

	```javascript
	①Constructor(options):VueRouter
	②_install(Vue):void
	③init():void => initEvent():void 、createRouteMap(): void 、initComponents(Vue):void
	```

###### 五、Vue的构建版本

* 运行时版本：不支持template模板，需要打包的时候提前编译
* 完整版：包含运行时和编译器，程序运行时把模板转换成render函数

