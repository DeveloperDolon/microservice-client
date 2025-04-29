"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  auth_login_validation,
  LoginValidationType,
} from "../_validations/auth_validation";
import InputField from "../_components/InputField";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const methods = useForm<LoginValidationType>({
    resolver: zodResolver(auth_login_validation),
  });

  return (
    <div>
      <FormProvider {...methods}>
        <div className="">
          <form>
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
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default page;
