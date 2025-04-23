"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const Page = () => {
  const methods = useForm();
  return (
    <div>
      <h1 className="md:text-2xl text-lg font-bold text-center">
        Create Product
      </h1>

      <FormProvider {...methods}>hello</FormProvider>
    </div>
  );
};

export default Page;
