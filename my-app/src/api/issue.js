// 问答模块api
import request from './request'
/**
 * 
 * @param {*} params {current:xx,pageSize:xx,issueStatus:xx}
 * @returns 
 */
export function getIssuesInfoByPage(params) {
    return request({
        url: '/api/issue/',
        method: 'GET',
        params: { ...params }
    })
}
/**
 * 添加提问
 * @param {*} data 添加的提问信息
 * @returns 
 */
export function addIssue(data){
    return request({
        url:'/api/issue/',
        method:'POST',
        data
    })
}

/**
 * 根据id找问答
 * @param {*} id 用户的id 
 * @returns 
 */
export function getIssueById(id){
    return request({
        url:`/api/issue/${id}`,
        method:'GET'
    })
}