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

export function addIssue(data){
    return request({
        url:'/api/issue/',
        method:'POST',
        data
    })
}
