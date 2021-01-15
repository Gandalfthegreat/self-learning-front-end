# 简答题

A. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

1. 通过 entry 找到入口文件，通过深度优先遍历找到所有的模块
2. 通过loader从后向前依次加载所有找到的模块
3. 通过plugins在定义好的生命周期钩子中执行相应的插件
4. 与此同时，minimize也会用于压缩文件


B. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路
1. loader用于加载非js模块， plugin用于执行一些扩展功能
2. loader是一个javascript函数，返回一段javascript代码； plugin是一个函数或者包含apply方法的对象，可指定hook开发相应功能