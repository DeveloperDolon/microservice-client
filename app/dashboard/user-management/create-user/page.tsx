"use client";

import user_create_validation from "@/app/_validations/user_validation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/app/_types/user_types";
import { Button, message } from "antd";
import Link from "next/link";

const Page = () => {
  const methods = useForm<UserType<File>>({
    resolver: zodResolver(user_create_validation),
  });
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div>
      <Link href={"/dashboard/user-management"}>
        <Button>Back</Button>
      </Link>
      {contextHolder}
      <h1 className="md:text-2xl text-lg font-bold text-center">
        Create User
      </h1>

      <FormProvider {...methods}>
        <form
          //   onSubmit={methods.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2 grid-cols-1 mt-6"
        ></form>
      </FormProvider>
    </div>
  );
};

export default Page;
