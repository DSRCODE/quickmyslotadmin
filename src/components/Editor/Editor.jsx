import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Spin, Tabs } from "antd";

const { TabPane } = Tabs;

const CMSPrivacyEditor = () => {
  const [selectedRole, setSelectedRole] = useState("privacy");
  const [isFetching, setIsFetching] = useState(false); // Simulate loading if needed

  const getSlug = (role) => {
    switch (role) {
      case "terms":
        return "terms-and-conditions";
      case "privacy":
        return "privacy-policy";
      case "about":
        return "about-us";
      default:
        return "";
    }
  };

  const policies = {
    terms: `
      <h2>🔵 Terms & Conditions</h2>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p><strong>Last Updated:</strong> [Insert Date]</p>

      <h3>1. Introduction</h3>
      <p>This Privacy Policy explains how we collect, use, and protect your information when you use our platform as a <strong>Vendor</strong>.</p>

      <h3>2. Information We Collect</h3>
      <ul>
        <li><strong>Personal Information:</strong> Name, email, phone number, address, business name, GST details.</li>
        <li><strong>Business Information:</strong> Product listings, inventory, pricing, order fulfillment details.</li>
        <li><strong>Financial Data:</strong> Bank account details, UPI ID, tax ID, payout history.</li>
        <li><strong>Usage Data:</strong> IP address, browser type, login logs, device data.</li>
      </ul>

      <h3>3. How We Use Your Information</h3>
      <ul>
        <li>To list and display your products on the platform.</li>
        <li>To process and manage orders and payments.</li>
        <li>To contact you for business communications or customer support.</li>
        <li>To comply with legal and regulatory requirements.</li>
      </ul>

      <h3>4. Sharing of Information</h3>
      <ul>
        <li>Shared with customers during purchase (business name, contact info).</li>
        <li>Shared with delivery partners for shipment fulfillment.</li>
        <li>Shared with payment gateways for payouts.</li>
      </ul>

      <h3>5. Data Retention</h3>
      <p>We retain vendor information as long as your account is active or as required by law.</p>

      <h3>6. Your Rights</h3>
      <p>You can update, delete, or correct your information by contacting support or through your dashboard settings.</p>

      <h3>7. Contact Us</h3>
      <p>If you have questions about this policy, contact us at <strong>[Insert Support Email]</strong>.</p>
    `,
    privacy: `
      <h2>🟢 Privacy Policy</h2>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p><strong>Last Updated:</strong> [Insert Date]</p>

      <h3>1. Introduction</h3>
      <p>This Privacy Policy outlines how your personal data is collected, used, and shared when you use our platform as a <strong>Customer</strong>.</p>

      <h3>2. Information We Collect</h3>
      <ul>
        <li><strong>Personal Information:</strong> Full name, email, phone number, shipping and billing address.</li>
        <li><strong>Payment Data:</strong> Card details, UPI ID (processed securely via payment gateways).</li>
        <li><strong>Order History:</strong> Items purchased, transaction IDs, delivery details.</li>
        <li><strong>Device & Usage Info:</strong> IP address, device type, login logs.</li>
      </ul>

      <h3>3. How We Use Your Information</h3>
      <ul>
        <li>To process orders and deliver products.</li>
        <li>To send order confirmations, invoices, and support updates.</li>
        <li>To improve our platform and customer experience.</li>
        <li>To offer personalized product recommendations.</li>
      </ul>

      <h3>4. Sharing of Information</h3>
      <ul>
        <li>Shared with vendors to fulfill your order.</li>
        <li>Shared with delivery partners for shipment tracking.</li>
        <li>Shared with payment processors for secure transactions.</li>
      </ul>

      <h3>5. Data Retention</h3>
      <p>Your data is retained as long as your account is active or as needed to fulfill our obligations.</p>

      <h3>6. Your Rights</h3>
      <p>You may request access, correction, or deletion of your data by contacting our support team.</p>

      <h3>7. Contact Us</h3>
      <p>If you have any concerns, contact us at <strong>[Insert Support Email]</strong>.</p>
    `,
    about: `
      <h2>🟠 About Us</h2>
      <p><strong>Effective Date:</strong> [Insert Date]</p>
      <p><strong>Last Updated:</strong> [Insert Date]</p>

      <h3>1. Introduction</h3>
      <p>This Privacy Policy describes how we collect and use information from individuals acting as <strong>Delivery Partners</strong> on our platform.</p>

      <h3>2. Information We Collect</h3>
      <ul>
        <li><strong>Personal Information:</strong> Full name, phone number, email, address.</li>
        <li><strong>Government IDs:</strong> Driving license, Aadhaar, PAN card (for verification).</li>
        <li><strong>Vehicle Info:</strong> Vehicle type, registration number, insurance details.</li>
        <li><strong>Location Data:</strong> Real-time GPS tracking during deliveries.</li>
      </ul>

      <h3>3. How We Use Your Information</h3>
      <ul>
        <li>To assign, track, and confirm deliveries.</li>
        <li>To ensure compliance with safety and regulatory requirements.</li>
        <li>To provide real-time delivery updates to customers and vendors.</li>
        <li>To process payments and reimbursements.</li>
      </ul>

      <h3>4. Sharing of Information</h3>
      <ul>
        <li>Shared with customers and vendors to confirm delivery status.</li>
        <li>Shared with third-party services for payment disbursal.</li>
      </ul>

      <h3>5. Data Retention</h3>
      <p>We retain delivery partner data as long as necessary to meet legal, business, and operational needs.</p>

      <h3>6. Your Rights</h3>
      <p>Delivery partners can access, update, or request deletion of their information through the delivery app or support.</p>

      <h3>7. Contact Us</h3>
      <p>For privacy-related questions, please contact <strong>[Insert Support Email]</strong>.</p>
    `,
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: "", // Will be set by useEffect
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(policies[selectedRole]);
    }
  }, [selectedRole, editor]);

  const handleTabChange = (key) => {
    setSelectedRole(key);
  };

  const handleSave = () => {
    if (!editor) return;
    const htmlContent = editor.getHTML();
    // Future: Add save API integration here
    // For now, just log or show message
    console.log(`Saving content for ${selectedRole}:`, htmlContent);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">CMS Editor</h2>

      <Tabs
        activeKey={selectedRole}
        onChange={handleTabChange}
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
            className="p-6 min-h-[300px] w-full prose prose-sm sm:prose lg:prose-lg
              dark:prose-invert dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900"
          />
        )}
      </div>

      <Button
        type="primary"
        onClick={handleSave}
        size="large"
        className="mt-6"
        style={{ width: "14%" }}
        disabled={!editor}
      >
        Save
      </Button>
    </div>
  );
};

export default CMSPrivacyEditor;
