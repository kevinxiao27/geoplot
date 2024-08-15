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
import { Map } from "leaflet";
import { revalidate } from "@/utils/actions";

interface formProps {
  map: Map | null;
}

const formSchema = z.object({
  title: z.string().min(2).max(50),
  desc: z.string().min(2).max(300),
  avatar: z.union([z.string().trim().url(), z.literal("")]),
});

export const GeocacheForm: React.FC<formProps> = ({ map }) => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [formResult, setFormResult] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
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
          map?.setView([position.coords.latitude, position.coords.longitude]);
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
    let location = [userLocation?.longitude, userLocation?.latitude];
    if (userLocation == null || !isChecked) {
      location = [map?.getCenter().lng, map?.getCenter().lat];
    }
    const { data, error } = await FETCH("POST", {
      name: values.title,
      desc: values.desc,
      avatar: values.avatar,
      location: {
        type: "Point",
        coordinates: [location[0], location[1]],
      },
    });

    if (!error && data) {
      setFormResult("success");
      revalidate("geocache");
    } else {
      setFormResult(`Error occured ${error}`);
    }
  }

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

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
          <div className="flex flex-row items-center">
            <input type="checkbox" id="checkbox" checked={isChecked} onChange={checkHandler} />
            <label htmlFor="checkbox" className="text-xs px-3">
              Use your location instead of center of map. optional.
            </label>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Button type="submit">Submit</Button>
            <p className="text-xs">{formResult}</p>
          </div>
        </form>
      </Form>
    </div>
  );
};
