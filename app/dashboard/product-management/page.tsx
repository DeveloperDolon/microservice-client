import React from "react";
import { Button, Table } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button type="primary" icon={<PlusCircleFilled />} size={"large"}>
          Add Product
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default page;
