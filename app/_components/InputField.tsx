"use client";

import { GetProp, Input, Select, Upload, UploadFile, UploadProps } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import TextArea from "antd/es/input/TextArea";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  options?: RegisterOptions;
  className?: string;
  selectOptions?: {
    label: string;
    value: string;
  }[];
}

const InputField = ({
  name,
  label,
  placeholder,
  type,
  options,
  className,
  selectOptions,
}: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
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
                    options={selectOptions}
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

            case "tag":
              return (
                <>
                  <label htmlFor={name} className="text-sm">
                    {label}
                  </label>
                  <Select
                    mode="tags"
                    {...field}
                    className="mt-1"
                    size="large"
                    showSearch
                    variant="filled"
                    placeholder={placeholder}
                    options={selectOptions}
                  />
                </>
              );

            case "images":
              return (
                <>
                  <label htmlFor={name} className="text-sm inline-block pb-1">
                    {label}
                  </label>
                  <ImgCrop rotationSlider>
                    <Upload
                      {...field}
                      listType="picture-card"
                      fileList={fileList}
                      onChange={({ fileList }) => {
                        onChange({
                          file: fileList[fileList.length - 1],
                          fileList,
                        });
                        field.onChange(
                          fileList.map((file) => file.originFileObj)
                        );
                      }}
                      onPreview={onPreview}
                      beforeUpload={() => false}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
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
                    onChange={(e) =>
                      field.onChange(
                        type === "number" ? +e.target.value : e.target.value
                      )
                    }
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
