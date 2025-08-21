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
} from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const { TabPane } = Tabs;

const Ads = () => {
  // Separate ad lists for Customer and Provider
  const [customerAds, setCustomerAds] = useState([
    {
      id: 1,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxpMQrd2k35nY-EuE2lU1Hkmm220Mfpz2QQ&s",
    },
  ]);

  const [providerAds, setProviderAds] = useState([
    {
      id: 2,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LzEvqv7P9axwruY3xNUDmKeIPVJbUu4ZWw&s",
    },
  ]);

  const [activeTab, setActiveTab] = useState("customer");

  // Add image handler based on active tab
  const handleAdd = (file) => {
    if (!file) return;
    const newAd = {
      id: Date.now(),
      url: URL.createObjectURL(file),
    };

    if (activeTab === "customer") {
      setCustomerAds((prev) => [newAd, ...prev]);
    } else {
      setProviderAds((prev) => [newAd, ...prev]);
    }

    message.success("Ad banner added!");
  };

  // Delete ad handler based on active tab
  const handleDelete = (id) => {
    if (activeTab === "customer") {
      setCustomerAds((prev) => prev.filter((ad) => ad.id !== id));
    } else {
      setProviderAds((prev) => prev.filter((ad) => ad.id !== id));
    }
    message.success("Ad banner deleted!");
  };

  // The ads to display based on current tab
  const adsToDisplay = activeTab === "customer" ? customerAds : providerAds;

  return (
    <div>
      <PageBreadcrumb pageTitle="Ads Management" />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginBottom: 20 }}
      >
        <TabPane tab="Customer Banners" key="customer" />
        <TabPane tab="Provider Banners" key="provider" />
      </Tabs>

      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          handleAdd(file);
          return false; // Prevent auto upload
        }}
      >
        <Button
          icon={<UploadOutlined />}
          style={{
            marginBottom: 20,
            backgroundColor: "#465FFF",
            color: "#fff",
          }}
        >
          Add Image (Banner)
        </Button>
      </Upload>

      <Row gutter={[16, 16]}>
        {adsToDisplay.map(({ id, url }) => (
          <Col key={id} xs={24} sm={12} md={8} lg={6}>
            <div
              style={{
                position: "relative",
                border: "1px solid #f0f0f0",
                borderRadius: 4,
                padding: 8,
                textAlign: "center",
              }}
            >
              <Image
                src={url}
                alt={`Ad banner ${id}`}
                style={{ maxWidth: "100%", maxHeight: 150 }}
              />
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
                  style={{ position: "absolute", top: 8, right: 8 }}
                />
              </Popconfirm>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Ads;
