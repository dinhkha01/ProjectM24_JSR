import { Col, Layout, Row } from "antd";
import MenuUser from "../components/User/Menu";
import MenuR from "../components/User/MenuR";
import Navbar from "../components/User/Navbar";
import TrangChu from "../components/User/TrangChu";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: 0,
          background: "#fff",
          position: "fixed",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Navbar />
      </Header>
      <Layout style={{ marginTop: 65 }}>
        <Sider
          width={256}
          theme="light"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <MenuUser />
        </Sider>
        <Layout style={{ marginLeft: 256 }}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#f0f2f5",
              minHeight: 280,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={14} offset={5}>
                <Outlet />
              </Col>
            </Row>
          </Content>
        </Layout>
        <Col span={5}>
          <div style={{ position: "fixed", right: 30, top: 100 }}>
            <MenuR />
          </div>
        </Col>
      </Layout>
    </Layout>
  );
};

export default HomePage;
