"use client";
import React from "react";
import { Button, Table } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import Link from "next/link";
import Search from "antd/es/input/Search";

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
    title: "Product Image",
    dataIndex: "images",
    key: "images",
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price (BDT)",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Seller Name",
    dataIndex: "seller?.name",
    key: "seller?.name",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record: any) => {
      return (
        <div className="flex gap-2">
          <Button type="primary" size={"small"}>
            <Link href={`/dashboard/product-management`}>Edit</Link>
          </Button>
          <Button type="primary" danger size={"small"}>
            <Link href={`/dashboard/product-management`}>Delete</Link>
          </Button>
        </div>
      );
    },
  },
];

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>

        <Search
          className="md:w-[500px] w-[300px]"
          placeholder="input search text"
          enterButton="Search"
          size="large"
          loading={false}
        />

        <Button type="primary" icon={<PlusCircleFilled />} size={"large"}>
          <Link href={`/dashboard/product-management/create-product`}>
            <span className="hidden md:inline">Create Product</span>
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default page;
