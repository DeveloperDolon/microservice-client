"use client";

import InputField from "@/app/_components/InputField";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { product_validation_schema } from "@/app/_validations/product_validation";
import { ProductType } from "@/app/_types/product_types";
import { Button, GetProp, Upload, UploadFile, UploadProps } from "antd";
import {PlusOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Page = () => {
  const methods = useForm<ProductType>({
    resolver: zodResolver(product_validation_schema),
  });

  const onSubmit = (data: ProductType) => {
    console.log(data);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div>
      <h1 className="md:text-2xl text-lg font-bold text-center">
        Create Product
      </h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid gap-4 grid-cols-2 mt-6"
        >
          <InputField
            name="name"
            label="Product Name"
            placeholder="Enter product name"
            type="text"
            options={{
              required: "Product name is required",
              minLength: {
                value: 3,
                message: "Product name must be at least 3 characters",
              },
            }}
          />

          <InputField
            name="discount"
            label="Product Discount"
            placeholder="Enter product discount"
            type="number"
          />

          <InputField
            name="discount_type"
            label="Product Discount Type"
            placeholder="Select product discount type"
            type="select"
            selectOptions={[
              {
                label: "Percentage",
                value: "percentage",
              },
              {
                label: "Amount",
                value: "amount",
              },
            ]}
          />

          <InputField
            name="ingredients"
            label="Ingredients"
            placeholder="Input product ingredients "
            type="tag"
            selectOptions={[
              {
                label: "Percentage",
                value: "percentage",
              },
              {
                label: "Amount",
                value: "amount",
              },
            ]}
          />

          <InputField
            name="price"
            label="Product Price"
            placeholder="Enter product price"
            type="number"
            options={{
              required: "Product price is required",
            }}
          />

          <InputField
            name="shipping_cost"
            label="Product Shipping Cost"
            placeholder="Enter product shipping cost"
            type="number"
            options={{
              required: "Product shipping cost is required",
            }}
          />

          <InputField
            name="brand_id"
            label="Brand"
            placeholder="Select product brand"
            type="select"
          />

          <div>
            <label htmlFor="images" className="text-sm inline-block pb-1">
              Images
            </label>
            <Controller
              name="images"
              control={methods.control}
              render={({ field }) => (
                <ImgCrop {...field} rotationSlider>
                  <Upload
                    {...field}
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              )}
            />
          </div>

          <InputField
            name="description"
            label="Product description"
            placeholder="Enter product description"
            type="textarea"
            options={{
              required: "Product description is required",
              minLength: {
                value: 50,
                message: "Product description must be at least 50 characters",
              },
            }}
          />

          <InputField
            name="benefit"
            label="Product benefit"
            placeholder="Enter product benefit"
            type="textarea"
          />

          <div>
            <div>
              
            </div>

            <Button icon={<PlusOutlined />}>Add Variant</Button>
          </div>

          <Button className="col-span-2" type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
