import user_create_validation from "@/app/_validations/user_validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/app/_types/user_types";

const Page = () => {
  const methods = useForm<UserType<File>>({
    resolver: zodResolver(user_create_validation),
  });

  return <div>Hello world from create user.</div>;
};

export default Page;
