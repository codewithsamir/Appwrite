"use client"
import { account } from '@/appwrite/appwriteconfig';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const layout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
const router = useRouter()
const [loading,setloading]= useState(true)
const [user,setuser]= useState<any>(null)





useEffect(()=>{
    const fetchuser = async ()=>{
        try {
            const data:any = await account.get()
            setuser(data)
        } catch (error:any) {
            console.log(error.message)
            router.replace('/login')
        }finally{
            setloading(false)
        }
    }
    fetchuser()
   
},[router])

if(loading || !user){
    return <div>loading...</div>
}

  return (
    <div>{children}</div>
  )
}

export default layout