"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  auth_login_validation,
  LoginValidationType,
} from "../_validations/auth_validation";
import { PoweroffOutlined } from "@ant-design/icons";
import InputField from "../_components/InputField";
import bgImage from "../_assets/loginbg.png";
import { Button, message, Switch } from "antd";
import { useState } from "react";
import { useLoginMutation } from "../_store/api/auth.api";

const LoginPage = () => {
  const methods = useForm<LoginValidationType>({
    resolver: zodResolver(auth_login_validation),
    mode: "onTouched",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [pageSwitch, setPageSwitch] = useState<boolean>(true);
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginValidationType) => {
    try {
      const result = await login(data);
      console.log(result)
      if (result?.data?.success) {
        messageApi.success("Login successful!");
      } else {
        messageApi.error(result?.error?.data?.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div>
      {contextHolder}
      <FormProvider {...methods}>
        <div
          className="flex items-center justify-center min-h-screen"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-xl md:px-10 sm:px-6 px-5 bg-white bg-opacity-85 p-6 rounded shadow-md">
            <Switch
              checkedChildren="Login"
              unCheckedChildren="Signup"
              defaultChecked
              className="font-bold mb-4"
              onChange={() => setPageSwitch(!pageSwitch)}
            />

            {pageSwitch ? (
              <>
                <h1 className="md:text-2xl sm:text-xl text-lg font-semibold pb-4 pt-2">
                  Login
                </h1>

                <form
                  className="space-y-6"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                  />

                  <InputField
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                  />

                  <div>
                    <Button
                      htmlType="submit"
                      type="primary"
                      icon={<PoweroffOutlined />}
                      loading={isLoading}
                      disabled={!methods.formState.isValid || isLoading}
                    >
                      {isLoading ? "Processing..." : "Login"}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="md:text-2xl sm:text-xl text-lg font-semibold pb-4 pt-2">
                  Signup
                </h1>
                <p>Please contact with admin for user request.</p>
              </>
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
