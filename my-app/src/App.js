//根组件
import './styles/App.css';
import FooterComp from './components/FooterComp'
import NavComp from './components/NavComp'
import Layout from 'antd/lib/layout/layout';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import  RouterConfig  from './Router/index.jsx'
function App() {
  return (
    <div>
      <Layout>
        <Header className='header'>
          <NavComp />
        </Header>
        <Content className='content'>
          <RouterConfig />
        </Content>
        <Footer className='footer'>
          <FooterComp />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
