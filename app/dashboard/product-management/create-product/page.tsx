"use client";

import InputField from "@/app/_components/InputField";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  product_validation_schema,
  ProductValidationType,
} from "@/app/_validations/product_validation";
import { Button, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useBrandListQuery } from "@/app/_store/api/brand.api";
import "@ant-design/v5-patch-for-react-19";
import { useCreateProductMutation } from "@/app/_store/api/product.api";

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const defaultValues: ProductValidationType = {
    name: "",
    images: [] as File[],
    price: 1,
    description: "",
    discount_type: "percentage",
    shipping_cost: 0,
    brand_id: "",
    variants: [],
    discount: 0
  };

  const methods = useForm<ProductValidationType>({
    resolver: zodResolver(product_validation_schema),
    defaultValues,
  });

  const { data: brands } = useBrandListQuery({});
  const [createProduct] = useCreateProductMutation();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "variants",
  });

  const onSubmit = async (data: ProductValidationType) => {
    try {
      messageApi.open({
        key: "product-create",
        type: "loading",
        content: "Product adding...",
      });

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === ("images" as keyof ProductValidationType)) {
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

      // formData.append("_method", "PUT");
   
      const result = await createProduct(formData);
      console.log(result);

      if (result?.data?.success) {
        messageApi.open({
          key: "product-create",
          type: "success",
          content: "Product created successful!",
        });
        methods.reset();
      } else {
        if (result.error && "data" in result.error) {
          const errorMessage =
            result.error?.data &&
            typeof result.error.data === "object" &&
            "message" in result.error.data
              ? result.error.data.message
              : "An unknown error occurred.";
          messageApi.open({
            key: "product-create",
            type: "error",
            content: JSON.stringify(errorMessage),
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        messageApi.open({
          key: "product-create",
          type: "error",
          content: JSON.stringify(err.message),
        });
      } else {
        messageApi.open({
          key: "product-create",
          type: "error",
          content: "An unknown error occurred.",
        });
      }
    }
  };

  const addVariant = () => {
    append({
      name: "",
      stock: 0,
      price: 0,
    });
  };

  return (
    <div>
      {contextHolder}
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
            {fields.map((field, index) => (
              <div
                className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-4 w-full"
                key={field.id}
              >
                <InputField
                  name={`variants.${index}.name`}
                  label="Variant name"
                  placeholder="Enter variant name"
                  type="text"
                />
                <InputField
                  name={`variants.${index}.stock`}
                  label="Variant stock"
                  placeholder="Enter variant stock"
                  type="number"
                />
                <InputField
                  name={`variants.${index}.price`}
                  label="Variant price"
                  placeholder="Enter variant price"
                  type="number"
                />
                <Button
                  danger
                  type="primary"
                  onClick={() => remove(index)}
                  icon={<DeleteOutlined />}
                  className="md:col-span-3"
                >
                  Remove Variant
                </Button>
              </div>
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
