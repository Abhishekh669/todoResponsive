"use client"
import { Button } from '@/components/ui/button';
import { useConvexAuth } from 'convex/react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react'

export default function AppLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router = useRouter()
    const {isAuthenticated, isLoading} = useConvexAuth();
    const [myStatus, setMyStatus] = useState<Boolean>(false);
    const checkAuth = () =>{
         setMyStatus(isAuthenticated)

    }
    
    useEffect(() =>{
        checkAuth();
    },[isAuthenticated])

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isLoading, isAuthenticated, router]);
    return (
        <>
            <div className='min-w-screen  '>
                {
                    isLoading && (
                        <div className='flex justify-center items-center my-2 '>
                        <Loader className='animate-spin h-5 w-5' />  &nbsp; ...Loading
                    </div>
                    )
                }

                {
    (
                        <div>
                            {children}
                            
                        </div>
                    )
                }
                
               
            </div>
        </>
    );
  }