import React, { useState, useMemo } from "react";
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
  Row,
  Col,
} from "antd";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

const { Option } = Select;

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+91xxxxxxxxx78",
    status: "Active",
    approved: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91xxxxxxxxx78",
    status: "Inactive",
    approved: false,
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+91xxxxxxxxx78",
    status: "Active",
    approved: true,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+91xxxxxxxxx78",
    status: "Active",
    approved: false,
  },
  {
    id: 5,
    name: "William Brown",
    email: "william@example.com",
    phone: "+91xxxxxxxxx78",
    status: "Inactive",
    approved: true,
  },
];

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted successfully");
  };

  const handleToggleStatus = (id) => {
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

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, approved: true } : user))
    );
    message.success("User approved");
  };

  const handleDisapprove = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, approved: false } : user))
    );
    message.success("User disapproved");
  };

  const handleAddUser = () => {
    form.validateFields().then((values) => {
      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        approved: false,
        ...values,
      };
      setUsers((prev) => [...prev, newUser]);
      message.success("User added successfully");
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // Filter users by search and status filter
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Filter by status
      if (statusFilter !== "All" && user.status !== statusFilter) return false;
      // Filter by search text in name, email, or phone
      const lowerSearch = searchText.toLowerCase();
      if (
        !user.name.toLowerCase().includes(lowerSearch) &&
        !user.email.toLowerCase().includes(lowerSearch) &&
        !user.phone.toLowerCase().includes(lowerSearch)
      ) {
        return false;
      }
      return true;
    });
  }, [users, searchText, statusFilter]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <a
          style={{ color: "#465FFF", cursor: "pointer" }}
          onClick={() => navigate(`/customer-details/${record.id}`)} // Navigate with user ID if needed
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
      title: "Approval",
      dataIndex: "approved",
      render: (approved) =>
        approved ? (
          <Tag color="blue">Approved</Tag>
        ) : (
          <Tag color="default">Not Approved</Tag>
        ),
      filters: [
        { text: "Approved", value: true },
        { text: "Not Approved", value: false },
      ],
      onFilter: (value, record) => record.approved === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button
            type="default"
            style={{
              backgroundColor:
                record.status === "Inactive" ? "#00A86B" : "#E23D28",
              color: "white",
              width: "110px",
              whiteSpace: "nowrap",
            }}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.status === "Active" ? "Deactivate" : "Activate"}
          </Button>

          {/* 
 {record.approved ? (
            <Button
              type="default"
              danger
              style={{ width: "110px", whiteSpace: "nowrap" }}
              onClick={() => handleDisapprove(record.id)}
            >
              Disapprove
            </Button>
          ) : (
            <Button
              type="primary"
              style={{ width: "110px", whiteSpace: "nowrap" }}
              onClick={() => handleApprove(record.id)}
            >
              Approve
            </Button>
          )}
*/}
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ backgroundColor: "red", color: "white", width: "70px" }}
              type="link"
              icon={<Trash2 size={16} />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Customers Management" />

      {/* Search and Status Filter Row */}
      <Row
        gutter={[16, 16]}
        className="mb-4"
        justify="space-between"
        align="middle"
      >
        <Col xs={24} sm={14} md={12} lg={10} xl={8}>
          <Input.Search
            placeholder="Search by name, email or phone"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            enterButton
            onSearch={(val) => setSearchText(val)}
          />
        </Col>

        <Col xs={24} sm={10} md={6} lg={5} xl={4}>
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            style={{ width: "100%" }}
          >
            <Option value="All">All Status</Option>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Col>

        {/* <Col
          xs={24}
          sm={24}
          md={6}
          lg={5}
          xl={6}
          style={{ textAlign: "right" }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            type="primary"
            style={{ backgroundColor: "#465FFF", borderColor: "#465FFF" }}
          >
            + Add User
          </Button>
        </Col> */}
      </Row>

      <Table
        columns={columns}
        dataSource={filteredUsers}
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
              {
                pattern: /^[0-9+()\- ]+$/,
                message: "Enter a valid phone number.",
              },
            ]}
          >
            <Input placeholder="Enter phone" />
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

export default CustomerManagement;
