import React, { useEffect, useRef, useState } from 'react'
import { Comment, Avatar, Form, Button, List, Tooltip, message, Pagination, Empty,Skeleton  } from 'antd'
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { getCommentFromIssue, addComment, getCommentFromBook } from '../api/comment'
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tools'
import { updateIssue } from '../api/issue';
import { updateBookInfo } from '../api/book';
import { useDispatch } from 'react-redux';
import { updateUserToNewInfo } from '../redux/userSlice'
import styles from '../styles/Discuss.module.css'
/**
 * 根据类型来显示不同的评论区组件
 * @param {*} props {issueId}点击问答的id{commentType}1为问答详情页评论区 2为数据详情页评论区 issueInfo 问答的具体数据
 * @returns 
 */
export default function Discuss(props) {
    //用户状态
    const { userInfo, isLogin } = useSelector((state) => {
        return state.user
    })
    // 用来触发重新获取评论列表
    const [refresh, setRefresh] = useState(false)
    //分页状态
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15,
        total: 0,
    })
    //评论列表状态
    const [commentList, setCommentList] = useState([])
    const editorRef = useRef()
    const dispatch = useDispatch()
    //分页处理函数
    function handlePageChange(current, pageSize) {
        setPageInfo({
            current,
            pageSize
        })
    }
    useEffect(() => {
        //渲染问答详情页评论
        if (props.commentType === 1) {
            async function fetchData() {
                let data = null
                const res = await getCommentFromIssue(props.issueId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize
                })
                data = res.data
                // console.log(res.data)
                for (let i = 0; i < data.data.length; i++) {
                    const result = await getUserById(data.data[i].userId)
                    data.data[i].userInfo = result.data//将有用户名字的数据存进去覆盖之前的
                }
                setCommentList(data.data)
                setPageInfo({
                    current: data.currentPage,
                    pageSize: data.eachPage,
                    total: data.count,
                })
            }
            if (props.issueId) {
                fetchData()
            }
        }
        //渲染书籍详情页评论
        else {
            let data = null
            async function fetchData() {
                const res = await getCommentFromBook(props.bookId, {
                    current: pageInfo.current,
                    pageSize: pageInfo.pageSize
                })
                // console.log(res.data)
                data = res.data
                for (let i = 0; i < data.data.length; i++) {
                    const result = await getUserById(data.data[i].userId)
                    data.data[i].userInfo = result.data//将有用户名字的数据存进去覆盖之前的
                }
                setCommentList(data.data)
                setPageInfo({
                    current: data.currentPage,
                    pageSize: data.eachPage,
                    total: data.count,
                })
            }
            if (props.bookId) {
                fetchData()
            }
        }


    }, [props.issueId, props.bookId, refresh, pageInfo.pageSize, pageInfo.current])
    // console.log(commentList)
    //提交评论按钮
    function handleComment() {
        let content
        content = editorRef.current.getInstance().getHTML()
        if (content === '<p><br></p>') {
            //当评论为空的时候会有换行，需要进行判断
            content = ''
        }
        if (!content) {
            message.warn('评论不能为空')
            return
        }
        //添加评论
        addComment({
            userId: userInfo._id,
            typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
            commentContent: content,
            commentType: props.commentType,
            bookId: props.bookId ? props.bookId : null,
            issueId: props.issueId ? props.issueId : null
        })
        //更改状态重新获取评论列表
        setRefresh(!refresh)
        //清空评论框
        editorRef.current.getInstance().setHTML('')
        //更改评论数
        if (props.issueId) {
            updateIssue(props.issueId, {
                commentNumber: ++props.issueInfo.commentNumber
            })
        }
        else if (props.bookId) {
            updateBookInfo(props.bookId, {
                commentNumber: ++props.bookInfo.commentNumber
            })
        }
        //更改用户积分
        dispatch(updateUserToNewInfo({
            userId: userInfo._id,
            newInfo: {
                points: userInfo.points + 2
            }
        }))
        message.success('评论成功,积分+2')

    }
    let avatar = null
    //如果登录了显示用户头像
    if (isLogin) {
        avatar = (<Avatar size='large' src={userInfo.avatar} />);
    }
    else {
        avatar = (<Avatar size='large' icon={<UserOutlined />} />);
    }
    return (
        <div style={{ margin: '50px 0' }}>
            {/* 评论框 */}
            <Comment
                avatar={avatar}
                content={
                    <>
                        <Form.Item>
                            <Editor
                                initialValue=""
                                previewStyle="vertical"
                                height="270px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                language='zh-CN'
                                ref={editorRef}
                                className="editor"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                disabled={isLogin ? false : true}
                                onClick={handleComment}
                            >评论</Button>
                        </Form.Item>
                    </>
                }
            />
            {/* 评论列表 */}
            {
                commentList?.length > 0
                &&
                <List
                    header="当前评论"
                    dataSource={commentList}
                    renderItem={(item) => (
                        <Comment
                            avatar={<Avatar src={item.userInfo.avatar} />}
                            author={item.userInfo.nickname}
                            content={
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.commentContent }}
                                ></div>
                            }
                            datetime={
                                <Tooltip title={formatDate(item.commentDate, 'year')}>
                                    <span>{formatDate(item.commentDate, 'year')}</span>
                                </Tooltip>
                            }
                        />
                    )}
                />
            }
            {

                commentList.length > 0 ? (<div className={styles.paginationContainer}>
                    <Pagination
                        showQuickJumper
                        defaultCurrent={1}
                        current={pageInfo.current}
                        pageSize={pageInfo.pageSize}
                        total={pageInfo.total}
                        onChange={handlePageChange}>
                    </Pagination>
                </div>
                ) : (<Empty description='暂无评论' />)
            }
        </div>
    )
}
