"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { useConvexAuth } from 'convex/react'

function page() {
  const {isAuthenticated} = useConvexAuth();
  return (
    <div>
     {
        isAuthenticated &&
      ( <Link href="/mainapp">
      <Button>Main app</Button>
      </Link>)
      }
    </div>
  )
}

export default page
