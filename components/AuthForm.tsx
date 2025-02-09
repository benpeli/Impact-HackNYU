"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  // Sign-Up
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  // Sign-In
  email: z.string().email().min(1, { message: "Email is required" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const AuthForm = ({ type }: {type: string}) => {
    const [user, setUser] = useState<null | { firstName: string; lastName: string }>(null);
    const [isLoading, setIsLoading] = useState(false);

    //Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
    },
  })
 
  //Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    //Do something with the form values
    setIsLoading(true)
    console.log(values)
    setIsLoading(false)
  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col md:gap-8'>
        <Link href="/" className='mb-12 cursor-pointer flex items-center gap-1'>
                <Image
                    src="icons/logo.svg"
                    width={34}
                    height={34}
                    alt="Logo"
                    className='size-[24px] max-xl:size-14'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>IMPACT</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user
                    ? 'Link Account'
                    : type === 'sign-in'
                        ? 'Sign In'
                        : 'Sign Up'
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {user
                        ? 'Link your account to get started'
                        : 'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/* PlaidLink */}
            </div>
            ): (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <>
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <div className='form-item'>
                            <FormLabel className='form-label'>
                              First Name
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder="ex: John"
                                  className='input-class'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <div className='form-item'>
                            <FormLabel className='form-label'>
                              Last Name
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder="ex: Doe"
                                  className='input-class'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                        />

                        </>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <div className='form-item'>
                            <FormLabel className='form-label'>
                              Email
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your email"
                                  className='input-class'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <div className='form-item'>
                            <FormLabel className='form-label'>
                              Username
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your username"
                                  className='input-class'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <div className='form-item'>
                            <FormLabel className='form-label'>
                              Password
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your password"
                                  className='input-class'
                                  type='password'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className='form-message mt-2' />
                            </div>
                          </div>
                        )}
                        />
                      <div className='flex flex-col gap-4'>
                        <Button type="submit" disabled={isLoading}
                        className='form-btn'>
                          {isLoading ? (
                            <>
                              <Loader2 size={20}
                              className='animate-spin' /> Loading...
                            </>
                          ) : type === 'sign-in'
                            ? 'Sign In' : 'Sign Up'}
                        </Button>
                        </div>
                    </form>
                </Form>
                
                <footer className='flex justify-center gap-1'>
                  <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in'
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  </p>
                  <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                    {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                  </Link>
                </footer>

            </>
        )}
    </section>
  )
}

export default AuthForm
