"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "'components/ui/button'" 
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "'components/ui/form'" 
import { Input } from "'components/ui/input'" 
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    username: z.string().min(3, { message: "Username must be at least 3 characters" }).min(1, { message: "Username is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).min(1, { message: "Password is required" })
})

const AuthForm = ({ type }: {type: string}) => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
 
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
        setIsLoading(true);
        if (type === 'sign-up') {
            setUser(values.firstName); // Set the user's name
            router.push('/'); // Redirect to the root page
        } else {
            // For sign-in, just log the values without processing
            console.log(values);
        }
        setIsLoading(false);
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
                        {user ? `Welcome, ${user}` : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className='text-16 font-normal text-gray-600'>
                            {user ? 'You are logged in' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {type === 'sign-up' && ( // Only show these fields for sign-up
                        <div className="flex gap-4">
                            <FormField // Field for email input
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <div className='form-item'>
                                        <FormLabel className='form-label'>First Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="ex: John"
                                                className='input-class'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='form-message mt-2' />
                                    </div>
                                )}
                            />
                            <FormField // Field for username input
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <div className='form-item'>
                                        <FormLabel className='form-label'>Last Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="ex: Doe"
                                                className='input-class'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='form-message mt-2' />
                                    </div>
                                )}
                            />
                        </div>
                    )}
                    <FormField // Field for password input
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your email"
                                        className='input-class'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='form-message mt-2' />
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your username"
                                        className='input-class'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='form-message mt-2' />
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <div className='form-item'>
                                <FormLabel className='form-label'>Password</FormLabel>
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
                        )}
                    />
                    <div className='flex flex-col gap-4'>
                        <Button type="submit" disabled={isLoading} className='form-btn'>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' /> Loading...
                                </>
                            ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default AuthForm
