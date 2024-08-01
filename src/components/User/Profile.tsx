import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Modal,
  Form,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  EllipsisOutlined,
  CameraOutlined,
  HeartOutlined,
  MessageOutlined,
  SendOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { RootState } from "../../store";
import { createPost, getAllPost } from "../../service/Login-Register/Post";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  pushAvatar,
  pushBanner,
} from "../../service/Login-Register/Login_Register";

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { Meta } = Card;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.currentUser);
  console.log(user);

  const posts = useSelector((state: RootState) => state.post.post);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const userPosts = posts.filter((post) => post.userId === user?.id);
  const sortedPosts = useMemo(() => {
    return [...userPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [userPosts]);

  const handlePostClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
  };

  const handlePostSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { content } = values;

      let imageUrls: string[] = [];

      for (const file of fileList) {
        const imageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(imageRef, file as RcFile);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      const postData = {
        content,
        img: imageUrls,
        userId: user?.id,
        date: new Date().toISOString(),
      };

      dispatch(createPost(postData));

      message.success("Bài viết đã được đăng thành công");
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);

      dispatch(getAllPost());
    } catch (error) {
      console.error("Error posting:", error);
      message.error("Có lỗi xảy ra khi đăng bài viết");
    }
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList((prevList) => [...prevList, file]);
      return false;
    },
    fileList,
  };

  const handleAvatarUpload = async (file: RcFile) => {
    const imageRef = ref(storage, `avatars/${user?.id}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    dispatch(pushAvatar(url));

    message.success("Ảnh đại diện đã được cập nhật");
  };

  const handleBannerUpload = async (file: RcFile) => {
    const imageRef = ref(storage, `covers/${user?.id}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    dispatch(pushBanner(url));

    message.success("Ảnh bìa đã được cập nhật");
  };

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
              src={user?.banner || "https://via.placeholder.com/940x300"}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={handleBannerUpload}
            >
              <Button
                icon={<CameraOutlined />}
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  zIndex: 1000,
                }}
              >
                Chỉnh sửa ảnh bìa
              </Button>
            </Upload>
          </div>
        }
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: "0 24px", position: "relative" }}>
          <div
            style={{ display: "flex", alignItems: "flex-end", marginTop: -90 }}
          >
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={handleAvatarUpload}
            >
              <Avatar
                size={180}
                src={user?.avatar}
                icon={<UserOutlined />}
                style={{
                  border: "4px solid white",
                  cursor: "pointer",
                }}
              />
            </Upload>
            <div style={{ marginLeft: 24, marginBottom: 16 }}>
              <Title level={2} style={{ marginBottom: 4 }}>
                {user?.name}
              </Title>
              <Text type="secondary">500 bạn bè</Text>
            </div>
          </div>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col>
              <Button type="primary">Thêm vào tin</Button>
            </Col>
            <Col>
              <Button icon={<EditOutlined />}>Chỉnh sửa trang cá nhân</Button>
            </Col>
            <Col>
              <Button icon={<EllipsisOutlined />} />
            </Col>
          </Row>
        </div>
        <Tabs defaultActiveKey="1" style={{ padding: "0 16px" }}>
          <TabPane tab="Bài viết" key="1">
            <Card
              style={{ width: "100%", cursor: "pointer", marginBottom: 16 }}
              onClick={handlePostClick}
            >
              <Meta
                avatar={<Avatar src={user?.avatar} />}
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {user?.name}, bạn đang nghĩ gì thế?
                    </span>
                    <PlusOutlined style={{ marginLeft: "auto" }} />
                  </div>
                }
              />
            </Card>
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
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    <span>Thích</span>
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
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    <span>Bình luận</span>
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
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    <span>Chia sẻ</span>
                  </div>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={user?.avatar} />}
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: "bold" }}>{user?.name}</span>
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
                      src={user?.avatar}
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
            <p>Thông tin giới thiệu về {user?.name}</p>
          </TabPane>
          <TabPane tab="Bạn bè" key="3">
            <p>Danh sách bạn bè của {user?.name}</p>
          </TabPane>
          <TabPane tab="Ảnh" key="4">
            <p>Ảnh của {user?.name}</p>
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Tạo bài viết mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handlePostSubmit}>
            Đăng
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung bài viết" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Nội dung bài viết" />
          </Form.Item>
          <Form.Item name="images">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
