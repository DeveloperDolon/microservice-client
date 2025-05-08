"use client";
import React, { useState } from "react";
import { Button, Table } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import Link from "next/link";
import Search from "antd/es/input/Search";
import { useProductListQuery } from "@/app/_store/api/product.api";
import Image from "next/image";
import { ProductType } from "@/app/_types/product_types";

const columns = [
  {
    title: "Product Image",
    dataIndex: "images",
    key: "images",
    render: (_: unknown, record: ProductType<string>) => {
      const imageArray = record?.images?.split(",");
      
      return (
        <>
          <Image 
            width={100}
            height={100}
            src={imageArray[0]}
            alt="Product-Image"
          />
        </>
      )
    }
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

const ProductManagement = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState({page: 1, limit: 10});
  const {data: productList} = useProductListQuery(params);
  console.log(productList)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="md:text-2xl text-lg font-bold">Product Management</h1>

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
      <Table dataSource={productList?.data?.data} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductManagement;
