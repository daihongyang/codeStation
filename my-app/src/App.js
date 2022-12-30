//根组件
import './styles/App.css';
import FooterComp from './components/FooterComp'
import NavComp from './components/NavComp'
import Layout from 'antd/lib/layout/layout';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import  RouterConfig  from './Router/index.jsx'
import { useState } from 'react';
import LoginForm from './components/LoginForm';
function App() {
  let [isModalShow,setIsModalShow] = useState(false)//弹窗状态
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
