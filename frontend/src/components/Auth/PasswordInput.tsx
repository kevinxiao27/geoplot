import { UseFormReturn } from "react-hook-form";
import { FC, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";

const PasswordInput: FC<{
  form: UseFormReturn<any>;
  name: string;
  description?: string;
  tooltip?: string;
}> = ({ form, name, description, tooltip }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{description}</FormLabel>
          <div className='relative'>
            <FormControl>
              <Input type={showPassword ? "text" : "password"} className={"hide-password-toggle pr-10"} {...field} />
            </FormControl>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute h-full right-0 top-0 hover:bg-slate-600'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeIcon className='h-4 w-4' aria-hidden='true' /> : <EyeOffIcon className='h-4 w-4' aria-hidden='true' />}
              <span className='sr-only'>{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
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
};
export default PasswordInput;
