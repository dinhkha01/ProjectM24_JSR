import React from 'react';
import { Layout, Input, Badge, Avatar, Space } from 'antd';
import { 
  HomeFilled, 
  PlaySquareFilled, 
  ShopFilled, 
  TeamOutlined,
  AppstoreOutlined,
  MessageFilled,
  BellFilled,
  MenuOutlined,
  FacebookFilled
} from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;

const Navbar = () => {
  return (
    <Header style={{ 
      background: '#FFC0CB', 
      padding: '0 16px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FacebookFilled style={{ fontSize: '32px', color: '#1877F2', marginRight: '8px' }} />
        <Search
          placeholder="Tìm kiếm trên Facebook"
          style={{ width: 240 }}
        />
      </div>
      
      <Space style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '30%', // Điều chỉnh chiều rộng này để phù hợp với layout của bạn
        maxWidth: '400px' // Đặt chiều rộng tối đa nếu cần
      }}>
        <HomeFilled style={{ fontSize: '24px' }} />
        <PlaySquareFilled style={{ fontSize: '24px' }} />
        <TeamOutlined style={{ fontSize: '24px' }} />
      </Space>
      
      <Space size="large">
      
        <Badge count={0}>
          <Avatar icon={<MessageFilled />} style={{ backgroundColor: '#4E4E4E' }} />
        </Badge>
        <Badge count={0}>
          <Avatar icon={<BellFilled />} style={{ backgroundColor: '#4E4E4E' }} />
        </Badge>
        <Avatar icon={<MenuOutlined />} style={{ backgroundColor: '#4E4E4E' }} />
      </Space>
    </Header>
  );
};

export default Navbar;