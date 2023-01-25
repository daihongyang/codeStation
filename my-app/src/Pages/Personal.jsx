import React from 'react'
import PageHeader from '../components/PageHeader'
import { Card, Image, message, Button, Modal, Input, Form, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import styles from '../styles/Personal.module.css'
import PersonalInfoItem from '../components/PersonalInfoItem'
import { useSelector, useDispatch } from 'react-redux'
import { formatDate } from '../utils/tools'
import { updateUserToNewInfo } from '../redux/userSlice';
import { useState } from 'react';
import { checkUserPassword } from '../api/user';
export default function Personal() {
    const { userInfo } = useSelector(state => {
        return state.user
    })
    const [panelName, setPanelName] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [passwordInfo, setPasswordInfo] = useState({
        oldpassword: '',
        newpassword: '',
        passwordConfirm: ''
    })
    const dispatch = useDispatch()
    /**
     * 更改头像的仓库和云端数据
     * @param {*} newInfo 新的数据
     * @param {*} key 更新的用户数据key
     */
    function handleAvatar(newInfo, key) {
        const newAvatar = { [key]: newInfo }
        dispatch(updateUserToNewInfo({
            userId: userInfo._id,
            newInfo: newAvatar
        }))
        message.success("头像修改成功");
    }
    //弹窗控制函数
    function showModal(name) {
        setIsModalOpen(true)
        setPanelName(name)
    }
    //确认函数
    function handleOk() {

    }
    //弹窗关闭函数
    function handleCancel() {
        setIsModalOpen(false)
    }
    //把密码输入框变成受控组件的函数
    function updatePasswordInfo(val,key) {
        let info = {...passwordInfo}
        info[key] = val.trim()
        setPasswordInfo(info)
    }
    //检查用户密码是否正确
    async function checkPassword() {
        const {data} = await checkUserPassword(userInfo._id,passwordInfo.oldpassword)
        // console.log(data)
        if(!data){
            return Promise.reject('密码不正确')
        }
    }
    function updateInfo() {

    }
    let modalContent = null
    switch (panelName) {
        case "基本信息": {
            modalContent = (
                <>
                    <Form
                        name="basic1"
                        autoComplete="off"
                        initialValues={userInfo}
                        onFinish={handleOk}
                    >
                        {/* 登录密码 */}
                        <Form.Item
                            label="登录密码"
                            name="oldpassword"
                            rules={[
                                {
                                    validator: checkPassword
                                }
                            ]}
                            validateTrigger='onBlur'
                        >
                            <Input.Password
                                rows={6}
                                value={passwordInfo.oldpassword}
                                placeholder="如果要修改密码，请先输入旧密码"
                                onChange={(e) => updatePasswordInfo(e.target.value, 'oldpassword')}
                            />
                        </Form.Item>

                        {/* 新的登录密码 */}
                        <Form.Item
                            label="新密码"
                            name="newpassword"
                        >
                            <Input.Password
                                rows={6}
                                value={passwordInfo.newpassword}
                                placeholder="请输入新密码"
                                onChange={(e) => updatePasswordInfo(e.target.value, 'newpassword')}
                            />
                        </Form.Item>

                        {/* 确认密码 */}
                        <Form.Item
                            label="确认密码"
                            name="passwordConfirm"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不一致'));
                                    },
                                }),
                            ]}
                            validateTrigger='onBlur'
                        >
                            <Input.Password
                                rows={6}
                                placeholder="请确认密码"
                                value={passwordInfo.passwordConfirm}
                                onChange={(e) => updatePasswordInfo(e.target.value, 'passwordConfirm')}
                            />
                        </Form.Item>

                        {/* 用户昵称 */}
                        <Form.Item
                            label="用户昵称"
                            name="nickname"
                        >
                            <Input
                                placeholder="昵称可选，默认为新用户"
                                // value={userInfo.nickname}
                                value={123}
                                onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="submit" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>

            )
            break;
        }
        case "社交账号":{
            break;
        }
        case "个人简介":{
            break;
        }
        default:{
           
        }
    }
    return (
        <div>
            <PageHeader title="个人中心" />
            {/* 信息展示 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <Card title="基本信息"
                        extra={<div className={styles.edit} onClick={() => showModal("基本信息")}>编辑</div>}
                    >
                        <PersonalInfoItem info={{
                            itemName: "登录账号",
                            itemValue: userInfo.loginId,
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "账号密码",
                            itemValue: "************",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "用户昵称",
                            itemValue: userInfo.nickname,
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "用户积分",
                            itemValue: userInfo.points,
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "注册时间",
                            itemValue: formatDate(userInfo.registerDate),
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "上次登录时间",
                            itemValue: formatDate(userInfo.lastLoginDate),
                        }} />
                        <div style={{ fontWeight: 100, height: 50 }}>当前头像：</div>
                        <Image src={userInfo.avatar} width={100} />
                        <div style={{ fontWeight: 100, height: 50 }}>上传新头像：</div>
                        <Upload
                            action="/api/upload"
                            listType="picture-card"
                            maxCount={1}
                            onChange={(e) => {
                                if (e.file.status === 'done') {
                                    // 说明上传已经完成
                                    const url = e.file.response.data;
                                    handleAvatar(url, 'avatar');
                                }
                            }}
                        >
                            <PlusOutlined />
                        </Upload>
                    </Card>
                </div>
                <div className={styles.row}>
                    <Card title="社交账号"
                        extra={<div className={styles.edit} onClick={() => showModal("社交账号")}>编辑</div>}
                    >
                        <PersonalInfoItem info={{
                            itemName: "邮箱",
                            itemValue: userInfo.mail ? userInfo.mail : "未填写",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "QQ号",
                            itemValue: userInfo.qq ? userInfo.qq : "未填写",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "微信号",
                            itemValue: userInfo.wechat ? userInfo.wechat : "未填写",
                        }} />
                        <PersonalInfoItem info={{
                            itemName: "github",
                            itemValue: userInfo.github ? userInfo.github : "未填写",
                        }} />

                    </Card>
                </div>
                <div className={styles.row}>
                    <Card title="个人简介"
                        extra={<div className={styles.edit} onClick={() => showModal("个人简介")}>编辑</div>}
                    >
                        <p className={styles.intro}>
                            {userInfo.intro ? userInfo.intro : "未填写"}
                        </p>
                    </Card>
                </div>
            </div>
            {/* 修改信息对话框 */}
            <Modal
                title={panelName}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                {modalContent}
            </Modal>
        </div>
    )
}
