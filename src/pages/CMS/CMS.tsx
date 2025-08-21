import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Spin, Tabs } from "antd";

const { TabPane } = Tabs;

const policiesByRole = {
  customer: {
    terms: `<h2>Customer Terms & Conditions</h2>...`, // Replace or reuse your existing customer policy HTML here
    privacy: `<h2>Customer Privacy Policy</h2>...`,
    about: `<h2>Customer About Us</h2>...`,
  },
  provider: {
    terms: `<h2>Provider Terms & Conditions</h2>...`, // Replace or reuse your existing provider policy HTML here
    privacy: `<h2>Provider Privacy Policy</h2>...`,
    about: `<h2>Provider About Us</h2>...`,
  },
};

const CMSPrivacyEditor = ({ userType }) => {
  const [selectedPolicyTab, setSelectedPolicyTab] = useState("privacy");
  const [isFetching, setIsFetching] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // will be set on load
  });

  // When userType or selectedPolicyTab changes, update editor content
  useEffect(() => {
    if (editor && userType && selectedPolicyTab) {
      editor.commands.setContent(
        policiesByRole[userType][selectedPolicyTab] || ""
      );
    }
  }, [userType, selectedPolicyTab, editor]);

  const handlePolicyTabChange = (key) => {
    setSelectedPolicyTab(key);
  };

  const handleSave = () => {
    if (!editor) return;
    const htmlContent = editor.getHTML();
    // Save or send this htmlContent for userType and selectedPolicyTab to backend API
    console.log(
      `Saving content for ${userType} - ${selectedPolicyTab}:`,
      htmlContent
    );
  };

  return (
    <>
      <Tabs
        activeKey={selectedPolicyTab}
        onChange={handlePolicyTabChange}
        size="large"
        className="mb-4"
      >
        <TabPane tab="Terms & Conditions" key="terms" />
        <TabPane tab="Privacy" key="privacy" />
        <TabPane tab="About" key="about" />
      </Tabs>

      <div className="border rounded shadow-md bg-white min-h-[300px]">
        {!editor ? (
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
        disabled={!editor}
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
