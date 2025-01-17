"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signIn } from "@/firebase/auth";
import TextInput from "./TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email("Must enter an email")
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be shorter than 50 characters"),
  password: z.string().trim().min(6, "Password must be at least 6 characters").max(50, "Password must be shorter than 50 characters")
});
const SignIn: FC<{}> = () => {
  const [signInError, setSignInError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signIn(values.email, values.password);

    if (result.error) {
      if (!("code" in result.error)) {
        setSignInError("Unknown error");
        console.log(result);
        return;
      }

      setSignInError(result.error.code);
    }

    router.push("/");
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-black border-white border-2 rounded-s p-4'>
          <TextInput form={form} name='email' description='Email' tooltip='Your display name' />
          <PasswordInput form={form} name='password' description='Password' tooltip='Your password to login' />

          <div className='flex flex-row space-x-3 items-center'>
            <Button type='submit'>Submit</Button>
            <div>{signInError}</div>
            <div className='text-blue-300 underline cursor-pointer' onClick={() => router.push("/sign-up")}>
              Create an account
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignIn;
