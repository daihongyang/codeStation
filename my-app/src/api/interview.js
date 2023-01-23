import request from './request'
/**
 * 获取所有面试题标题
 * @returns 
 */
export function getInterviewTitle(){
    return request({
        url:'/api/interview/interviewTitle',
        method:'GET'
    })
}
/**
 * 根据id查找面试题信息
 * @param {*} id 面试题的id
 * @returns 
 */
export function getInterviewById(id){
    return request({
        url: `/api/interview/${id}`,
        method:'GET'
    })
}