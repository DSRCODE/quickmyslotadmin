import React, { useState } from "react";
import {
  Upload,
  Button,
  Image,
  Popconfirm,
  message,
  Row,
  Col,
  Tabs,
  Modal,
  Radio,
  Input,
} from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const { TabPane } = Tabs;

const Ads = () => {
  // State per type per tab
  const [customerAds, setCustomerAds] = useState({
    images: [
      {
        id: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxpMQrd2k35nY-EuE2lU1Hkmm220Mfpz2QQ&s",
      },
    ],
    videos: [],
    urls: [],
  });

  const [providerAds, setProviderAds] = useState({
    images: [
      {
        id: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LzEvqv7P9axwruY3xNUDmKeIPVJbUu4ZWw&s",
      },
    ],
    videos: [],
    urls: [],
  });

  const [activeTab, setActiveTab] = useState("customer");
  const [internalTab, setInternalTab] = useState("images"); // images/videos/urls
  const [modalVisible, setModalVisible] = useState(false);
  const [contentType, setContentType] = useState("image");
  const [urlInput, setUrlInput] = useState("");
  const [fileList, setFileList] = useState([]);

  // Helper for current ads
  const currentAds = activeTab === "customer" ? customerAds : providerAds;
  const setCurrentAds =
    activeTab === "customer" ? setCustomerAds : setProviderAds;

  // Open modal resets state
  const openModal = () => {
    setContentType("image");
    setFileList([]);
    setUrlInput("");
    setModalVisible(true);
  };

  // Upload change handler
  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Keep last only
  };

  // Prevent auto upload
  const beforeUpload = () => false;

  // Add new ad item handler
  const addAdItem = (file) => {
    if (contentType === "url") {
      if (!urlInput.trim()) {
        message.error("Please enter a valid URL");
        return false;
      }
      const newItem = { id: Date.now(), url: urlInput.trim() };
      setCurrentAds((prev) => ({
        ...prev,
        urls: [newItem, ...prev.urls],
      }));
    } else {
      if (!file) {
        message.error(`Please select a ${contentType} file`);
        return false;
      }
      const newItem = { id: Date.now(), url: URL.createObjectURL(file) };
      setCurrentAds((prev) => ({
        ...prev,
        [contentType === "image" ? "images" : "videos"]: [
          newItem,
          ...prev[contentType === "image" ? "images" : "videos"],
        ],
      }));
    }
    message.success(
      `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} added!`
    );
    setModalVisible(false);
    setFileList([]);
    setUrlInput("");
    return true;
  };

  // Delete ad item
  const handleDelete = (id) => {
    const adType = internalTab;
    setCurrentAds((prev) => ({
      ...prev,
      [adType]: prev[adType].filter((item) => item.id !== id),
    }));
    message.success("Ad banner deleted!");
  };

  // Toggle Visibility
  const toggleVisibility = (id) => {
    setCurrentAds((prev) => ({
      ...prev,
      [internalTab]: prev[internalTab].map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    }));
  };

  // Items to display
  const adsToDisplay = currentAds[internalTab];

  // Render logic for URLs: detect image or video or fallback
  const renderUrl = (url, id) => {
    const videoExtensions = /\.(mp4|webm|ogg)$/i;
    const imageExtensions = /\.(jpeg|jpg|gif|png|svg)$/i;

    if (videoExtensions.test(url)) {
      return (
        <video
          src={url}
          controls
          style={{ maxWidth: "100%", maxHeight: 150 }}
        />
      );
    }
    if (imageExtensions.test(url)) {
      return (
        <Image
          src={url}
          alt={`URL banner ${id}`}
          style={{ maxWidth: "100%", maxHeight: 150 }}
        />
      );
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{ display: "inline-block", wordBreak: "break-all" }}
      >
        {url.length > 30 ? url.substr(0, 27) + "..." : url}
      </a>
    );
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Ads Management" />

      {/* Main Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 20 }}
      >
        <TabPane tab="Customer Banners" key="customer" />
        <TabPane tab="Provider Banners" key="provider" />
      </Tabs>

      <Button
        onClick={openModal}
        style={{ marginBottom: 20, backgroundColor: "#007FFF", color: "white" }}
      >
        Add New Image/Video/Url
      </Button>

      {/* Inner Tabs */}
      <Tabs
        activeKey={internalTab}
        onChange={setInternalTab}
        style={{ marginBottom: 20 }}
      >
        <TabPane tab="Images" key="images" />
        <TabPane tab="Videos" key="videos" />
        <TabPane tab="URLs" key="urls" />
      </Tabs>

      {/* Ads Grid */}
      <Row gutter={[16, 16]}>
        {adsToDisplay.map(({ id, url, visible = true }) => (
          <Col key={id} xs={24} sm={12} md={8} lg={6}>
            <div className="flex items-center justify-between px-2">
              <div>
                <p>Action</p>
              </div>
              <div>
                <Popconfirm
                  title="Are you sure to delete this banner?"
                  onConfirm={() => handleDelete(id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>

                <Button
                  type="text"
                  icon={visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  onClick={() => toggleVisibility(id)}
                  title={visible ? "Hide this banner" : "Show this banner"}
                />
              </div>
            </div>
            <div
              style={{
                opacity: visible ? 1 : 0.4,
                position: "relative",
                border: "1px solid #f0f0f0",
                borderRadius: 4,
                padding: 8,
                textAlign: "center",
              }}
            >
              {internalTab === "videos" ? (
                <video
                  src={url}
                  controls
                  style={{ maxWidth: "100%", maxHeight: 150 }}
                />
              ) : internalTab === "urls" ? (
                renderUrl(url, id)
              ) : (
                <Image
                  src={url}
                  alt={`${internalTab} banner ${id}`}
                  style={{ maxWidth: "100%", maxHeight: 150 }}
                />
              )}
            </div>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
      <Modal
        title={`Add New ${
          contentType.charAt(0).toUpperCase() + contentType.slice(1)
        }`}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setFileList([]);
          setUrlInput("");
        }}
        onOk={() => {
          if (contentType === "url") {
            addAdItem("");
          } else {
            if (fileList.length === 0) {
              message.error(`Please select a ${contentType} file.`);
              return;
            }
            addAdItem(fileList[0].originFileObj);
          }
        }}
      >
        <div>
          <Radio.Group
            onChange={(e) => {
              setContentType(e.target.value);
              setFileList([]);
              setUrlInput("");
            }}
            value={contentType}
            style={{ marginBottom: 20 }}
          >
            <Radio value="image">Image</Radio>
            <Radio value="video">Video</Radio>
            <Radio value="url">URL</Radio>
          </Radio.Group>
        </div>

        {contentType === "url" && (
          <Input
            placeholder="Enter URL of image or video"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        )}

        {(contentType === "image" || contentType === "video") && (
          <Upload
            accept={contentType + "/*"}
            fileList={fileList}
            listType="picture"
            onChange={onUploadChange}
            beforeUpload={beforeUpload}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select {contentType}</Button>
          </Upload>
        )}
      </Modal>
    </div>
  );
};

export default Ads;
