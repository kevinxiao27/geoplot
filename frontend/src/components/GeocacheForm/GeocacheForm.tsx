"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import FETCH from "@/utils/fetchData";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(300),
  avatar: z.union([z.string().trim().url(), z.literal("")]),
});

export const GeocacheForm: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [formResult, setFormResult] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      avatar: "",
    },
  });
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getUserLocation();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (userLocation == null) {
      return;
    }
    const { data, error } = await FETCH("POST", {
      name: values.title,
      desc: values.desc,
      avatar:
        values.avatar ||
        "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
      location: {
        type: "Point",
        coordinates: [userLocation?.longitude, userLocation?.latitude],
      },
    });

    if (!error && data) {
      setFormResult("success");
    } else {
      setFormResult(`Error occured ${error}`);
    }
  }

  return (
    <div
      className={`relative z-[500] lg:w-[30vw] h-[60vh] space-y-5 bg-[#000000] flex flex-col rounded-b-xl overflow-y-auto overflow-x-hidden border-white border-2 p-5`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="enter description here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="add optional image link here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row space-x-3 items-center">
            <Button type="submit">Submit</Button>
            <p className="text-xs">{formResult}</p>
          </div>
        </form>
      </Form>
    </div>
  );
};
