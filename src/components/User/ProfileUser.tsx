import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  Tabs,
  Image,
  Button,
  Row,
  Col,
  Typography,
  Input,
} from "antd";
import {
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
  SendOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { RootState } from "../../store";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Meta } = Card;

interface User {
  id: number;
  name: string;
  avatar: string;
  banner: string;
  friends: Array<{ userId: number; status: string }>;
}

interface Post {
  id: number;
  userId: number;
  content: string;
  img: string[];
  date: string;
}

const ProfileUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const parsedUserId = userId ? parseInt(userId, 10) : undefined;

  const allUsers = useSelector(
    (state: RootState) => state.users.users as User[]
  );
  const posts = useSelector((state: RootState) => state.post.post as Post[]);
  const currentUser = useSelector(
    (state: RootState) => state.users.currentUser as User
  );

  const user = allUsers.find((u) => u.id === parsedUserId);

  const userPosts = posts.filter((post) => post.userId === user?.id);
  const sortedPosts = useMemo(() => {
    return [...userPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [userPosts]);

  const isFriend = currentUser?.friends?.some(
    (friend) => friend.userId === user?.id && friend.status === "accept"
  );

  const pinkButtonStyle = {
    backgroundColor: "#FF69B4",
    borderColor: "#FF69B4",
    color: "white",
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <Card
        cover={
          <div
            style={{
              height: 300,
              background: "#f0f2f5",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              alt="cover"
              src={user.banner || "https://via.placeholder.com/940x300"}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        }
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: "0 24px", position: "relative" }}>
          <div
            style={{ display: "flex", alignItems: "flex-end", marginTop: -90 }}
          >
            <Avatar
              size={180}
              src={user.avatar}
              icon={<UserOutlined />}
              style={{
                border: "4px solid white",
              }}
            />
            <div style={{ marginLeft: 24, marginBottom: 16 }}>
              <Title level={2} style={{ marginBottom: 4 }}>
                {user.name}
              </Title>
              <Text type="secondary">Bạn bè: {user.friends.length}</Text>
            </div>
          </div>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col>
              <Button style={pinkButtonStyle}>
                {isFriend ? "Bạn bè" : "Thêm bạn bè"}
              </Button>
            </Col>
            <Col>
              <Button style={pinkButtonStyle}>Hủy Kết Bạn</Button>
            </Col>
          </Row>
        </div>
        <Tabs defaultActiveKey="1" style={{ padding: "0 16px" }}>
          <TabPane tab="Bài viết" key="1">
            {sortedPosts.map((post) => (
              <Card
                key={post.id}
                style={{ width: "100%", marginBottom: 16 }}
                actions={[
                  <div
                    key="like"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <HeartOutlined
                      style={{
                        fontSize: "20px",
                        marginRight: "5px",
                        color: "#FF69B4",
                      }}
                    />
                    <span style={{ color: "#FF69B4" }}>Thích</span>
                  </div>,
                  <div
                    key="comment"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MessageOutlined
                      style={{
                        fontSize: "20px",
                        marginRight: "5px",
                        color: "#FF69B4",
                      }}
                    />
                    <span style={{ color: "#FF69B4" }}>Bình luận</span>
                  </div>,
                  <div
                    key="share"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SendOutlined
                      style={{
                        fontSize: "20px",
                        marginRight: "5px",
                        color: "#FF69B4",
                      }}
                    />
                    <span style={{ color: "#FF69B4" }}>Chia sẻ</span>
                  </div>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={user.avatar} />}
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: "bold" }}>{user.name}</span>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#65676B",
                            marginLeft: "8px",
                          }}
                        >
                          {new Date(post.date).toLocaleString()}
                        </span>
                      </div>
                      <EllipsisOutlined />
                    </div>
                  }
                />
                <div style={{ padding: "16px 0" }}>{post.content}</div>
                {post.img.length > 0 && (
                  <div style={{ marginTop: "16px" }}>
                    <Image.PreviewGroup>
                      <div
                        style={{
                          display: "grid",
                          gridGap: "2px",
                          gridTemplateColumns: `repeat(${Math.min(
                            post.img.length,
                            3
                          )}, 1fr)`,
                        }}
                      >
                        {post.img.map((imageUrl, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              paddingTop: "100%",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              alt={`Post content ${index + 1}`}
                              src={imageUrl}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </Image.PreviewGroup>
                  </div>
                )}
                <Input
                  placeholder="Viết bình luận..."
                  prefix={
                    <Avatar
                      src={currentUser?.avatar}
                      size={24}
                      style={{ marginRight: "8px" }}
                    />
                  }
                  style={{
                    background: "#F0F2F5",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 12px",
                    marginTop: "16px",
                  }}
                />
              </Card>
            ))}
          </TabPane>
          <TabPane tab="Giới thiệu" key="2">
            <p>Thông tin giới thiệu về {user.name}</p>
          </TabPane>
          <TabPane tab="Bạn bè" key="3">
            <p>Danh sách bạn bè của {user.name}</p>
          </TabPane>
          <TabPane tab="Ảnh" key="4">
            <p>Ảnh của {user.name}</p>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfileUser;
