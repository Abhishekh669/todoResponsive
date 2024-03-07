"use client"
import { Button } from '@/components/ui/button'
import { useConvexAuth } from 'convex/react'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const AppLayout = (
    { children }: { children: React.ReactNode }
) => {
  
    return (
        <div>
           
            {children}
            
        </div>
    )
}

export default AppLayout
