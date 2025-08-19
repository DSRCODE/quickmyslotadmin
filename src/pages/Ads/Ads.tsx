import React, { useState } from "react";
import { Upload, Button, Image, Popconfirm, message, Row, Col } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const Ads = () => {
  const [ads, setAds] = useState([
    // Initial dummy ads with image URLs
    {
      id: 1,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjxpMQrd2k35nY-EuE2lU1Hkmm220Mfpz2QQ&s",
    },
    {
      id: 2,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0LzEvqv7P9axwruY3xNUDmKeIPVJbUu4ZWw&s",
    },
  ]);

  // Add image handler from Upload component
  const handleAdd = ( file:any) => {
    // Simulate upload and add to ads list
    if (!file) return;

    // Create a local URL for preview
    const newAd = {
      id: Date.now(),
      url: URL.createObjectURL(file),
    };
    setAds((prev) => [newAd, ...prev]);
    message.success("Ad banner added!");
  };

  // Delete ad by id
  const handleDelete = (id:any) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
    message.success("Ad banner deleted!");
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Ads" />

      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          // Prevent auto upload, we'll handle manually
          handleAdd({ file });
          return false; // prevent upload
        }}
      >
        <Button
          icon={<UploadOutlined />}
          type="primary"
          style={{ marginBottom: 20 }}
        >
          Add Image (Banner)
        </Button>
      </Upload>

      <Row gutter={[16, 16]}>
        {ads.map(({ id, url }) => (
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
