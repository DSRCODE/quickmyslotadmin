import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Popconfirm,
  Card,
} from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useSidebar } from "../../context/SidebarContext";

// Simulate API Data
const initialRanges = [
  { id: 1, min: 0, max: 500, discount: 5 },
  { id: 2, min: 501, max: 1000, discount: 7 },
];

const SetDiscount = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [list, setList] = useState(initialRanges);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  // Handlers for Add Modal
  const [addForm] = Form.useForm();
  const showAddModal = () => setIsAddModal(true);
  const handleAddOk = () => {
    addForm.validateFields().then((values) => {
      setList([
        ...list,
        {
          ...values,
          id: Math.max(0, ...list.map((l) => l.id)) + 1,
        },
      ]);
      addForm.resetFields();
      setIsAddModal(false);
    });
  };
  const handleAddCancel = () => {
    addForm.resetFields();
    setIsAddModal(false);
  };

  // Handlers for Edit Modal
  const [editForm] = Form.useForm();
  const showEditModal = (record) => {
    setCurrentEdit(record);
    editForm.setFieldsValue(record);
    setIsEditModal(true);
  };
  const handleEditOk = () => {
    editForm.validateFields().then((values) => {
      setList(
        list.map((item) =>
          item.id === currentEdit.id ? { ...item, ...values } : item
        )
      );
      setIsEditModal(false);
    });
  };
  const handleEditCancel = () => setIsEditModal(false);

  // Delete handler
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  // Console data on submit
  const handleSubmit = () => {
    console.log("Discount Ranges:", list);
  };

  const columns = [
    { title: "Min Price", dataIndex: "min", key: "min" },
    { title: "Max Price", dataIndex: "max", key: "max" },
    { title: "Discount (%)", dataIndex: "discount", key: "discount" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div
      className={`flex-1 transition-all duration-300 ease-in-out ${
        isExpanded || isHovered
          ? "lg:pl-0 lg:w-[1190px]"
          : "lg:pl-[0px] lg:w-[1390px]"
      } ${isMobileOpen ? "ml-0" : ""}`}
    >
      <PageBreadcrumb pageTitle="Set Discount Percentage" />
      <Card style={{ marginTop: 24 }}>
        <Button type="primary" onClick={showAddModal}>
          Add Discount Range
        </Button>
        <Table
          dataSource={list}
          columns={columns}
          rowKey="id"
          style={{ marginTop: 16 }}
          pagination={false}
        />
        {/* <Button type="default" onClick={handleSubmit} style={{ marginTop: 18 }}>
          Submit (Console Log)
        </Button> */}
      </Card>

      {/* Add Modal */}
      <Modal
        title="Add Discount Range"
        open={isAddModal}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        okText="Add"
      >
        <Form form={addForm} layout="vertical">
          <Form.Item
            name="min"
            label="Min Price"
            rules={[
              { required: true, type: "number", message: "Enter min price" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="max"
            label="Max Price"
            rules={[
              { required: true, type: "number", message: "Enter max price" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[
              { required: true, type: "number", message: "Enter discount" },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Discount Range"
        open={isEditModal}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Update"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="min"
            label="Min Price"
            rules={[
              { required: true, type: "number", message: "Enter min price" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="max"
            label="Max Price"
            rules={[
              { required: true, type: "number", message: "Enter max price" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[
              { required: true, type: "number", message: "Enter discount" },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SetDiscount;
