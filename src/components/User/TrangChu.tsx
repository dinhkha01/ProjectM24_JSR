import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  SendOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Input,
  Modal,
  Button,
  Form,
  Upload,
  message,
  Carousel,
  Image,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAllPost, createPost } from "../../service/Login-Register/Post";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { Outlet } from "react-router-dom";
import { getAllUsers } from "../../service/Login-Register/Login_Register";

const { Meta } = Card;

const TrangChu = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.post);
  const userId = useSelector((state: RootState) => state.users.currentUser);
  console.log(userId?.id);

  const users = useSelector((state: RootState) => state.users.users);
  const getUserName = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Người dùng ẩn danh";
  };
  const getUserAvatar = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user && user.avatar ? user.avatar : "https://via.placeholder.com/32";
  };

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllUsers());
  }, [dispatch]);

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

      // Upload images to Firebase
      for (const file of fileList) {
        const imageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(imageRef, file as RcFile);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      // Prepare data for API
      const postData = {
        content,
        img: imageUrls,
        userId: userId?.id,
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

  const handlePreview = (imageUrl: any) => {
    setPreviewImage(imageUrl);
    setPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setPreviewVisible(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <Card
        style={{ marginBottom: "12px", width: "900px" }}
        onClick={handlePostClick}
      >
        <Meta
          avatar={<Avatar src="https://via.placeholder.com/32" />}
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontWeight: "bold" }}>Bạn đang nghĩ gì thế?</span>
              <PlusOutlined style={{ marginLeft: "auto" }} />
            </div>
          }
        />
      </Card>

      {posts.map((post) => (
        <Card
          key={post.id}
          style={{ marginBottom: "10px", width: "400px" }}
          actions={[
            <HeartOutlined key="like" style={{ fontSize: "24px" }} />,
            <MessageOutlined key="comment" style={{ fontSize: "24px" }} />,
            <SendOutlined key="share" style={{ fontSize: "24px" }} />,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={
                  post.userId
                    ? getUserAvatar(post.userId)
                    : "https://via.placeholder.com/32"
                }
              />
            }
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontWeight: "bold" }}>
                  {getUserName(post.userId)}
                </span>
                <EllipsisOutlined style={{ marginLeft: "auto" }} />
              </div>
            }
          />
          <div style={{ padding: "16px 0" }}>{post.content}</div>
          {post.img.length > 0 && (
            <Carousel>
              {post.img.map((imageUrl, index) => (
                <div key={index}>
                  <img
                    alt={`Post content ${index + 1}`}
                    src={imageUrl}
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                    onClick={() => handlePreview(imageUrl)}
                  />
                </div>
              ))}
            </Carousel>
          )}
          <Input
            placeholder="Thêm bình luận..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              paddingLeft: "16px",
              marginTop: "16px",
            }}
          />
        </Card>
      ))}

      <Image
        width={200}
        style={{ display: "none" }}
        preview={{
          visible: previewVisible,
          src: previewImage,
          onVisibleChange: handlePreviewClose,
        }}
      />

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

export default TrangChu;
