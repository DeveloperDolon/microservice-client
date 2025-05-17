"use client";

import { Button, Image, Table } from "antd";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { PlusCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { useUserListQuery } from "@/app/_store/api/user.api";
import { UserType } from "@/app/_types/user_types";

const columns = [
  {
    title: "Picture",
    dataIndex: "profile_picture",
    key: "profile_picture",
    render: (_: unknown, record: UserType<string>) => {
      return (
        <>
          <Image
            width={100}
            height={100}
            src={record?.profile_picture}
            alt="Profile-Image"
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
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role.name",
    key: "role.name",
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
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const { data: userList } = useUserListQuery(params);
  console.log(userList);

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
          <Link href={`/dashboard/user-management/create-user`}>
            <span className="hidden md:inline">Create User</span>
          </Link>
        </Button>
      </div>
      <Table dataSource={userList?.data} columns={columns} rowKey="id" />
    </div>
  );
};

export default Page;
