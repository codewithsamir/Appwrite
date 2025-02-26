"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { account } from "@/appwrite/appwriteconfig"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values
    setLoading(true)
    try {
        const res = await  account.createEmailPasswordSession(email,password);
        toast.success("Logged in successfully");
        console.log(res)
        router.push('/profile')
    } catch (error:any) {
        toast.error("Login failed");
        console.log(error.message)
    }
    finally {
        setLoading(false)
    }

 
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="login w-[500px] mx-auto shadow-lg p-6 bg-gray-300 rounded-lg">
        <h1 className="text-3xl py-6 text-center font-bold text-gray-900">
     Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="yourname@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </div>
        
      </div>
    </div>
  )
}
