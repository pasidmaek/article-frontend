'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { signupService } from "@/config/service/authorize";
import { Link } from "@nextui-org/link";
import { useAuth } from "@/config/context/AuthContext";

export default function Signup() {
  const router = useRouter()
  const { setIsLogin } = useAuth()
  const [signupInfo, setSignupInfo] = useState<UserProps>({
    email: "",
    password: "",
    name: ""
  })

  const handleSignup = async () => {
    const result = await signupService(signupInfo)
    if (result?.success) {
      setIsLogin(true)
      router.push('/')
    } else {
      console.error(result?.message)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-80">
        <h1>Sign Up</h1>
        <br />
        <Input type="email" label="Email" onChange={(e) => setSignupInfo((prev) => ({ ...prev, email: e.target.value }))} />
        <br />
        <Input type="name" label="Name" onChange={(e) => setSignupInfo((prev) => ({ ...prev, name: e.target.value }))} />
        <br />
        <Input type="password" label="Password" onChange={(e) => setSignupInfo((prev) => ({ ...prev, password: e.target.value }))} />
        <br />
        <p>Don't have account?<Link href="/signin">Sign in</Link></p>
        <Button color="primary" onClick={() => handleSignup()} className="w-full">
          Sign up
        </Button>
      </div>
    </div>
  )
}