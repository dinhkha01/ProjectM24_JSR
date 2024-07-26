import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import MenuUser from '../components/Menu';

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff', position: 'fixed', width: '100%', zIndex: 1 }}>
        <Navbar />
      </Header>
      <Layout style={{ marginTop: 64 }}> 
        <Sider 
          width={256} 
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <MenuUser />
        </Sider>
        <Layout style={{ marginLeft: 256 }}>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {/* Nội dung chính của trang */}
            <h1>Nội dung trang chủ</h1>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;