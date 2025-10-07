import React, { useState, useEffect, useRef } from "react";
import { Button, Spin, Tabs } from "antd";
import JoditEditor from "jodit-react";
import { useEditCmsMutation, useGetCmsQuery } from "../../redux/api/cmsApi";
import { toast } from "react-toastify";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const { TabPane } = Tabs;

const CMSPrivacyEditor = ({ userType }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedPolicyTab, setSelectedPolicyTab] = useState("privacy-policy");

  const { data, isLoading } = useGetCmsQuery({
    type: userType,
    slug: selectedPolicyTab,
  });

  const [editCms] = useEditCmsMutation();

  // Load content when fetched
  useEffect(() => {
    if (data?.data?.body) {
      setContent(data?.data?.body);
    }
  }, [data]);

  const handleSave = async () => {
    if (!data) return;
    const htmlContent = content;

    const formData = new FormData();
    formData.append("id", data?.data?.id);
    formData.append("body", htmlContent);

    try {
      await editCms(formData).unwrap();
      toast.success("CMS Updated Successfully");
    } catch {
      toast.error("Failed to update CMS.");
    }
  };

  return (
    <>
      <Tabs
        activeKey={selectedPolicyTab}
        onChange={setSelectedPolicyTab}
        size="large"
        className="mb-4"
      >
        <TabPane tab="Terms & Conditions" key="terms-condition" />
        <TabPane tab="Privacy" key="privacy-policy" />
        <TabPane tab="About" key="about-us" />
      </Tabs>

      <div className="border rounded shadow-md bg-white min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            config={{
              readonly: false,
              minHeight: 300,
              toolbarAdaptive: false,
              buttons: [
                "bold",
                "italic",
                "underline",
                "|",
                "ul",
                "ol",
                "|",
                "link",
                "image",
                "|",
                "align",
                "undo",
                "redo",
                "hr",
                "eraser",
              ],
            }}
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-[#EE4E34] transition-colors text-sm"
        style={{ width: "14%" }}
        disabled={isLoading}
      >
        Save
      </button>
    </>
  );
};

const CMSPage = () => {
  const [selectedUserType, setSelectedUserType] = useState("customer");

  const handleUserTypeChange = (key) => {
    setSelectedUserType(key);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <PageBreadcrumb pageTitle="Cms Editor" />


      <Tabs
        activeKey={selectedUserType}
        onChange={handleUserTypeChange}
        size="large"
        className="mb-6"
      >
        <TabPane tab="Customer" key="customer" />
        <TabPane tab="Provider" key="provider" />
      </Tabs>

      <CMSPrivacyEditor userType={selectedUserType} />
    </div>
  );
};

export default CMSPage;
