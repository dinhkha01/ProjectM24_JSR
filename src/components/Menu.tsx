import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  YoutubeOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const MenuUser = () => {
  return (
    <Sider width={220} theme="light">
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Trang chủ
        </Menu.Item>
        <Menu.Item key="2" icon={<YoutubeOutlined />}>
          Watch
        </Menu.Item>
        <Menu.Item key="3" icon={<ShopOutlined />}>
          Marketplace
        </Menu.Item>
        <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
          Nhóm
        </Menu.Item>
        <Menu.Item key="5" icon={<AppstoreOutlined />}>
          Xem thêm
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuUser;