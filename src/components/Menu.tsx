import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  SearchOutlined,
  CompassOutlined,
  VideoCameraOutlined,
  MessageOutlined,
  HeartOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from '@ant-design/icons';

const MenuUser = () => {
  return (
    <Menu mode="inline" theme="light" style={{ width: 220, borderRight: 'none' }}>
      <div style={{ padding: '20px 0', textAlign: 'center' }}>
        <h2 style={{ margin: 0 }}>DKGram</h2>
      </div>
      
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Trang chủ
      </Menu.Item>
      <Menu.Item key="search" icon={<SearchOutlined />}>
        Tìm kiếm
      </Menu.Item>
      <Menu.Item key="explore" icon={<CompassOutlined />}>
        Khám phá
      </Menu.Item>
      <Menu.Item key="reels" icon={<VideoCameraOutlined />}>
        Reels
      </Menu.Item>
      <Menu.Item key="messages" icon={<MessageOutlined />}>
        Tin nhắn
      </Menu.Item>
      <Menu.Item key="notifications" icon={<HeartOutlined />}>
        Thông báo
      </Menu.Item>
      <Menu.Item key="create" icon={<PlusSquareOutlined />}>
        Tạo
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Trang cá nhân
      </Menu.Item>
      
      <Menu.Item key="more" style={{ position: 'absolute', bottom: 20 }}>
        Xem thêm
      </Menu.Item>
    </Menu>
  );
};

export default MenuUser;