import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Spin, Tabs } from "antd";
import { useEditCmsMutation, useGetCmsQuery } from "../../redux/api/cmsApi";
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const CMSPrivacyEditor = ({ userType }) => {
  const [selectedPolicyTab, setSelectedPolicyTab] = useState("privacy-policy");
  const { data, isLoading } = useGetCmsQuery({
    type: userType,
    slug: selectedPolicyTab,
  });

  console.log(data?.data?.body);
  const editor = useEditor({
    extensions: [StarterKit],
    content: data?.data?.body || "", // load API content here
  });

  useEffect(() => {
    if (editor && data?.data?.body) {
      editor.commands.setContent(data?.data?.body);
    }
  }, [data?.data?.body, editor]);

  const [editCms] = useEditCmsMutation();

  const handleSave = async () => {
    if (!editor || !data) return;
    const htmlContent = editor.getHTML();

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
        {!editor || isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              marginBottom: "10px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <EditorContent
            editor={editor}
            className="p-6 min-h-[300px] w-full prose prose-sm sm:prose lg:prose-lg dark:prose-invert dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-[#FE4C8A] transition-colors text-sm"
        style={{ width: "14%" }}
        disabled={!editor || isLoading}
      >
        Save
      </button>
    </>
  );
};

const CMSPage = () => {
  const [selectedUserType, setSelectedUserType] = useState("customer");

  const handleUserTypeChange = (key: any) => {
    setSelectedUserType(key);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">CMS Editor</h2>

      <Tabs
        activeKey={selectedUserType}
        onChange={handleUserTypeChange}
        size="large"
        className="mb-6"
      >
        <TabPane tab="Customer" key="customer" />
        <TabPane tab="Provider" key="provider" />
      </Tabs>

      {/* Show the editor nested inside selected user type */}
      <CMSPrivacyEditor userType={selectedUserType} />
    </div>
  );
};

export default CMSPage;
