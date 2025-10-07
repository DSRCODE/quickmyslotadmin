import React, { useState } from "react";
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input,
  Checkbox,
  Spin,
} from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useSidebar } from "../../context/SidebarContext";
import {
  useGetfaqQuery,
  useAddfaqMutation,
  useUpdatefaqMutation,
  useDeletefaqMutation,
} from "../../redux/api/faqApi";

const FaqManagement = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { data, isLoading, refetch } = useGetfaqQuery("");
  const [addFaq, { isLoading: adding }] = useAddfaqMutation();
  const [updateFaq, { isLoading: updating }] = useUpdatefaqMutation();
  const [deleteFaq, { isLoading: deleting }] = useDeletefaqMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setEditingFaq(record);
    form.setFieldsValue({
      category: record.category,
      question: record.question,
      answer: record.answer,
      is_active: record.is_active,
    });
    setOpenModal(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      const { category, question, answer, is_active } = values;
      const formData = new FormData();
      formData.append("category", category);
      formData.append("question", question);
      formData.append("answer", answer);
      formData.append("is_active", (is_active ? 1 : 0).toString());

      if (editingFaq) {
        await updateFaq({ formData, id: editingFaq.id }).unwrap();
        message.success("FAQ updated successfully!");
      } else {
        await addFaq(formData).unwrap();
        message.success("FAQ added successfully!");
      }

      setOpenModal(false);
      setEditingFaq(null);
      form.resetFields();
      refetch();
    } catch (error) {
      console.error(error);
      message.error("Failed to save FAQ. Please try again.");
    }
  };

  const handleDelete = async (record: any) => {
    try {
      await deleteFaq(record?.id).unwrap();
      message.success("FAQ deleted successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      message.error("Failed to delete FAQ.");
    }
  };

  return (
    <div
      className={`flex-1 transition-all duration-300 ease-in-out ${
        isExpanded || isHovered
          ? "lg:pl-0 lg:w-[1190px]"
          : "lg:pl-[0px] lg:w-[1390px]"
      } ${isMobileOpen ? "ml-0" : ""}`}
    >
      <PageBreadcrumb pageTitle="FAQ Management" />

      <div className="p-4">
        <Button
          type="primary"
          className="bg-[#EE4E34] hover:bg-[#d3452f]"
          onClick={() => setOpenModal(true)}
        >
          Add FAQ
        </Button>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              dataSource={data?.data || []}
              rowKey="_id"
              columns={[
                { title: "Category", dataIndex: "category" },
                { title: "Question", dataIndex: "question" },
                { title: "Answer", dataIndex: "answer" },
                {
                  title: "Active",
                  dataIndex: "is_active",
                  render: (is_active) => (is_active ? "Yes" : "No"),
                },
                {
                  title: "Action",
                  render: (_, record) => (
                    <div className="flex gap-2">
                      <Button
                        type="link"
                        onClick={() => handleEdit(record)}
                        className="text-[#EE4E34]"
                      >
                        Edit
                      </Button>
                      <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record)}
                      >
                        Delete
                      </Button>
                    </div>
                  ),
                },
              ]}
              pagination={false}
            />
          )}
        </div>

        <Modal
          title={editingFaq ? "Update FAQ" : "Add FAQ"}
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
            setEditingFaq(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            encType="multipart/form-data"
          >
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please enter category" }]}
            >
              <Input placeholder="Enter category" />
            </Form.Item>

            <Form.Item
              label="Question"
              name="question"
              rules={[{ required: true, message: "Please enter question" }]}
            >
              <Input placeholder="Enter question" />
            </Form.Item>

            <Form.Item
              label="Answer"
              name="answer"
              rules={[{ required: true, message: "Please enter answer" }]}
            >
              <Input.TextArea placeholder="Enter answer" rows={4} />
            </Form.Item>

            <Form.Item name="is_active" valuePropName="checked">
              <Checkbox>Active</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={adding || updating}
                className="bg-[#EE4E34] hover:bg-[#d3452f] w-full"
              >
                {editingFaq ? "Update FAQ" : "Add FAQ"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default FaqManagement;
