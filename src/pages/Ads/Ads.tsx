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
  Spin,
} from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  useAddAdMutation,
  useGetAdsQuery,
  useDeleteAdMutation,
} from "../../redux/api/AdsApi";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const Ads = () => {
  const { data: adsData, isLoading, refetch } = useGetAdsQuery({});
  const [addAd, { isLoading: saving }] = useAddAdMutation();
  const [deleteAd] = useDeleteAdMutation();

  const [activeTab, setActiveTab] = useState("user"); // user | vendor
  const [internalTab, setInternalTab] = useState("image"); // image | video | url
  const [modalVisible, setModalVisible] = useState(false);
  const [contentType, setContentType] = useState("image");
  const [urlInput, setUrlInput] = useState("");
  const [positionInput, setPositionInput] = useState("");
  const [fileList, setFileList] = useState([]);

  // Regex helpers
  const videoExtensions = /\.(mp4|webm|ogg)$/i;
  const imageExtensions = /\.(jpeg|jpg|gif|png|svg)$/i;

  // Open modal
  const openModal = () => {
    setContentType("image");
    setFileList([]);
    setUrlInput("");
    setPositionInput("");
    setModalVisible(true);
  };

  // Upload change handler
  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const beforeUpload = () => false;

  // Add Ad Item
  const addAdItem = async (file: any) => {
    let formData = new FormData();

    if (contentType === "url") {
      if (!urlInput.trim()) {
        toast.error("Please enter a valid URL");
        return;
      }
      formData.append("image", urlInput.trim());
    } else {
      if (!file) {
        toast.error(`Please select a ${contentType} file`);
        return;
      }
      formData.append("image", file);
    }

    formData.append("type", activeTab === "user" ? "user" : "vendor");
    formData.append("extensions", contentType);
    formData.append("position", positionInput);

    try {
      await addAd(formData).unwrap();
      toast.success(`${contentType} uploaded!`);
      setModalVisible(false);
      setFileList([]);
      setUrlInput("");
      refetch();
    } catch (e) {
      toast.error("Ad upload failed. Please try again.");
    }
  };

  // Delete Ad
  const handleDelete = async (id: number) => {
    console.log(id);
    try {
      let formData = new FormData();
      formData.append("id", id.toString());
      await deleteAd(formData).unwrap();
      toast.success("Ad deleted!");
      refetch();
    } catch (e) {
      toast.error("Failed to delete ad.");
    }
  };

  // Filtering ads
  const filteredAds =
    adsData?.data?.filter((ad) => {
      if (ad.type !== activeTab) return false;

      if (internalTab === "image") {
        return (
          ad.extensions === "image" ||
          (ad.extensions === "url" && imageExtensions.test(ad.image))
        );
      }

      if (internalTab === "video") {
        return (
          ad.extensions === "video" ||
          (ad.extensions === "url" && videoExtensions.test(ad.image))
        );
      }

      if (internalTab === "url") {
        return (
          ad.extensions === "url" &&
          !imageExtensions.test(ad.image) &&
          !videoExtensions.test(ad.image)
        );
      }

      return true;
    }) || [];

  // Render preview
  const renderPreview = (ad: any) => {
    if (
      ad.extensions === "image" ||
      (ad.extensions === "url" && imageExtensions.test(ad.image))
    ) {
      return (
        <Image
          src={ad.image}
          alt="ad banner"
          style={{ maxWidth: "100%", maxHeight: 150 }}
        />
      );
    }

    if (
      ad.extensions === "video" ||
      (ad.extensions === "url" && videoExtensions.test(ad.image))
    ) {
      return (
        <video
          src={ad.image}
          controls
          style={{ maxWidth: "100%", maxHeight: 150 }}
        />
      );
    }

    return (
      <a href={ad.image} target="_blank" rel="noreferrer">
        {ad.image.length > 30 ? ad.image.substr(0, 27) + "..." : ad.image}
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
        <TabPane tab="Customer Banners" key="user" />
        <TabPane tab="Provider Banners" key="vendor" />
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
        <TabPane tab="Images" key="image" />
        <TabPane tab="Videos" key="video" />
        <TabPane tab="URLs" key="url" />
      </Tabs>

      {/* Ads Grid */}
      {isLoading ? (
        <Spin tip="Loading ads..." />
      ) : (
        <Row gutter={[16, 16]}>
          {filteredAds.map((ad) => (
            <Col key={ad.id} xs={24} sm={12} md={8} lg={6}>
              <div
                style={{
                  border: "1px solid #f0f0f0",
                  borderRadius: 4,
                  padding: 8,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {renderPreview(ad)}

                {/* Delete Button */}
                <Popconfirm
                  title="Are you sure you want to delete this ad?"
                  onConfirm={() => handleDelete(ad.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    style={{ position: "absolute", top: 8, right: 8 }}
                  />
                </Popconfirm>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Add Modal */}
      <Modal
        title={`Add New ${contentType}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
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
        confirmLoading={saving}
      >
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

        {contentType === "url" && (
          <Input
            placeholder="Enter URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            style={{ marginBottom: "8px" }}
          />
        )}

        <Input
          placeholder="Enter Position"
          value={positionInput}
          onChange={(e) => setPositionInput(e.target.value)}
          style={{ marginBottom: "8px" }}
        />

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
