# 项目开发记录

## GitHub提交问题

依次输入一下代码

> git config --global --unset http.proxy 
> git config --global --unset https.proxy
> git config --global http.sslVerify "false"

## 一、项目搭建

codeStation仿造思否(segmentDefault)进行页面设计，第一天主要是搭建项目大框和配置路由。

主体使用了react脚手架create-react-app，使用了react-router库进行路由配置，页面快速搭建使用了antd库。

布局上采用了上中下格式的布局，并且大体实现头部导航组件和底部组件的样式，content区域即时配置路由的区域。

![image-20221230113809373](C:\Users\Random\AppData\Roaming\Typora\typora-user-images\image-20221230113809373.png)

值得注意的是 "注册/登录"按钮后续会发生改变，对于已经登录的用户，会变成用户的头像。

## 二、登录/注册

考虑到登陆注册按钮代码较多，单独对其封装了两个组件

在（一）中提到了登陆注册的按钮有两种状态，一种是未登录的状态，要显示”登录/注册按钮“，另一种状态是已登录状态，要显示用户头像。状态的存储采用了redux进行存储，这里使用了官方的**@reduxjs/toolkit react-redux**。

为了防止代码冗余，根据登录状态显示组件的代码封装成了一个新的组件。***LoginAvatar***组件，用来判断显示什么。考虑到要让该组件的功能更纯粹一些，该组件的”登录/注册“按钮的点击事件通过根组件逐层传入而不是在组件内部定义。

整体布局上使用了antd的Avatar外加底部Popover内嵌List

```jsx
<Button type="primary" onClick={props.handleModal}>
    注册/登录
</Button>
```

弹窗组件***LoginForm***,本质上是一个表单，由于表单组件需要变成可控组件，需要大量函数，所以封装了一个函数updateInfo

```jsx
/**
  * 组件实现
  * @param {Object} prev 旧的状态
  * @param {*} info 表单信息
  * @param {String} key 状态的key
  * @param {Function} setFuc 状态更改函数
 */
function updateInfo(prev, info, key, setFuc) {
    let newInfo = { ...prev }
    newInfo[key] = info
    setFuc(newInfo)
}
```

表单中需要一个验证码，验证码从接口获取，这里引入了**axios**库，封装了request进行请求和相应拦截。同时由于跨域问题，配置了代理文件，这里引入了**http-proxy-middleware**，最终对请求到的data中拿到svg标签语句

值得注意的是渲染html标签的时候，用到了

> dangerouslySetInnerHTML={{ __html: captcha }}            // (类似于vue的v-html)

显示的验证码并不是一成不变的，弹窗关闭再打开会改变，登陆注册的验证码也会有不同，所以useEffect的第二个参数要依赖登录注册radio的value和弹窗显示的状态。

**细节处理1：切换登录和注册的时候，input的组件的value绑定会因为Form.Item里面设置的name而导致失效**，解决办法有三种

* 把name去掉（由于需要name进行表单验证，所以此法不可行）
* 采用官方的方式form.setFieldsValue
* 在Input组件和Form.Item之间用元素隔开（例如div）

参考：[(52条消息) react hooks antd Design里input的值变化不更新_ 北岭有燕的博客-CSDN博客](https://blog.csdn.net/qq_41160739/article/details/120553454)

```jsx
 <Form.Item
          label="登录账号"
          name="loginId"//这里会导致里面Input绑定的value失效，所以要去掉
          rules={[...
```

**细节处理2：新注册的用户会随机生成一个头像，可在添加新用户的接口中的返回值获取到，但是这个图片路径是一个static开头的路径，想要请求到需要做代理转发，做完代理转发后，webpack的静态文件也是static开头的路径，当webpack打包完成后又会触发代理转发**。所以需要更改webpack文件路径。由于使用cra导致webpack文件配置被隐藏了，需要指令**npm run eject**,值得注意的是eject虽然能把隐藏的文件暴露出来，但是它是**不可逆**的

暴露出来后即可对其进行更改，找到新生成的文件config/webpack.config.js,搜索static

把output中的static开头的路径，改成别的名字即可，我改成了assets

```js
output: {
      // The build folder.
      path: paths.appBuild,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isEnvProduction
        ? 'assets/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'assets/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'assets/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'assets/js/[name].chunk.js',
      assetModuleFilename: 'assets/media/[name].[hash][ext]',
```



![image-20230103095012466](C:\Users\Random\AppData\Roaming\Typora\typora-user-images\image-20230103095012466.png)

登录模块和注册模块本质上差不多，无非是表单的验证分为

* 验证码是否正确
* 账号密码是否正确
* 账号是否被冻结

