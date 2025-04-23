import { Input, Select } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import TextArea from "antd/es/input/TextArea";
import { RegisterOptions, useFormContext } from "react-hook-form";

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
    register,
    formState: { errors },
  } = useFormContext();
  const error: string = (errors[name]?.message as string) || "";
  return (
    <div className={`flex flex-col ${className}`}>
      {type === "textarea" ? (
        <>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <TextArea
            className="mt-1"
            size="large"
            variant="filled"
            placeholder={placeholder}
            {...register(name, options)}
          />
          {error && <p className="">{error}</p>}
        </>
      ) : type === "select" ? (
        <>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <Select
            className="mt-1"
            showSearch
            placeholder={placeholder}
            {...register(name, options)}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: "1", label: "Jack" },
              { value: "2", label: "Lucy" },
              { value: "3", label: "Tom" },
            ]}
          />
          {error && <p className="">{error}</p>}
        </>
      ) : type === "checkbox" ? (
        <>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <Checkbox className="mt-1" type={type} {...register(name, options)}>
            Checkbox
          </Checkbox>
          {error && <p className="">{error}</p>}
        </>
      ) : type === "text" ? (
        <>
          <label htmlFor={name} className="text-sm">
            {label}
          </label>
          <Input
            className="mt-1"
            size="large"
            variant="filled"
            type={type}
            placeholder={placeholder}
            {...register(name, options)}
          />
          {error && <p className="">{error}</p>}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputField;
