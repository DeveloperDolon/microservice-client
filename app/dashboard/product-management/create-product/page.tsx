"use client";
import InputField from "@/app/_components/InputField";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { product_validation_schema } from "@/app/_validations/product_validation";
import { ProductType } from "@/app/_types/product_types";

const Page = () => {
  const methods = useForm<ProductType>({
    resolver: zodResolver(product_validation_schema),
  });

  return (
    <div>
      <h1 className="md:text-2xl text-lg font-bold text-center">
        Create Product
      </h1>

      <FormProvider {...methods}>
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
      </FormProvider>
    </div>
  );
};

export default Page;
