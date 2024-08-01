import React, { useState, useEffect } from "react";
import { List, Avatar, Typography, Button, Divider, message } from "antd";
import { BellOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { getAllUsers } from "../../service/Login-Register/Login_Register";

const { Title, Text } = Typography;

interface FriendRequest {
  content: string;
  userId: number;
  date: string;
}

const Notify: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser
  ) as {
    notyfi: FriendRequest[];
    friends: { userId: number; status: string }[];
  } | null;
  const allUsers = useSelector((state: RootState) => state.users.users);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const isAcceptedFriend = (userId: number) => {
    return currentUser?.friends.some(
      (friend) => friend.userId === userId && friend.status === "accept"
    );
  };

  useEffect(() => {
    if (currentUser && currentUser.notyfi) {
      const filteredRequests = currentUser.notyfi.filter(
        (request) => !isAcceptedFriend(request.userId)
      );
      setFriendRequests(filteredRequests);
    }
  }, [currentUser]);

  const handleAccept = (userId: number) => {
    // Implement the logic to accept friend request
    message.success("Đã chấp nhận lời mời kết bạn");
    setFriendRequests(
      friendRequests.filter((request) => request.userId !== userId)
    );
  };

  const handleDecline = (userId: number) => {
    // Implement the logic to decline friend request
    message.info("Đã từ chối lời mời kết bạn");
    setFriendRequests(
      friendRequests.filter((request) => request.userId !== userId)
    );
  };

  const getUserInfo = (userId: number) => {
    const user = allUsers.find((user) => user.id === userId);
    return user
      ? {
          name: user.name,
          avatar: user.avatar || undefined,
        }
      : {
          name: "Unknown User",
          avatar: undefined,
        };
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Title level={3}>
          <BellOutlined /> Lời mời kết bạn
        </Title>
      </div>

      {friendRequests.length === 0 ? (
        <Text>Không có lời mời kết bạn mới</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={friendRequests}
          renderItem={(item) => {
            const userInfo = getUserInfo(item.userId);
            return (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleAccept(item.userId)}
                    style={{ marginRight: 8 }}
                  >
                    Đồng ý
                  </Button>,
                  <Button onClick={() => handleDecline(item.userId)}>
                    Từ chối
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={userInfo.avatar}
                      icon={!userInfo.avatar && <UserOutlined />}
                      size={48}
                    />
                  }
                  title={
                    <div>
                      <UserAddOutlined
                        style={{ color: "#722ed1", marginRight: 8 }}
                      />
                      <Text strong>
                        {userInfo.name} {item.content}
                      </Text>
                    </div>
                  }
                  description={
                    <Text type="secondary">
                      {new Date(item.date).toLocaleString("vi-VN")}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}

      <Divider />

      <Button type="link" block>
        Xem tất cả lời mời kết bạn
      </Button>
    </div>
  );
};

export default Notify;
