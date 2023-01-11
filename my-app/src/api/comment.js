import request from './request'
//评论相关api
/**
 * 根据问答获取评论数据
 * @param {*} id 问答id
 * @param {*} params 参数
 * @returns 
 */
export function getCommentFromIssue(id, params) {
    return request({
        url: `/api/comment/issuecomment/${id}`,
        method: 'GET',
        params: {
            ...params
        }
    })
}
/**
 * 新增评论
 * @param {*} params 参数
 * @returns 
 */
export function addComment(params) {
    return request({
        url: '/api/comment',
        method: 'POST',
        data: params
    })
}
/**
 * 获取某本书的评论
 * @param {*} id 书的id
 * @param {*} params {current:xx,pageSize:xx}
 * @returns 
 */
export function getCommentFromBook(id,params){
    return request({
        url:`/api/comment/bookcomment/${id}`,
        method:'GET',
        params:{
            ...params
        }
    })
}