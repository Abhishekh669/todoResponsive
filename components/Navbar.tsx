"use client"
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { useConvex, useConvexAuth } from 'convex/react'
import React from 'react'
import { Loader } from 'lucide-react';
import { Button } from './ui/button';
function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { isLoaded } = useUser();
  console.log("i am auth", isAuthenticated);
  return (
    <div className='flex justify-between border-b-2 border-blue-300  md:p-5'>
      <h2 className='font-semibold text-[30px]'><span className='text-red-600'>Todo</span> App</h2>
      {isLoading && <Loader className='  text-[20px] animate-spin' />}
      {!isLoading && isAuthenticated && (
        <Button className='bg-transparent hover:bg-transparent'>
          <UserButton />
        </Button>
      )}
      {!isLoading && !isAuthenticated && (
        <Button className='bg-blue-500 hover:border active:bg-green-600 hover:border-black hover:bg-white hover:text-black'>
          <SignInButton />
        </Button>
      )}
    </div>
  )
}

export default Navbar
