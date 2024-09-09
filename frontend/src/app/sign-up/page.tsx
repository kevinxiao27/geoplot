"use client";
import SignUp from "@/components/Auth/SignUp";

export default function Page() {
  return (
    <div className='grid grid-cols-3 grid-rows-4'>
      <div className='col-start-2 row-start-1 flex flex-row items-center justify-center text-[46px]'>Sign Up</div>
      <div className='col-start-2 row-span-2 row-start-2'>
        <SignUp />
      </div>
    </div>
  );
}
