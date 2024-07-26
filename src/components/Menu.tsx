import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  AppstoreOutlined,
  ReadOutlined,
  TeamOutlined,
  ShopOutlined,
  DownOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const MenuUser = () => {
  return (
    <Menu mode="vertical" theme="dark" style={{ width: 256 }}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Nguyễn Đình Kha
      </Menu.Item>
      <Menu.Item key="friends" icon={<UserOutlined />}>
        Bạn bè
      </Menu.Item>
      <Menu.Item key="professional" icon={<AppstoreOutlined />}>
        Bảng điều khiển chuyên nghiệp
      </Menu.Item>
      <Menu.Item key="feed" icon={<ReadOutlined />}>
        Bảng feed
      </Menu.Item>
      <Menu.Item key="groups" icon={<TeamOutlined />}>
        Nhóm
      </Menu.Item>
      <Menu.Item key="marketplace" icon={<ShopOutlined />}>
        Marketplace
      </Menu.Item>
      <Menu.Item key="more" icon={<DownOutlined />}>
        Xem thêm
      </Menu.Item>
      
      <SubMenu key="shortcuts" title="Lối tắt của bạn">
        <Menu.Item key="game1">Tiến Lên Miền Nam Cybergame</Menu.Item>
        <Menu.Item key="group1">Group YÊU LONG THÀNH</Menu.Item>
        <Menu.Item key="game2">Ludo World</Menu.Item>
        <Menu.Item key="game3">Cờ Tỷ Phú Zagoo</Menu.Item>
        <Menu.Item key="game4">8 Ball Pool</Menu.Item>
      </SubMenu>
      
      <Menu.Item key="more-shortcuts" icon={<DownOutlined />}>
        Xem thêm
      </Menu.Item>
    </Menu>
  );
};

export default MenuUser;