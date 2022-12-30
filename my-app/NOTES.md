# 项目开发记录

## 一、项目搭建

codeStation仿造思否(segmentDefault)进行页面设计，第一天主要是搭建项目大框和配置路由。

主体使用了react脚手架create-react-app，使用了react-router库进行路由配置，页面快速搭建使用了antd库。

布局上采用了上中下格式的布局，并且大体实现头部导航组件和底部组件的样式，content区域即时配置路由的区域。

![image-20221230113809373](C:\Users\Random\AppData\Roaming\Typora\typora-user-images\image-20221230113809373.png)

值得注意的是 "注册/登录"按钮后续会发生改变，对于已经登录的用户，会变成用户的头像。

## 二、登录/注册

考虑到登陆注册按钮代码较多，单独对其封装了两个组件

在（一）中提到了登陆注册的按钮有两种状态，一种是未登录的状态，要显示”登录/注册按钮“，另一种状态是已登录状态，要显示用户头像。状态的存储采用了redux进行存储，这里使用了官方的**@reduxjs/toolkit react-redux**。

为了防止代码冗余，根据登录状态显示组件的代码封装成了一个新的组件。***LoginAvatar***组件，用来判断显示什么。该组件的”登录/注册“按钮通过根组件逐层传入而不是在组件内部定义。

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

表单中需要一个验证码，验证码从接口获取，这里引入了**axios**库，封装了request进行请求和相应拦截。同时由于跨域问题，配置了代理文件，这里引入了**http-proxy-middleware**，最终对请求到的data中拿到svg标签

值得注意的是渲染html标签的时候，用到了

> dangerouslySetInnerHTML={{ __html: captcha }}