//类型相关api
import request from './request'
/**
 * 获取所有的提问类型
 * @returns 
 */
export function getTypes(){
    return request({
        url:'/api/type',
        method:'GET'
    })
}