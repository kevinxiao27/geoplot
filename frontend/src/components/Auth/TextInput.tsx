import { UseFormReturn } from "react-hook-form";
import { FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const TextInput: FC<{
  form: UseFormReturn<any>;
  name: string;
  description?: string;
  tooltip?: string;
}> = ({ form, name, description, tooltip }) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{description}</FormLabel>
        <FormControl>
          <Input placeholder='' {...field} />
        </FormControl>
        <div className='flex flex-row items-center space-x-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <FormDescription>{description}</FormDescription>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <FormMessage className='text-baby-blue text-xs' />
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default TextInput;
