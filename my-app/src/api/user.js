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