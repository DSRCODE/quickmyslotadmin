import React, { useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Select,
  Tag,
} from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const { Option } = Select;

const initialProviders = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    category: "Saloon",
    joinDate: "2025-06-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9123456780",
    category: "Health Care",
    joinDate: "2025-02-10",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+91 7894561230",
    category: "Pet Clinic",
    joinDate: "2024-12-01",
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+91 7012345678",
    category: "Spa",
    joinDate: "2025-07-20",
    status: "Active",
  },
  {
    id: 5,
    name: "William Brown",
    email: "william@example.com",
    phone: "+91 8096543212",
    category: "Automotive Car",
    joinDate: "2025-03-05",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Sophia Lee",
    email: "sophia@example.com",
    phone: "+91 9988776655",
    category: "Retail/Designer",
    joinDate: "2025-04-17",
    status: "Active",
  },
];

const ProvidersManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialProviders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };

  const handleToggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
    message.success("User status updated");
  };

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        ...values,
      };
      setUsers((prev) => [...prev, newUser]);
      message.success("User added successfully");
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <a
          style={{ color: "#465FFF", cursor: "pointer" }}
          onClick={() => navigate(`/providers-details`)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a: any, b: any) => a.category.localeCompare(b.category),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      sorter: (a: any, b: any) =>
        new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="default"
            style={{
              backgroundColor:
                record.status === "Inactive" ? "#00A86B" : "#E23D28",
              color: "white",
              width: "110px",
            }}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.status === "Active" ? "Deactivate" : "Activate"}
          </Button>
          <Popconfirm
            title="Are you sure to delete this provider?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              type="link"
              icon={<Trash2 size={16} />}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Providers Management" />

      {/* Add Button */}
      {/* <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
          style={{
            marginBottom: 20,
            backgroundColor: "#465FFF",
            color: "#fff",
          }}
        >
          + Add User
        </Button>
      </div> */}

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          pageSizeOptions: ["5", "10", "15"],
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
        scroll={{ x: "max-content" }}
      />

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddUser}
        okText="Add"
        zIndex={10000}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please enter phone" },
              { type: "number", message: "Enter a valid phone number." },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            initialValue="Active"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProvidersManagement;
