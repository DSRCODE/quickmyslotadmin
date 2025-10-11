import React, { useState } from "react";
import { Tabs, Table, Button } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useGettransactionQuery } from "../../redux/api/transactionApi";

const { TabPane } = Tabs;

const Transaction = () => {
  const [activeRole, setActiveRole] = useState("customer");

  // Fetch transactions based on active role
  const { data, isLoading, isFetching } = useGettransactionQuery({
    role: activeRole,
  });

  // Flattened transaction list
  const transactions = data?.data || [];

  // Table Columns including Action with Invoice button
  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Description",
      dataIndex: "payment_mode",
      key: "description",
      render: (_, record) =>
        `${record.type === "credit" ? "Credit" : "Debit"}: ${
          record.payment_mode
        }`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (val) => `₹${parseFloat(val).toFixed(2)}`,
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transactionId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => downloadSingleInvoice(record)}>
          Invoice
        </Button>
      ),
    },
  ];

  // Generate PDF of a single transaction
  const downloadSingleInvoice = (txn) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Transaction Invoice`, 14, 22);
    doc.setFontSize(12);
    doc.text(`Role: ${activeRole}`, 14, 32);
    doc.text(`Date: ${new Date(txn.created_at).toLocaleDateString()}`, 14, 40);
    doc.text(
      `Description: ${txn.type === "credit" ? "Credit" : "Debit"} - ${
        txn.payment_mode
      }`,
      14,
      48
    );
    doc.text(`Amount: ₹${parseFloat(txn.amount).toFixed(2)}`, 14, 56);
    doc.text(`Transaction ID: ${txn.transaction_id}`, 14, 64);

    doc.save(`Invoice_${txn.transaction_id}.pdf`);
  };

  return (
    <div style={{ padding: 24 }}>
      <PageBreadcrumb pageTitle="Transaction History" />
      <Tabs
        activeKey={activeRole}
        onChange={setActiveRole}
        type="line"
        animated
      >
        <TabPane tab="Customer" key="customer" />
        <TabPane tab="Vendor" key="vendor" />
      </Tabs>

      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        loading={isFetching}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSizeOptions: ["5", "10", "15"],
          showSizeChanger: true,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default Transaction;
