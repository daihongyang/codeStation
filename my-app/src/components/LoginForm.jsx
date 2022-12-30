import React from 'react'
import { Modal, Radio, Form, Input, Row, Col, Button, Checkbox } from 'antd'
import styles from '../styles/LoginForm.module.css'
import { useState, useRef,useEffect } from 'react'
import { getCaptcha } from '../api/user'
export default function LoginForm(props) {
  let [radioVal, setRadioVal] = useState(1)//登录注册页面切换
  let [loginInfo, setLoginInfo] = useState({
    loginId: '',
    loginPwd: '',
    captcha: '',
    isRememberMe: false
  })//登录用户信息
  let [captcha, setCaptcha] = useState(null)//验证码信息
  let [registerInfo, setRegisterInfo] = useState({
    loginId: '',
    nickname: '',
    captcha: ''
  })//注册用户信息
  useEffect(()=>{
    async function fetchData(){
      const res = await getCaptcha()//请求验证码
      setCaptcha(res)
    }
    fetchData()
  },[])
  const loginFormRef = useRef()//登录ref
  const registerFormRef = useRef()//注册ref
  //验证码点击函数
  function captchaClickHandle() {

  }
  function handleOk() {

  }
  function registerHandle() {

  }
  function loginHandle() { }
  /**
   * 组件实现
   * @param {Object} prev 旧的状态
   * @param {*} info 表单信息
   * @param {String} key 状态的key
   * @param {Function} setFuc 状态更改函数
   */
  function updateInfo(prev, info, key, setFuc) {
    let newInfo = { ...prev }
    newInfo[key] = info
    setFuc(newInfo)
  }
  //根据状态判断显示什么
  let content = null
  if (radioVal === 1) {
    //登录界面
    content = (<div className={styles.container}>
      <Form
        name="basic1"
        autoComplete="off"
        onFinish={loginHandle}
        ref={loginFormRef}
      >
        <Form.Item
          label="登录账号"
          name="loginId"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        >
          <Input
            placeholder="请输入你的登录账号"
            value={loginInfo.loginId}
            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
          />
        </Form.Item>

        <Form.Item
          label="登录密码"
          name="loginPwd"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password
            placeholder="请输入你的登录密码，新用户默认为123456"
            value={loginInfo.loginPwd}
            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
          />
        </Form.Item>

        {/* 验证码 */}
        <Form.Item
          name="logincaptcha"
          label="验证码"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        >
          <Row align="middle">
            <Col span={16}>
              <Input
                placeholder="请输入验证码"
                value={loginInfo.captcha}
                onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
              />
            </Col>
            <Col span={6}>
              <div
                className={styles.captchaImg}
                onClick={captchaClickHandle}
                dangerouslySetInnerHTML={{ __html: captcha }}
              ></div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="remember"
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Checkbox
            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'isRememberMe', setLoginInfo)}
            checked={loginInfo.remember}
          >记住我</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20 }}
          >
            登录
          </Button>
          <Button type="primary" htmlType="submit">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>)
  }
  else {
    //注册界面
    content = (<div className={styles.container}>
      <Form
        name="basic2"
        autoComplete="off"
        ref={registerFormRef}
        onFinish={registerHandle}
      >
        <Form.Item
          label="登录账号"
          name="loginId"
          rules={[
            {
              required: true,
              message: "请输入账号，仅此项为必填项",
            },
            // 验证用户是否已经存在
            // { validator: checkLoginIdIsExist },
          ]}
          validateTrigger='onBlur'
        >
          <Input
            placeholder="请输入账号"
            value={registerInfo.loginId}
            onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
          />
        </Form.Item>

        <Form.Item
          label="用户昵称"
          name="nickname"
        >
          <Input
            placeholder="请输入昵称，不填写默认为新用户xxx"
            value={registerInfo.nickname}
            onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
          />
        </Form.Item>

        <Form.Item
          name="registercaptcha"
          label="验证码"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        >
          <Row align="middle">
            <Col span={16}>
              <Input
                placeholder="请输入验证码"
                value={registerInfo.captcha}
                onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
              />
            </Col>
            <Col span={6}>
              <div
                className={styles.captchaImg}
                onClick={captchaClickHandle}
                dangerouslySetInnerHTML={{ __html: captcha }}
              ></div>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20 }}
          >
            注册
          </Button>
          <Button type="primary" htmlType="submit">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>)
  }
  return (
    <div>
      <Modal
        title='注册/登录'
        open={props.isModalShow}
        onOk={handleOk}
        onCancel={props.handleCancel}
      >
        <Radio.Group defaultValue={1} buttonStyle="solid" className={styles.radioGroup}>
          <Radio.Button value={1} className={styles.radioButton} onChange={(e) => setRadioVal(e.target.value)}>登录</Radio.Button>
          <Radio.Button value={2} className={styles.radioButton} onChange={(e) => setRadioVal(e.target.value)}>注册</Radio.Button>
        </Radio.Group>
        {content}
      </Modal>
    </div>
  )
}
