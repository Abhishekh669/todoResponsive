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
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [myStatus, setMyStatus] = useState<boolean>(false);

    useEffect(() =>{
        checkAuth();
    },[isAuthenticated])

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/");
        }
    }, [isLoading, isAuthenticated, router]);

    const checkAuth = () =>{
         setMyStatus(isAuthenticated)
    }
    
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
                    myStatus &&   (
                        <div>
                            {children}
                        </div>
                    )
                }
            </div>
        </>
    );
  }
