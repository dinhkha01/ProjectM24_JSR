import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Tabs, List, Typography, message } from "antd";
import { UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { users } from "../../config/interface";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateFriends,
} from "../../service/Login-Register/Login_Register";
import { RootState } from "../../store";
import styled from "styled-components";

const { TabPane } = Tabs;
const { Title } = Typography;

const pinkColor = "#FF69B4";

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${pinkColor};
  }
  .ant-tabs-ink-bar {
    background-color: ${pinkColor};
  }
`;

const Friends = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state: RootState) => state.users.users);
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  );

  const [friends, setFriends] = useState<users[]>([]);
  const [suggestions, setSuggestions] = useState<users[]>([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && allUsers.length > 0) {
      const friendList = allUsers.filter((user: users) =>
        currentUser.friends?.some(
          (friend: any) =>
            friend.userId === user.id && friend.status === "accept"
        )
      );
      setFriends(friendList);

      const suggestionList = allUsers.filter(
        (user: users) =>
          user.id !== currentUser.id &&
          !currentUser.friends?.some((friend: any) => friend.userId === user.id)
      );
      setSuggestions(suggestionList);
    }
  }, [currentUser, allUsers]);

  const handleAddFriend = (userId: number) => {
    if (currentUser) {
      const newFriends = [
        ...(currentUser.friends || []),
        { userId: userId, status: "pending", add_at: new Date().toISOString() },
      ];
      console.log("newFriends", newFriends);

      dispatch(updateFriends(newFriends))
        .then(() => {
          message.success("Đã gửi lời mời kết bạn");
          // Cập nhật lại danh sách gợi ý
          setSuggestions(suggestions.filter((user) => user.id !== userId));
        })
        .catch((error: any) => {
          message.error("Không thể gửi lời mời kết bạn: " + error.message);
        });
    }
  };

  return (
    <Card>
      <StyledTabs defaultActiveKey="1">
        <TabPane tab="Bạn Bè" key="1">
          <Title level={4}>Your Friends</Title>
          <List
            itemLayout="horizontal"
            dataSource={friends}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar} icon={<UserOutlined />} />}
                  title={user.name}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Gợi ý" key="2">
          <Title level={4}>Gợi ý bạn bè</Title>
          <List
            itemLayout="horizontal"
            dataSource={suggestions}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button
                    icon={<UserAddOutlined />}
                    onClick={() => handleAddFriend(user.id)}
                    style={{
                      backgroundColor: pinkColor,
                      borderColor: pinkColor,
                      color: "white",
                    }}
                  >
                    Add Friend
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar} icon={<UserOutlined />} />}
                  title={user.name}
                  description={user.email}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </StyledTabs>
    </Card>
  );
};

export default Friends;
