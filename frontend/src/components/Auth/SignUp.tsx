"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUp } from "@/firebase/auth";
import TextInput from "./TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z
      .string()
      .email("Must enter an email")
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be shorter than 50 characters"),
    password: z.string().trim().min(6, "Password must be at least 6 characters").max(50, "Password must be shorter than 50 characters"),
    confirmPassword: z.string().optional()
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        message: "Entered passwords do not match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"]
      });
    }
  });

const SignUp: FC<{}> = () => {
  const [signUpError, setSignUpError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signUp(values.email, values.password);

    if (result.error) {
      if (!("code" in result.error)) {
        setSignUpError("Unknown error");
        console.error(result);
        return;
      }

      if (result.error.code == "auth/email-already-in-use") {
        setSignUpError("The email address is already in use");
      } else if (result?.error.code == "auth/invalid-email") {
        setSignUpError("The email address is not valid.");
      } else if (result.error.code == "auth/operation-not-allowed") {
        setSignUpError("Operation not allowed.");
      } else if (result.error.code == "auth/weak-password") {
        setSignUpError("The password is too weak.");
      }
    }

    router.push("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-black border-white border-2 rounded-s p-4'>
        <TextInput form={form} name='email' description='Email' tooltip='Your display name' />
        <PasswordInput form={form} name='password' description='Password' tooltip='Your password to login' />
        <PasswordInput form={form} name='confirmPassword' description='Confirm Password' tooltip='Must match entered password' />
        <div className='flex flex-row space-x-3 items-center'>
          <Button type='submit'>Submit</Button>
          <div>{signUpError}</div>
        </div>
      </form>
    </Form>
  );
};

export default SignUp;
