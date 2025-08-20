import React, { useState } from "react";
import CMSPrivacyEditor from "../../components/Editor/Editor";

const PrivacyPolicyPage = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <CMSPrivacyEditor />
    </div>
  );
};

export default PrivacyPolicyPage;
