import React from 'react'
import { Button, message } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function AddIssueBtn() {
    const { isLogin } = useSelector((state) => {
        return state.user
    })
    const navigate = useNavigate()
    //提问按钮处理函数
    function handleClick() {
        //如果登录了才会跳转
        if (isLogin) {
            navigate('/addIssue')
        }
        else {
            message.warn('请先登录')
        }
    }
    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: "100%",
                marginBottom: "30px"
            }}
            onClick={handleClick}
        >我要发问</Button>
    )
}
