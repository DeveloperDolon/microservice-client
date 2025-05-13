"use client";

import InputField from "@/app/_components/InputField";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { product_validation_schema } from "@/app/_validations/product_validation";
import { ProductType } from "@/app/_types/product_types";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useBrandListQuery } from "@/app/_store/api/brand.api";
import "@ant-design/v5-patch-for-react-19";

const Page = () => {
  const [variants, setVariants] = useState<React.ReactNode[]>([]);
  const [variantCount, setVariantCount] = useState(0);
  
  const methods = useForm<ProductType<File[]>>({
    resolver: zodResolver(product_validation_schema),
    defaultValues: {
      variants: [],
    },
  });

  const { data: brands } = useBrandListQuery({});

  const onSubmit = (data: ProductType<File[]>) => {
    console.log("Form Data:", data);
    console.log("Form Errors:", methods.formState.errors);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === ("images" as keyof ProductType<File[]>)) {
        if (Array.isArray(value)) {
          (value as File[]).forEach((file: File, index: number) => {
            formData.append(`images[${index}]`, file);
          });
        }
      } else if (key === "variants") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });
  };

  const addVariant = () => {
    const newCount = variantCount + 1;
    setVariantCount(newCount);

    const variant = (
      <div
        className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-4 w-full"
        key={newCount}
      >
        <InputField
          name={`variants.${newCount}.name`}
          label="Variant name"
          placeholder="Enter variant name"
          type="text"
        />
        <InputField
          name={`variants.${newCount}.stock`}
          label="Variant stock"
          placeholder="Enter variant stock"
          type="number"
        />
        <InputField
          name={`variants.${newCount}.price`}
          label="Variant price"
          placeholder="Enter variant price"
          type="number"
        />
      </div>
    );
    setVariants((prevVariants) => [...prevVariants, variant]);
  };

  return (
    <div>
      <h1 className="md:text-2xl text-lg font-bold text-center">
        Create Product
      </h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2 grid-cols-1 mt-6"
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
            selectOptions={brands?.data?.map(
              (item: { name: string; id: string }) => ({
                label: item?.name,
                value: item?.id,
              })
            )}
          />

          <InputField
            name="images"
            label="Product images"
            placeholder="Product images"
            type="images"
          />

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

          <div className="col-span-2 space-y-4 shadow-lg p-6 rounded-lg">
            <h1 className="md:text-xl text-lg font-semibold">Variants</h1>
            {variants.map((variant, index) => (
              <React.Fragment key={index}>{variant}</React.Fragment>
            ))}

            <Button
              onClick={addVariant}
              htmlType="button"
              icon={<PlusOutlined />}
            >
              Add Variant
            </Button>
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
