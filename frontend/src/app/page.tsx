"use client";
import Demo from "../../public/demo.png";
import { LocateFixed } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-black'>
        <div className='text-5xl md:text-6xl text-white font-extrabold flex items-center gap-x-3'>
          <div>GEOPLOTS</div>
          <LocateFixed size={50} />
        </div>

        <div className='relative mt-8 w-[80vw]'>
          <Image src={Demo} className='object-cover rounded-lg' alt='demo image' />

          <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md rounded-lg p-8 flex flex-col justify-center items-center gap-y-4'>
            <motion.div
              className='text-center font-normal text-2xl md:text-3xl text-white'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your personal geodata journaling app:
            </motion.div>
            <motion.div
              className='text-center font-normal text-2xl md:text-3xl text-white'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              What you need
            </motion.div>
            <motion.div
              className='text-center font-normal text-2xl md:text-3xl text-white'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Whenever you need it
            </motion.div>

            <div className='flex gap-x-4 mt-6'>
              <Link href='/sign-in'>
                <Button className='w-24 h-12 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition'>Login</Button>
              </Link>
              <Link href='/sign-up'>
                <Button className='w-24 h-12 bg-red-600 text-white rounded-lg hover:bg-red-500 transition'>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
