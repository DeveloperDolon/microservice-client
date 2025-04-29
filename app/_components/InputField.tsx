"use client";

import { Input, Select } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import TextArea from "antd/es/input/TextArea";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  options?: RegisterOptions;
  className?: string;
}

const InputField = ({
  name,
  label,
  placeholder,
  type,
  options,
  className,
}: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getError = (fieldName: string) => {
    const fields = fieldName.split(".");
    let currentError = errors;

    for (const field of fields) {
      if (!currentError?.[field]) return null;
      currentError = currentError[field] as typeof currentError;
    }

    return (currentError?.message as unknown as string) || "";
  };

  const error = getError(name);

  return (
    <div className={`flex flex-col ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={options}
        render={({ field }) => {
          switch (type) {
            case "textarea":
              return (
                <>
                  <label htmlFor={name} className="text-sm">
                    {label}
                  </label>
                  <TextArea
                    {...field}
                    className="mt-1"
                    size="large"
                    variant="filled"
                    placeholder={placeholder}
                  />
                </>
              );
            case "select":
              return (
                <>
                  <label htmlFor={name} className="text-sm">
                    {label}
                  </label>
                  <Select
                    {...field}
                    className="mt-1"
                    size="large"
                    showSearch
                    variant="filled"
                    placeholder={placeholder}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      { value: "1", label: "Jack" },
                      { value: "2", label: "Lucy" },
                      { value: "3", label: "Tom" },
                    ]}
                  />
                </>
              );
            case "checkbox":
              return (
                <>
                  <label htmlFor={name} className="text-sm">
                    {label}
                  </label>
                  <Checkbox
                    {...field}
                    className="mt-1"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  >
                    Checkbox
                  </Checkbox>
                </>
              );
            case "password":
              return (
                <>
                  <label htmlFor={name} className="text-sm">
                    {label}
                  </label>
                  <Input.Password
                    {...field}
                    className="mt-1"
                    size="large"
                    variant="filled"
                    placeholder={placeholder}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </>
              );
            default:
              return (
                <>
                  <label htmlFor={name} className="text-sm">
                    {label}
                  </label>
                  <Input
                    {...field}
                    className="mt-1"
                    size="large"
                    variant="filled"
                    type={type}
                    placeholder={placeholder}
                  />
                </>
              );
          }
        }}
      />
      {error && (
        <p className="md:text-sm text-xs font-light text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;
