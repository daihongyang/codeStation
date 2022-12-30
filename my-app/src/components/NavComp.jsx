//顶部导航组件
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Select, Input, Button } from 'antd'
export default function NavComp() {
  return (
    <div className='headerContainer'>
      {/* 头部logo */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 链接导航 */}
      <nav className='navContainer'>
        <NavLink className='navigation' to='/issues'>问答</NavLink>
        <NavLink className='navigation' to='/book'>书籍</NavLink>
        <NavLink className='navigation' to='/interviews'>面试</NavLink>
        <NavLink className='navigation' to='/column'>专栏</NavLink>
      </nav>
      {/* 搜索框 */}
      <div className="searchContainer">
        <Input.Group compact>
          <Select defaultValue="issues"
            size='default'
            style={{ width: '20%' }}>
            <Select.Option value="issues">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input.Search style={{ width: '80%' }}
            placeholder='在此索引'
            allowClear
            enterButton="搜索"
            size='default' />
        </Input.Group>
      </div>
      {/* 登录按钮 */}
      <div className="loginBtnContainer">
      <Button type="primary" >注册/登录</Button>
      </div>
    </div>
  )
}
