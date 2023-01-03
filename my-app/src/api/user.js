import request from './request'
/**
 * 请求验证码
 * @returns 验证码数据svg
 */
export function getCaptcha(){
    return request({
        url:'/res/captcha',
        method:'GET'
    })
}
/**
 * 判断用户是否存在
 * @param {*} loginId 用户登陆账号
 * @returns {Boolean} true 存在 false不存在
 */
export function isUserExisted(loginId){
    return request({
        url:`/api/user/userIsExist/${loginId}`,
        method:'GET'
    })
}
/**
 * 注册添加新用户
 * @param {*} userInfo 用户数据 
 * @returns 内含验证码判断结果 验证码输入错误不会返回数据
 */
export function addUser(userInfo){
    return request({
        url:`/api/user`,
        data:userInfo,
        method:'POST'
    })
}