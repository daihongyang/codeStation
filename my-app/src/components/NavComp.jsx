//顶部导航组件
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Select, Input } from 'antd'
import LoginAvatar from '../components/LoginAvatar';
import { useNavigate } from 'react-router-dom';
export default function NavComp(props) {
  const [option, setOption] = useState('issues')
  const navigate = useNavigate()
  /**
   * 搜索框函数
   * @param {*} val 输入框的值
   */
  function handleSearch(val) {
    if (val) {
      navigate('/search', {
        state: {
          option,
          val
        }
      })
    }
    else {
      navigate('/')
    }
  }
  /**
   * option变化函数
   * @param {*} val 切换option的值
   */
  function handleSelectChange(val) {
    setOption(val)
  }
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
      </nav>
      {/* 搜索框 */}
      <div className="searchContainer">
        <Input.Group compact>
          <Select defaultValue="issues"
            size='default'
            style={{ width: '20%' }}
            onChange={handleSelectChange}
          >
            <Select.Option value="issues">问答</Select.Option>
            <Select.Option value="book">书籍</Select.Option>
          </Select>
          <Input.Search style={{ width: '80%' }}
            placeholder='在此索引'
            allowClear
            enterButton="搜索"
            size='default'
            onSearch={handleSearch}
          />
        </Input.Group>
      </div>
      {/* 登录按钮 */}
      <div className="loginBtnContainer">
        <LoginAvatar handleModal={props.handleModal} isModalShow={props.isModalShow} />
      </div>
    </div>
  )
}
