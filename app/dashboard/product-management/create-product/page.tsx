"use client";
import InputField from "@/app/_components/InputField";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm();
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
