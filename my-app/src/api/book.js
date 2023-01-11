import request from './request'
/**
 * 分页获取文章信息
 * @param {object} params {current,pageSize}
 * @returns 返回文章数组和当前页码、每页数据显示数、总数据数
 */
export function getBooksInfo(params) {
    return request({
        url: '/api/book',
        method: 'GET',
        params: { ...params }
    })
}
/**
 * 根据id获取书籍信息
 * @param {string} id 书籍的id
 * @returns 
 */
export function getBookInfoById(id){
    return request({
        url:`/api/book/${id}`,
        mathod:'GET'
    })
}
/**
 * 更新书籍信息
 * @param {*} id 书籍id
 * @param {*} data 要更改的条目
 * @returns 
 */
export function updateBookInfo(id,data){
    return request({
        url:`/api/book/${id}`,
        method:'PATCH',
        data

    })
}
