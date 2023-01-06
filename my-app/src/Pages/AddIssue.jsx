import React from 'react'
import styles from '../styles/AddIssue.module.css'
import { Form, Input, Button, Select, message } from 'antd'
import { useRef, useState, useEffect } from 'react'
import { typeOptionCreator } from '../utils/tools'
import { useSelector, useDispatch } from 'react-redux'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { getTypeList } from '../redux/typeSlice'
import { addIssue } from '../api/issue'
import { useNavigate } from 'react-router-dom'
//提问表单组件
export default function AddIssue() {
    const formRef = useRef()
    const editorRef = useRef()
    const navigate = useNavigate()
    const { typeList } = useSelector((state) => {
        return state.type
    })
    const { userInfo } = useSelector((state) => {
        return state.user
    })
    const dispatch = useDispatch()
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList())
        }
    }, [])
    //问答信息
    const [issueInfo, setIssueInfo] = useState({
        issueTitle: '',
        issueContent: '',
        userId: '',
        typeId: ''
    })
    /**
     * 可控组件通用函数
     * @param {*} value 输入的值 
     * @param {*} key 更改的key
     */
    function updateInfo(value, key) {
        let newIssueInfo = { ...issueInfo }
        newIssueInfo[key] = value
        setIssueInfo(newIssueInfo)
       
    }
    //处理select切换函数
    function handleChange(val) {
        updateInfo(val, 'typeId')
    }


    //提交处理函数
    function addHandle() {
        const content = editorRef.current.getInstance().getHTML()
        // console.log('userId',userInfo._id)
        addIssue({
            issueTitle: issueInfo.issueTitle,
            issueContent: content,
            userId: userInfo._id,
            typeId: issueInfo.typeId
        })
        navigate('/')
        message.success('您的评论正在审核中，很快就能看到啦！')
    }


    return (
        <div className={styles.container}>
            <Form
                name="basic"
                initialValues={issueInfo}
                autoComplete="off"
                ref={formRef}
                onFinish={addHandle}
            >
                {/* 问答标题 */}
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{ required: true, message: '请输入标题' }]}
                >
                    <div>
                        <Input
                            placeholder="请输入标题"
                            size="large"
                            value={issueInfo.issueTitle}
                            onChange={(e) => updateInfo(e.target.value, 'issueTitle')}
                        />
                    </div>
                </Form.Item>

                {/* 问题类型 */}
                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{ required: true, message: '请选择问题所属分类' }]}
                >
                    <Select
                        style={{ width: 200 }}
                        onChange={handleChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>


                {/* 问答内容 */}
                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{ required: true, message: '请输入问题描述' }]}
                >
                    <Editor
                        initialValue=""
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        language='zh-CN'
                        ref={editorRef}
                    />
                </Form.Item>


                {/* 确认按钮 */}
                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        问一下
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
