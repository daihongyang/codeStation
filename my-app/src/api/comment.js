import request from './request'
//评论相关api

export function getCommentFromIssue(id,params){
    return request({
        url:`/api/comment/issuecomment/${id}`,
        method:'GET',
        params:{
            ...params
        }
    })
}