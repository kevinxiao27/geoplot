"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TextInput from "./TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters").max(50, "Username must be shorter than 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be shorter than 50 characters"),
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
  const [state, setState] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-black border-white border-2 rounded-s p-4'>
        <TextInput form={form} name='username' description='Username' tooltip='Your display name' />
        <TextInput form={form} name='password' description='Password' tooltip='Your password to login' />
        <TextInput form={form} name='confirmPassword' description='Confirm Password' tooltip='Must match entered password' />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default SignUp;
