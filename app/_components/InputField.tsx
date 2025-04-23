import { Input } from "antd";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface InputFieldProps {
  //   register: (
  //     name: string,
  //     options?: RegisterOptions
  //   ) => {
  //     ref: unknown;
  //     name: string;
  //     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //     onBlur: () => void;
  //   };
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
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <Input
        className="md:px-4 px-3 mt-1"
        size="large"
        variant="filled"
        type={type}
        placeholder={placeholder}
        {...register(name, options)}
      />
      {error && <p className="">{error}</p>}
    </div>
  );
};

export default InputField;
