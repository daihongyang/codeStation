//根组件
import './styles/App.css';
import FooterComp from './components/FooterComp'
import NavComp from './components/NavComp'
import Layout from 'antd/lib/layout/layout';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import  RouterConfig  from './Router/index.jsx'
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import { useEffect } from 'react';
import { getUserById,restoreLoginStatus } from './api/user';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { changeUserStatus, initUserInfo } from './redux/userSlice';
function App() {
  const dispatch = useDispatch()
  let [isModalShow,setIsModalShow] = useState(false)//弹窗状态
  useEffect(()=>{
    //在一开始要判断有没有合法的token
    async function fetchData(){
      const token = localStorage.getItem('userToken')
      if(token){
        const res = await restoreLoginStatus()
        if(!res.data){
          //如果token过期了
          message.warn(res.msg)
          localStorage.removeItem('userToken')//清空token
        }
        else{
          //恢复登录状态 更新仓库
          const result = await getUserById(res.data._id)
          dispatch(initUserInfo(result.data))
          dispatch(changeUserStatus(true))
          message.success(`欢迎回来! ${result.data.loginId}`)
        }
      }
    }
    fetchData()
  },[dispatch])
  /**
   * 点击按钮后更改弹窗状态函数 --打开
   */
  function handleModal(){
    setIsModalShow(true)
  }
  /**
   * 点击按钮后更改弹窗状态函数 --关闭
   */
  function handleModalCancel(){
    setIsModalShow(false)
  }
  return (
    <div>
      <Layout>
        <Header className='header'>
          <NavComp handleModal={handleModal} />
        </Header>
        <Content className='content'>
          <RouterConfig />
        </Content>
        <Footer className='footer'>
          <FooterComp />
        </Footer>
      </Layout>
      {/* 登录弹窗 */}
      <LoginForm isModalShow={isModalShow} handleCancel={handleModalCancel}/>
    </div>
  );
}

export default App;
