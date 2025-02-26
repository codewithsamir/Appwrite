"use client"
import { account } from '@/appwrite/appwriteconfig'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


interface user{
    $id:string,
    email:string
}
const page = () => {
const router = useRouter()
    const [userdata, setuserdata]= useState<user>()

    const logout = async ()=>{
        try {
            const result = await account.deleteSession('current');
            toast.success("successfully logout");
            router.push('/login')
        } catch (error:any) {
            console.log(error.message)
        }
    }

    const fetchuser = async ()=>{
        try {
            const data:any = await account.get()
            setuserdata(data)
        } catch (error:any) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchuser()
       
    },[])
    useEffect(()=>{
        console.log(userdata)
    },[userdata])
  return (
    <div className="bg-slate-900 text-white p-4 min-h-screen"> 
        <h1 className='text-3xl'>Profile</h1>
        <Button 
        variant="secondary"
        onClick={logout}
        >logout</Button>
        <p className='text-xl'>Welcome to your profile page!</p>
        <h2 className='test-xl text-green-500'>id : { userdata?.$id}</h2>
        <h2 className='test-xl text-green-500'>email : { userdata?.email}</h2>
    </div>
  )
}

export default page