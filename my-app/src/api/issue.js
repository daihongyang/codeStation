// 问答模块api
import request from './request'
/**
 * 根据分页找问答
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
export function addIssue(data) {
    return request({
        url: '/api/issue/',
        method: 'POST',
        data
    })
}

/**
 * 根据id找问答
 * @param {*} id 用户的id 
 * @returns 
 */
export function getIssueById(id) {
    return request({
        url: `/api/issue/${id}`,
        method: 'GET'
    })
}
/**
 * 更新问答数据
 * @param {*} id 问答id
 * @param {*} data 要更改的数据
 * @returns 
 */
export function updateIssue(id, data) {
    return request({
        url: `/api/issue/${id}`,
        method: 'PATCH',
        data
    })
}