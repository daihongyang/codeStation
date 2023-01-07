import React, { useEffect, useRef, useState } from 'react'
import { Comment, Avatar, Form, Button, List, Tooltip } from 'antd'
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { getCommentFromIssue } from '../api/comment'
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tools'
export default function Discuess(props) {
    const { userInfo, isLogin } = useSelector((state) => {
        return state.user
    })
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15,
        total: 0,
        totalPage:0
    })
    const [commentList, setCommentList] = useState([])
    const editorRef = useRef()
    useEffect(() => {

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
                pageSize: data.pageSize,
                total: data.count,
                totalPage:data.totalPage
            })
        }

        if (props.issueId) {
            fetchData()
        }
    }, [props.issueId, pageInfo.current, pageInfo.pageSize])
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

        </div>
    )
}
