"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { auth_login_validation } from "../_validations/auth_validation";
import { PoweroffOutlined, SyncOutlined } from "@ant-design/icons";
import InputField from "../_components/InputField";
import bgImage from "../_assets/loginbg.png";
import { Button, Switch } from "antd";
import { useState } from "react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const methods = useForm({
    resolver: zodResolver(auth_login_validation),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loadings, setLoadings] = useState<boolean[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [pageSwitch, setPageSwitch] = useState<boolean>(false);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  return (
    <div>
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
              className="font-bold"
              onChange={() => setPageSwitch(!pageSwitch)}
            />

            {pageSwitch ? (
              <>
                <h1 className="md:text-2xl sm:text-xl text-lg font-semibold pb-4 pt-2">
                  Login
                </h1>

                <form className="space-y-6">
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    options={{ required: "Email is required." }}
                  />

                  <InputField
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                    options={{ required: "Password is required" }}
                  />

                  <div>
                    <Button
                      type="primary"
                      icon={<PoweroffOutlined />}
                      loading={loadings[3] && { icon: <SyncOutlined spin /> }}
                      onClick={() => enterLoading(3)}
                    >
                      Loading Icon
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="md:text-2xl sm:text-xl text-lg font-semibold pb-4 pt-2">
                  Signup
                </h1>

                <form className="space-y-6">
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    options={{ required: "Email is required." }}
                  />

                  <InputField
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                    options={{ required: "Password is required" }}
                  />

                  <div>
                    <Button
                      type="primary"
                      icon={<PoweroffOutlined />}
                      loading={loadings[3] && { icon: <SyncOutlined spin /> }}
                      onClick={() => enterLoading(3)}
                    >
                      Loading Icon
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default page;
