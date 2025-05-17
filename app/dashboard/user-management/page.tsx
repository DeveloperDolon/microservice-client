"use client";

import { BrandType } from "@/app/_types/brand_types";
import { Button, Image, Table } from "antd";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { PlusCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { useBrandListQuery } from "@/app/_store/api/brand.api";

const columns = [
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (_: unknown, record: BrandType<string>) => {
      return (
        <>
          <Image
            width={100}
            height={100}
            src={record?.logo}
            alt="Brand-Logo-Image"
          />
        </>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Action",
    key: "action",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (_: unknown, record: unknown) => {
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

const Page = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [params, setParams] = useState({page: 1, limit: 10});
    const { data: brandList } = useBrandListQuery(params);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="md:text-2xl text-lg font-bold">User Management</h1>

        <Search
          className="md:w-[500px] w-[300px]"
          placeholder="input search text"
          enterButton="Search"
          size="large"
          loading={false}
        />

        <Button type="primary" icon={<PlusCircleFilled />} size={"large"}>
          <Link href={`/dashboard/product-management/create-product`}>
            <span className="hidden md:inline">Create User</span>
          </Link>
        </Button>
      </div>
      <Table dataSource={brandList?.data?.data} columns={columns} rowKey="id" />
    </div>
  );
};

export default Page;
