"use client";
import InputField from "@/app/_components/InputField";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { product_validation_schema } from "@/app/_validations/product_validation";
import { ProductType } from "@/app/_types/product_types";
import { Button } from "antd";

const Page = () => {
  const methods = useForm<ProductType>({
    resolver: zodResolver(product_validation_schema),
  });

  const onSubmit = (data: ProductType) => {
    console.log(data);
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
            name="ingredients"
            label="Product Ingredients"
            placeholder="Select product ingredients"
            type="select"
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

          <Button type="primary" htmlType="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Page;
